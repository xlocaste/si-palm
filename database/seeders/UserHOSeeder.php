<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserHOSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $headofficeRole = Role::firstOrCreate(['name' => 'headoffice']);

        $headoffice = User::create([
            'name' => 'Head Office',
            'email' => 'headoffice@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);
        $headoffice->assignRole($headofficeRole);
    }
}
