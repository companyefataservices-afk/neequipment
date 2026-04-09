<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Category::withCount('products');

        // Se o user não é superadmin, e tem categorias específicas, filtramos
        if ($user && !$user->is_superadmin) {
            $categoryIds = [];
            
            if (\Illuminate\Support\Facades\Schema::hasTable('user_categories')) {
                $categoryIds = $user->categories()->pluck('categories.id')->toArray();
            }
            
            if ($user->assigned_category_id) {
                $categoryIds[] = $user->assigned_category_id;
            }

            // Se for um colaborador (tiver categorias específicas), listamos apenas as que lhe pertencem
            if (!empty($categoryIds)) {
                $query->whereIn('id', $categoryIds);
            }
        }

        return response()->json($query->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $isColaborador = $user && !$user->is_superadmin && (
            (\Illuminate\Support\Facades\Schema::hasTable('user_categories') && tap($user->categories()->count(), fn() => true) > 0) 
            || $user->assigned_category_id
        );

        if ($isColaborador) {
            return response()->json(['message' => 'Apenas administradores podem criar categorias.'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:categories',
        ]);

        $category = Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return response()->json(Category::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();
        $isColaborador = $user && !$user->is_superadmin && (
            (\Illuminate\Support\Facades\Schema::hasTable('user_categories') && tap($user->categories()->count(), fn() => true) > 0) 
            || $user->assigned_category_id
        );

        if ($isColaborador) {
            return response()->json(['message' => 'Apenas administradores podem editar categorias.'], 403);
        }

        $category = Category::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:categories,name,' . $id,
        ]);

        if ($request->has('name')) {
            $category->name = $request->name;
            $category->slug = Str::slug($request->name);
        }

        $category->save();

        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $user = $request->user();
        $isColaborador = $user && !$user->is_superadmin && (
            (\Illuminate\Support\Facades\Schema::hasTable('user_categories') && tap($user->categories()->count(), fn() => true) > 0) 
            || $user->assigned_category_id
        );

        if ($isColaborador) {
            return response()->json(['message' => 'Apenas administradores podem eliminar categorias.'], 403);
        }

        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(['message' => 'Categoria removida com sucesso.']);
    }
}
