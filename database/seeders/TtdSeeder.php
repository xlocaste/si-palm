<?php

namespace Database\Seeders;

use App\Models\Ttd;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TtdSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Ttd::create([
            'sevp' => 'Muhammad Zulham Rambe',
            'ksbl' => 'Arie Rizky Richard',
            'kbpt' => 'Sri Yetty Mida M, N',
        ]);
    }
}
