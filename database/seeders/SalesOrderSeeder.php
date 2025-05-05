<?php

namespace Database\Seeders;

use App\Models\SalesOrder;
use Illuminate\Database\Seeder;

class SalesOrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contoh data Sales Order untuk kontrak CPO
        SalesOrder::create([
            'no_sales_order' => 'SO-CPO-2025-001',
            'tanggal_sales_order' => '2025-05-16',
            'tahap' => 1,
            'volume_sales_order' => 100,
            'nilai' => 5000000,
            'kontrak_id' => 1, // Mengacu pada kontrak CPO yang dibuat di KontrakSeeder
        ]);

        SalesOrder::create([
            'no_sales_order' => 'SO-CPO-2025-002',
            'tanggal_sales_order' => '2025-05-30',
            'tahap' => 2,
            'volume_sales_order' => 150,
            'nilai' => 7500000,
            'kontrak_id' => 1, // Mengacu pada kontrak CPO yang dibuat di KontrakSeeder
        ]);

        // Contoh data Sales Order untuk kontrak PK
        SalesOrder::create([
            'no_sales_order' => 'SO-PK-2025-001',
            'tanggal_sales_order' => '2025-05-22',
            'tahap' => 1,
            'volume_sales_order' => 90,
            'nilai' => 4250000,
            'kontrak_id' => 2, // Mengacu pada kontrak PK yang dibuat di KontrakSeeder
        ]);

        SalesOrder::create([
            'no_sales_order' => 'SO-PK-2025-002',
            'tanggal_sales_order' => '2025-06-05',
            'tahap' => 2,
            'volume_sales_order' => 90,
            'nilai' => 4250000,
            'kontrak_id' => 2, // Mengacu pada kontrak PK yang dibuat di KontrakSeeder
        ]);
    }
}