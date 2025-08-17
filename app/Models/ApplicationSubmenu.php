<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\ApplicationSubmenu
 *
 * @property int $id
 * @property int $application_menu_id
 * @property string $name
 * @property string $slug
 * @property string|null $icon
 * @property string|null $route
 * @property int $sort_order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ApplicationMenu $menu
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\MenuAccessPermission> $permissions
 * @property-read int|null $permissions_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu query()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu active()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu ordered()
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereApplicationMenuId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereRoute($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApplicationSubmenu whereUpdatedAt($value)

 * 
 * @mixin \Eloquent
 */
class ApplicationSubmenu extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'application_menu_id',
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
        'application_menu_id' => 'integer',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the parent menu for this submenu.
     */
    public function menu(): BelongsTo
    {
        return $this->belongsTo(ApplicationMenu::class, 'application_menu_id');
    }

    /**
     * Get the access permissions for this submenu.
     */
    public function permissions(): HasMany
    {
        return $this->hasMany(MenuAccessPermission::class);
    }

    /**
     * Scope a query to only include active submenus.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to order submenus by sort order.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }
}