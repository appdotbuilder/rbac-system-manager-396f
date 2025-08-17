<?php

namespace Database\Seeders;

use App\Models\UserType;
use Illuminate\Database\Seeder;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Employee',
                'description' => 'Regular company employee',
                'is_active' => true,
            ],
            [
                'name' => 'Contractor',
                'description' => 'External contractor or consultant',
                'is_active' => true,
            ],
            [
                'name' => 'Manager',
                'description' => 'Department or team manager',
                'is_active' => true,
            ],
            [
                'name' => 'Executive',
                'description' => 'Senior executive or C-level',
                'is_active' => true,
            ],
            [
                'name' => 'Intern',
                'description' => 'Student or trainee intern',
                'is_active' => true,
            ],
            [
                'name' => 'Vendor',
                'description' => 'External vendor or partner',
                'is_active' => true,
            ],
        ];

        foreach ($types as $type) {
            UserType::firstOrCreate(
                ['name' => $type['name']],
                $type
            );
        }
    }
}