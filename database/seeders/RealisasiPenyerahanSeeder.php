<?php

namespace Database\Seeders;

use App\Models\RealisasiPenyerahan;
use Illuminate\Database\Seeder;

class RealisasiPenyerahanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Realisasi untuk kontrak CPO
        RealisasiPenyerahan::create([
            'tanggal_realisasi' => '2025-06-01',
            'volume_realisasi' => 100,
            'tahap' => 1,
            'kontrak_id' => 1, // Mengacu pada kontrak CPO yang dibuat di KontrakSeeder
            'jenis_realisasi' => 'parsing',
            'keterangan' => 'Pengiriman pertama sesuai jadwal',
        ]);

        RealisasiPenyerahan::create([
            'tanggal_realisasi' => '2025-06-10',
            'volume_realisasi' => 150,
            'tahap' => 2,
            'kontrak_id' => 1, // Mengacu pada kontrak CPO yang dibuat di KontrakSeeder
            'jenis_realisasi' => 'parsing',
            'keterangan' => 'Pengiriman kedua sesuai jadwal',
        ]);

        // Realisasi untuk kontrak PK
        RealisasiPenyerahan::create([
            'tanggal_realisasi' => '2025-06-05',
            'volume_realisasi' => 90,
            'tahap' => 1,
            'kontrak_id' => 2, // Mengacu pada kontrak PK yang dibuat di KontrakSeeder
            'jenis_realisasi' => 'parsing',
            'keterangan' => 'Pengiriman pertama sesuai jadwal',
        ]);

        RealisasiPenyerahan::create([
            'tanggal_realisasi' => '2025-06-20',
            'volume_realisasi' => 90,
            'tahap' => 2,
            'kontrak_id' => 2, // Mengacu pada kontrak PK yang dibuat di KontrakSeeder
            'jenis_realisasi' => 'parsing',
            'keterangan' => 'Pengiriman kedua sesuai jadwal',
        ]);
    }
}