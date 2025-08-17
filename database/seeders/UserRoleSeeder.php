<?php

namespace Database\Seeders;

use App\Models\UserRole;
use Illuminate\Database\Seeder;

class UserRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Superadmin',
                'description' => 'Full system access with all permissions',
                'priority' => 100,
                'is_active' => true,
            ],
            [
                'name' => 'Administrator',
                'description' => 'Administrative privileges with most permissions',
                'priority' => 80,
                'is_active' => true,
            ],
            [
                'name' => 'Operator',
                'description' => 'Operational control with limited permissions',
                'priority' => 60,
                'is_active' => true,
            ],
            [
                'name' => 'User',
                'description' => 'Standard user access with basic permissions',
                'priority' => 40,
                'is_active' => true,
            ],
            [
                'name' => 'Auditor',
                'description' => 'Read-only access for auditing purposes',
                'priority' => 20,
                'is_active' => true,
            ],
        ];

        foreach ($roles as $role) {
            UserRole::firstOrCreate(
                ['name' => $role['name']],
                $role
            );
        }
    }
}