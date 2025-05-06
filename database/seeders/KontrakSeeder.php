<?php

namespace Database\Seeders;

use App\Models\Kontrak;
use Illuminate\Database\Seeder;

class KontrakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contoh data CPO
        Kontrak::create([
            'no_kontrak' => 'CPO-2025-001',
            'jenis_kontrak' => 'CPO',
            'pembeli' => 'PT Minyak Jaya',
            'mutu' => '5',
            'harga' => 12500000,
            'volume' => 250,
            'tanggal_kontrak' => '2025-05-15',
            'jatuh_tempo' => '2025-06-15',
            'jenis_tempo_penyerahan' => 'tender',
            'penjual_dan_pemilik_komoditas' => 'PT Palm Indo',
            'no_referensi' => 'REF-2025-001',
            'komoditi' => 'Minyak Sawit',
            'jenis_komoditi' => 'Grade A',
            'symbol' => 'CPOA',
            'packaging' => 'Curah',
            'deskripsi_produk' => 'Minyak sawit mentah kualitas tinggi',
            'produsen' => 'PT Palm Indo',
            'pelabuhan_muat' => 'Belawan',
            'harga_satuan' => 50000,
            'ppn' => '11',
            'kondisi_penyerahan' => 'FOB',
            'pembayaran' => 'Transfer Bank',
            'metode' => 'Full Payment',
            'nama_bank' => 'Bank Mandiri',
            'cara_pembayaran' => 'Tunai',
            'atas_nama' => 'PT Palm Indo',
            'rek_no' => '1234567890',
            'waktu_penyerahan' => '2025-05-30 09:00:00',
            'syarat_lain' => 'Harus sesuai standar BPOM',
            'dasar_ketentuan' => 'Kontrak perdagangan standar',
            'jumlah_pembayaran' => 12500000,
        ]);

        // Contoh data PK
        Kontrak::create([
            'no_kontrak' => 'PK-2025-001',
            'jenis_kontrak' => 'PK',
            'pembeli' => 'PT Inti Kimia',
            'mutu' => '4',
            'harga' => 8500000,
            'volume' => 180,
            'tanggal_kontrak' => '2025-05-20',
            'jatuh_tempo' => '2025-07-01',
            'jenis_tempo_penyerahan' => 'bid_offer',
            'penjual_dan_pemilik_komoditas' => 'PT Palm Indo',
            'no_referensi' => 'REF-2025-002',
            'komoditi' => 'Palm Kernel',
            'jenis_komoditi' => 'Grade B',
            'symbol' => 'PKB',
            'packaging' => 'Karung',
            'deskripsi_produk' => 'Inti sawit kualitas baik',
            'produsen' => 'PT Palm Indo',
            'pelabuhan_muat' => 'Dumai',
            'harga_satuan' => 47222,
            'ppn' => '11',
            'kondisi_penyerahan' => 'CIF',
            'pembayaran' => 'Transfer Bank',
            'metode' => 'Partial Payment',
            'nama_bank' => 'Bank BCA',
            'cara_pembayaran' => 'Tunai',
            'atas_nama' => 'PT Palm Indo',
            'rek_no' => '0987654321',
            'waktu_penyerahan' => '2025-06-15 10:00:00',
            'syarat_lain' => 'Harus sesuai standar ISO',
            'dasar_ketentuan' => 'Kontrak perdagangan standar',
            'jumlah_pembayaran' => 8500000,
        ]);
    }
}