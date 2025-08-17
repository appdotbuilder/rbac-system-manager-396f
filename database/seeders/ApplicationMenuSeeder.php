<?php

namespace Database\Seeders;

use App\Models\ApplicationMenu;
use App\Models\ApplicationSubmenu;
use Illuminate\Database\Seeder;

class ApplicationMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menus = [
            [
                'name' => 'Dashboard',
                'slug' => 'dashboard',
                'icon' => 'dashboard',
                'route' => 'dashboard',
                'sort_order' => 1,
                'is_active' => true,
                'submenus' => [],
            ],
            [
                'name' => 'User Management',
                'slug' => 'user-management',
                'icon' => 'users',
                'route' => null,
                'sort_order' => 2,
                'is_active' => true,
                'submenus' => [
                    [
                        'name' => 'Users',
                        'slug' => 'users',
                        'icon' => 'user',
                        'route' => 'users.index',
                        'sort_order' => 1,
                        'is_active' => true,
                    ],
                    [
                        'name' => 'User Roles',
                        'slug' => 'user-roles',
                        'icon' => 'shield',
                        'route' => 'user-roles.index',
                        'sort_order' => 2,
                        'is_active' => true,
                    ],
                    [
                        'name' => 'User Types',
                        'slug' => 'user-types',
                        'icon' => 'tag',
                        'route' => 'user-types.index',
                        'sort_order' => 3,
                        'is_active' => true,
                    ],
                ],
            ],
            [
                'name' => 'System Configuration',
                'slug' => 'system-configuration',
                'icon' => 'settings',
                'route' => null,
                'sort_order' => 3,
                'is_active' => true,
                'submenus' => [
                    [
                        'name' => 'Application Menus',
                        'slug' => 'application-menus',
                        'icon' => 'menu',
                        'route' => 'application-menus.index',
                        'sort_order' => 1,
                        'is_active' => true,
                    ],
                    [
                        'name' => 'Menu Permissions',
                        'slug' => 'menu-permissions',
                        'icon' => 'key',
                        'route' => 'menu-access-permissions.index',
                        'sort_order' => 2,
                        'is_active' => true,
                    ],
                ],
            ],
            [
                'name' => 'Reports',
                'slug' => 'reports',
                'icon' => 'chart-bar',
                'route' => null,
                'sort_order' => 4,
                'is_active' => true,
                'submenus' => [
                    [
                        'name' => 'User Reports',
                        'slug' => 'user-reports',
                        'icon' => 'chart-line',
                        'route' => 'reports.users',
                        'sort_order' => 1,
                        'is_active' => true,
                    ],
                    [
                        'name' => 'Access Reports',
                        'slug' => 'access-reports',
                        'icon' => 'chart-pie',
                        'route' => 'reports.access',
                        'sort_order' => 2,
                        'is_active' => true,
                    ],
                ],
            ],
        ];

        foreach ($menus as $menuData) {
            $submenus = $menuData['submenus'];
            unset($menuData['submenus']);

            $menu = ApplicationMenu::firstOrCreate(
                ['slug' => $menuData['slug']],
                $menuData
            );

            foreach ($submenus as $submenuData) {
                $submenuData['application_menu_id'] = $menu->id;
                ApplicationSubmenu::firstOrCreate(
                    [
                        'application_menu_id' => $menu->id,
                        'slug' => $submenuData['slug']
                    ],
                    $submenuData
                );
            }
        }
    }
}