<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ApplicationMenu
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $icon
 * @property string|null $route
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ApplicationSubmenu> $submenus
 * @property-read int|null $submenus_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MenuAccessPermission> $permissions
 * @property-read int|null $permissions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu query()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu active()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu ordered()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereRoute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationMenu whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class ApplicationMenu extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'icon',
        'route',
        'sort_order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'sort_order' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the submenus for this menu.
     */
    public function submenus(): HasMany
    {
        return $this->hasMany(ApplicationSubmenu::class)->ordered();
    }

    /**
     * Get the access permissions for this menu.
     */
    public function permissions(): HasMany
    {
        return $this->hasMany(MenuAccessPermission::class);
    }

    /**
     * Scope a query to only include active menus.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order menus by sort order.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}