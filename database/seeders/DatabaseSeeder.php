<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserRoleSeeder::class,
            UserTypeSeeder::class,
            ApplicationMenuSeeder::class,
        ]);

        // Create admin user
        $adminRole = \App\Models\UserRole::where('name', 'Superadmin')->first();
        $employeeType = \App\Models\UserType::where('name', 'Employee')->first();

        \App\Models\User::factory()->create([
            'name' => 'System Admin',
            'email' => 'admin@example.com',
            'user_role_id' => $adminRole?->id,
            'user_type_id' => $employeeType?->id,
            'is_active' => true,
        ]);

        // Create test user
        $userRole = \App\Models\UserRole::where('name', 'User')->first();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'user_role_id' => $userRole?->id,
            'user_type_id' => $employeeType?->id,
            'is_active' => true,
        ]);

        // Create additional sample users
        \App\Models\User::factory(15)->create();
    }
}
