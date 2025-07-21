<?php

namespace Database\Seeders;

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
            UserHOSeeder::class
            // TtdSeeder::class
            // InvoiceSeeder::class,
            // UserSeeder::class,
            // RolePermissionSeeder::class,
            // KontrakSeeder::class,
            // SalesOrderSeeder::class,
            // RealisasiPenyerahanSeeder::class,
        ]);
    }
}
