<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'brand',
        'sku',
        'stock_quantity',
        'old_price',
        'price',
        'seller_name',
        'specifications',
        'category_id',
        'is_approved',
        'delete_requested',
        'approved_by',
        'created_by',
    ];

    protected $casts = [
        'specifications' => 'array',
        'price' => 'decimal:2',
        'old_price' => 'decimal:2',
        'is_approved' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approvedBy()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function comments()
    {
        return $this->hasMany(ProductComment::class)->orderBy('created_at', 'asc');
    }
}
