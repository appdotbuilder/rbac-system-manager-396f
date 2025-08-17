<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\MenuAccessPermission
 *
 * @property int $id
 * @property int $user_role_id
 * @property int|null $application_menu_id
 * @property int|null $application_submenu_id
 * @property bool $can_view
 * @property bool $can_create
 * @property bool $can_edit
 * @property bool $can_delete
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\UserRole $role
 * @property-read \App\Models\ApplicationMenu|null $menu
 * @property-read \App\Models\ApplicationSubmenu|null $submenu
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission query()
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereApplicationMenuId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereApplicationSubmenuId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereCanCreate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereCanDelete($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereCanEdit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereCanView($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|MenuAccessPermission whereUserRoleId($value)

 * 
 * @mixin \Eloquent
 */
class MenuAccessPermission extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_role_id',
        'application_menu_id',
        'application_submenu_id',
        'can_view',
        'can_create',
        'can_edit',
        'can_delete',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'user_role_id' => 'integer',
        'application_menu_id' => 'integer',
        'application_submenu_id' => 'integer',
        'can_view' => 'boolean',
        'can_create' => 'boolean',
        'can_edit' => 'boolean',
        'can_delete' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the role associated with this permission.
     */
    public function role(): BelongsTo
    {
        return $this->belongsTo(UserRole::class, 'user_role_id');
    }

    /**
     * Get the menu associated with this permission.
     */
    public function menu(): BelongsTo
    {
        return $this->belongsTo(ApplicationMenu::class, 'application_menu_id');
    }

    /**
     * Get the submenu associated with this permission.
     */
    public function submenu(): BelongsTo
    {
        return $this->belongsTo(ApplicationSubmenu::class, 'application_submenu_id');
    }
}