<?php

namespace Database\Seeders;

use App\Models\Invoice;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Invoice untuk kontrak CPO
        Invoice::create([
            'no_invoice' => 'INV-CPO-2025-001',
            'kontrak_id' => 1,
            'tanggal_bayar' => '2025-05-15',
            'nilai' => '5000000',
        ]);

        Invoice::create([
            'no_invoice' => 'INV-CPO-2025-002',
            'kontrak_id' => 1,
            'tanggal_bayar' => '2025-06-20',
            'nilai' => '7500000',
        ]);

        // Invoice untuk kontrak PK
        Invoice::create([
            'no_invoice' => 'INV-PK-2025-001',
            'kontrak_id' => 2,
            'tanggal_bayar' => '2025-05-10',
            'nilai' => '4250000',
        ]);

        Invoice::create([
            'no_invoice' => 'INV-PK-2025-002',
            'kontrak_id' => 2,
            'tanggal_bayar' => '2025-06-15',
            'nilai' => '4250000',
        ]);
    }
}