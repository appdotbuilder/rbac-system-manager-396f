<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserTypeRequest;
use App\Http\Requests\UpdateUserTypeRequest;
use App\Models\UserType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserTypeController extends Controller
{
    /**
     * Display a listing of the user types.
     */
    public function index(Request $request)
    {
        $query = UserType::withCount('users');

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

        $types = $query->orderBy('name')
                      ->paginate(15)
                      ->withQueryString();

        return Inertia::render('user-types/index', [
            'types' => $types,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new user type.
     */
    public function create()
    {
        return Inertia::render('user-types/create');
    }

    /**
     * Store a newly created user type in storage.
     */
    public function store(StoreUserTypeRequest $request)
    {
        $type = UserType::create($request->validated());

        return redirect()->route('user-types.show', $type)
            ->with('success', 'User type created successfully.');
    }

    /**
     * Display the specified user type.
     */
    public function show(UserType $userType)
    {
        $userType->loadCount('users');
        $userType->load('users:id,name,email,user_type_id');

        return Inertia::render('user-types/show', [
            'type' => $userType,
        ]);
    }

    /**
     * Show the form for editing the specified user type.
     */
    public function edit(UserType $userType)
    {
        return Inertia::render('user-types/edit', [
            'type' => $userType,
        ]);
    }

    /**
     * Update the specified user type in storage.
     */
    public function update(UpdateUserTypeRequest $request, UserType $userType)
    {
        $userType->update($request->validated());

        return redirect()->route('user-types.show', $userType)
            ->with('success', 'User type updated successfully.');
    }

    /**
     * Remove the specified user type from storage.
     */
    public function destroy(UserType $userType)
    {
        if ($userType->users()->exists()) {
            return redirect()->route('user-types.index')
                ->with('error', 'Cannot delete type that has assigned users.');
        }

        $userType->delete();

        return redirect()->route('user-types.index')
            ->with('success', 'User type deleted successfully.');
    }
}