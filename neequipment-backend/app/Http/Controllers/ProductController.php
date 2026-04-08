<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Notification;
use App\Models\User;
use App\Notifications\ProductPendingApproval;
use App\Notifications\ProductPublished;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = Product::with('images', 'category');

            // For debugging purposes, we will show all products.
            // Lógica de visibilidade
            if (!$request->user() || (!$request->user()->isAdmin() && !$request->user()->isSuperAdmin())) {
                $user = $request->user();
                $query->where(function($q) use ($user) {
                    $q->where('is_approved', true);
                    if ($user) {
                        $q->orWhere('created_by', $user->id);
                    }
                });
            }

            if ($request->has('search')) {
                $query->where(function($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->search . '%')
                      ->orWhere('description', 'like', '%' . $request->search . '%');
                });
            }

            return response()->json($query->get());
        } catch (\Exception $e) {
            \Log::error('Erro ao carregar produtos: ' . $e->getMessage());
            return response()->json(['error' => 'Erro ao carregar produtos', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'sku' => 'nullable|string|max:255|unique:products',
            'stock_quantity' => 'required|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'old_price' => 'nullable|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'images' => 'required|array|min:1|max:4',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048', // 2MB max
            'specifications' => 'nullable|array',
        ]);

        return DB::transaction(function () use ($request) {
            $user = $request->user();

            // Verificar se o utilizador tem permissão para esta categoria
            if ($user && !$user->hasCategory($request->category_id)) {
                return response()->json(['message' => 'Não tem permissão para adicionar produtos nesta categoria.'], 403);
            }

            $productData = $request->except('images');
            $productData['slug'] = Str::slug($request->name) . '-' . uniqid();
            $productData['sku'] = $request->sku ?: null;
            $productData['created_by'] = $user ? $user->id : null;
            
            // Apenas Admins ou SuperAdmins podem publicar diretamente
            $canPublish = $user && ($user->isAdmin() || $user->isSuperAdmin());
            $productData['is_approved'] = $canPublish ? ($request->is_approved ?? false) : false;

            $product = Product::create($productData);

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $index => $image) {
                    $path = $image->store('products', 'public');
                    
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $path,
                        'is_primary' => $index === 0,
                    ]);
                }
            }
            
            // Notificar Administradores se o produto precisar de aprovação
            if (!$product->is_approved) {
                $admins = User::where('role', 'admin')->orWhere('is_superadmin', true)->get();
                Notification::send($admins, new ProductPendingApproval($product));
            }

            return response()->json($product->load('images', 'category'), 201);
        });
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with('images', 'category')->findOrFail($id);
        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'brand' => 'nullable|string|max:255',
            'sku' => 'nullable|string|max:255|unique:products,sku,' . $id,
            'stock_quantity' => 'sometimes|required|integer|min:0',
            'price' => 'nullable|numeric|min:0',
            'old_price' => 'nullable|numeric|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
            'specifications' => 'nullable|array',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'remove_images' => 'nullable|array',
            'remove_images.*' => 'exists:product_images,id',
        ]);

        return DB::transaction(function () use ($request, $product) {
            $user = $request->user();

            // Verificar se o utilizador tem permissão para a categoria (se for alterada)
            $newCategoryId = $request->input('category_id', $product->category_id);
            if ($user && !$user->hasCategory($newCategoryId)) {
                return response()->json(['message' => 'Não tem permissão para gerir produtos nesta categoria.'], 403);
            }

            // Verificar se o utilizador pode editar este produto especificamente (se não for admin)
            if ($user && !$user->isAdmin() && !$user->isSuperAdmin() && $product->created_by !== $user->id) {
                return response()->json(['message' => 'Não tem permissão para editar este produto.'], 403);
            }

            $updateData = $request->except(['images', 'remove_images', 'is_approved', 'approved_by']);
            
            $wasApproved = $product->is_approved;

            // Apenas Admins podem alterar o estado de aprovação
            if ($request->has('is_approved') && $user && ($user->isAdmin() || $user->isSuperAdmin())) {
                $updateData['is_approved'] = $request->is_approved;
                if ($request->is_approved && !$wasApproved) {
                    $updateData['approved_by'] = $user->id;
                }
            }

            // Se um colaborador editar, o produto deve voltar para aprovação? 
            // Seguindo a lógica de segurança, se não for admin, forçamos pendente novamente
            if ($user && !$user->isAdmin() && !$user->isSuperAdmin()) {
                $updateData['is_approved'] = false;
            }

            if ($request->has('sku')) {
                $updateData['sku'] = $request->sku ?: null;
            }
            $product->update($updateData);

            // Trigger notificações de estado
            if (!$product->is_approved && ($wasApproved || $product->wasRecentlyCreated)) {
                $admins = User::where('role', 'admin')->orWhere('is_superadmin', true)->get();
                Notification::send($admins, new ProductPendingApproval($product));
            } elseif ($product->is_approved && !$wasApproved && $product->creator) {
                $product->creator->notify(new ProductPublished($product));
            }

            // Remove selected images
            if ($request->has('remove_images')) {
                foreach ($request->remove_images as $imageId) {
                    $image = ProductImage::find($imageId);
                    if ($image) {
                        Storage::disk('public')->delete($image->image_path);
                        $image->delete();
                    }
                }
            }

            // Upload new images if under limit
            if ($request->hasFile('images')) {
                $currentImageCount = $product->images()->count();
                $newImageCount = count($request->file('images'));

                if ($currentImageCount + $newImageCount > 4) {
                    return response()->json([
                        'message' => 'O produto não pode ter mais de 4 imagens no total.',
                    ], 422);
                }

                foreach ($request->file('images') as $image) {
                    $path = $image->store('products', 'public');
                    
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_path' => $path,
                        'is_primary' => $product->images()->where('is_primary', true)->count() === 0,
                    ]);
                }
            }

            return response()->json($product->load('images', 'category'));
        });
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $product = Product::findOrFail($id);
        $user = $request->user();

        // Só pode apagar se for admin ou o criador
        if ($user && !$user->isAdmin() && !$user->isSuperAdmin() && $product->created_by !== $user->id) {
            return response()->json(['message' => 'Não tem permissão para remover este produto.'], 403);
        }

        return DB::transaction(function () use ($product) {
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_path);
                $image->delete();
            }
            $product->delete();
            return response()->json(['message' => 'Produto removido com sucesso.']);
        });
    }

    /**
     * Approve a product (Admins only)
     */
    public function approve(Request $request, string $id)
    {
        $user = $request->user();
        if (!$user || (!$user->isAdmin() && !$user->isSuperAdmin())) {
            return response()->json(['message' => 'Apenas administradores podem aprovar produtos.'], 403);
        }

        $product = Product::findOrFail($id);
        $wasAlreadyApproved = $product->is_approved;

        $product->update([
            'is_approved' => true,
            'approved_by' => $user->id
        ]);

        if (!$wasAlreadyApproved && $product->creator) {
            $product->creator->notify(new ProductPublished($product));
        }

        return response()->json([
            'message' => 'Produto aprovado e publicado com sucesso.',
            'product' => $product->load('images', 'category')
        ]);
    }
}
