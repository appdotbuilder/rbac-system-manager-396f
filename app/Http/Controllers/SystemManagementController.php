<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserRole;
use App\Models\UserType;
use App\Models\ApplicationMenu;
use App\Models\ApplicationSubmenu;
use App\Models\MenuAccessPermission;
use Inertia\Inertia;

class SystemManagementController extends Controller
{
    /**
     * Display the system management dashboard.
     */
    public function index()
    {
        $stats = [
            'users' => User::count(),
            'active_users' => User::active()->count(),
            'roles' => UserRole::count(),
            'types' => UserType::count(),
            'menus' => ApplicationMenu::count(),
            'submenus' => ApplicationSubmenu::count(),
            'permissions' => MenuAccessPermission::count(),
        ];

        $recent_users = User::with(['role', 'type'])
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('system-management', [
            'stats' => $stats,
            'recent_users' => $recent_users,
        ]);
    }
}