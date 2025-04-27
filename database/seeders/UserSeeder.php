<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
            ]
        );

        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $admin->assignRole($adminRole);

        $user = User::firstOrCreate(
            ['email' => 'user@example.com'],
            [
                'name' => 'User Biasa',
                'password' => Hash::make('password'),
            ]
        );

        $userRole = Role::firstOrCreate(['name' => 'user']);
        $user->assignRole($userRole);
    }
}
