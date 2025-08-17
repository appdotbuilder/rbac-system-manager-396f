<?php

use App\Http\Controllers\SystemManagementController;
use App\Http\Controllers\UserManagementController;
use App\Http\Controllers\UserRoleController;
use App\Http\Controllers\UserTypeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page (not authenticated)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// System Management Routes (authenticated)
Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard - system management
    Route::get('/dashboard', [SystemManagementController::class, 'index'])->name('dashboard');
    
    // User Management
    Route::resource('users', UserManagementController::class);
    
    // Role Management
    Route::resource('user-roles', UserRoleController::class);
    
    // Type Management
    Route::resource('user-types', UserTypeController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
