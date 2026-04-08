<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'role',
        'team_id',
        'nuit',
        'is_active',

        'is_superadmin',
        'avatar',
        'birth_date',
        'assigned_category_id',
    ];


    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class);
    }

    public function assignedCategory(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'assigned_category_id');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'user_categories')->withTimestamps();
    }


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    /**
     * Get the team for the user
     */
    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_superadmin' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Helper to check if user is a superadmin
     */
    public function isSuperAdmin(): bool
    {
        return $this->is_superadmin === true;
    }

    /**
     * Helper to check if user is a regular admin
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Helper to check if user is a collaborator
     */
    public function isCollaborator(): bool
    {
        return $this->role === 'collaborator';
    }

    /**
     * Check if user has access to a specific category
     */
    public function hasCategory(int $categoryId): bool
    {
        if ($this->isSuperAdmin() || $this->isAdmin()) {
            return true;
        }

        return $this->categories()->where('category_id', $categoryId)->exists();
    }
}
