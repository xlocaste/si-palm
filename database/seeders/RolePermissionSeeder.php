<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Membuat permissions untuk modul Kontrak
        $kontrakPermissions = [
            'kontrak.view',
            'kontrak.create',
            'kontrak.edit',
            'kontrak.delete',
        ];

        // Membuat permissions untuk modul Sales Order
        $salesOrderPermissions = [
            'sales-order.view',
            'sales-order.create',
            'sales-order.edit',
            'sales-order.delete',
        ];

        // Membuat permissions untuk modul Realisasi Penyerahan
        $realisasiPermissions = [
            'realisasi.view',
            'realisasi.create',
            'realisasi.edit',
            'realisasi.delete',
        ];

        // Membuat permissions untuk modul Invoice
        $invoicePermissions = [
            'invoice.view',
            'invoice.create',
            'invoice.edit',
            'invoice.delete',
        ];

        // Membuat permissions
        $allPermissions = array_merge(
            $kontrakPermissions,
            $salesOrderPermissions,
            $realisasiPermissions,
            $invoicePermissions
        );

        foreach ($allPermissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Membuat role admin
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo($allPermissions);

        // Membuat role user
        $userRole = Role::create(['name' => 'user']);
        $userRole->givePermissionTo([
            'kontrak.view',
            'sales-order.view',
            'realisasi.view',
            'invoice.view',
        ]);

        // Assign roles ke users
        $admin = User::where('email', 'admin@example.com')->first();
        if ($admin) {
            $admin->assignRole('admin');
        }

        $user = User::where('email', 'user@example.com')->first();
        if ($user) {
            $user->assignRole('user');
        }
    }
}