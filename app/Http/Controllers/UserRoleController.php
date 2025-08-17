<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRoleRequest;
use App\Http\Requests\UpdateUserRoleRequest;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRoleController extends Controller
{
    /**
     * Display a listing of the user roles.
     */
    public function index(Request $request)
    {
        $query = UserRole::withCount('users');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->input('status') === 'active');
        }

        $roles = $query->orderBy('priority', 'desc')
                      ->orderBy('name')
                      ->paginate(15)
                      ->withQueryString();

        return Inertia::render('user-roles/index', [
            'roles' => $roles,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new user role.
     */
    public function create()
    {
        return Inertia::render('user-roles/create');
    }

    /**
     * Store a newly created user role in storage.
     */
    public function store(StoreUserRoleRequest $request)
    {
        $role = UserRole::create($request->validated());

        return redirect()->route('user-roles.show', $role)
            ->with('success', 'User role created successfully.');
    }

    /**
     * Display the specified user role.
     */
    public function show(UserRole $userRole)
    {
        $userRole->loadCount('users');
        $userRole->load('users:id,name,email,user_role_id');

        return Inertia::render('user-roles/show', [
            'role' => $userRole,
        ]);
    }

    /**
     * Show the form for editing the specified user role.
     */
    public function edit(UserRole $userRole)
    {
        return Inertia::render('user-roles/edit', [
            'role' => $userRole,
        ]);
    }

    /**
     * Update the specified user role in storage.
     */
    public function update(UpdateUserRoleRequest $request, UserRole $userRole)
    {
        $userRole->update($request->validated());

        return redirect()->route('user-roles.show', $userRole)
            ->with('success', 'User role updated successfully.');
    }

    /**
     * Remove the specified user role from storage.
     */
    public function destroy(UserRole $userRole)
    {
        if ($userRole->users()->exists()) {
            return redirect()->route('user-roles.index')
                ->with('error', 'Cannot delete role that has assigned users.');
        }

        $userRole->delete();

        return redirect()->route('user-roles.index')
            ->with('success', 'User role deleted successfully.');
    }
}