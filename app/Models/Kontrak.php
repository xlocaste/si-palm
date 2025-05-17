<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kontrak extends Model
{
    use HasFactory;

    protected $table = 'kontrak';

    protected $fillable = [
        'no_kontrak',
        'penjual_dan_pemilik_komoditas',
        'no_referensi',
        'komoditi',
        'jenis_komoditi',
        'symbol',
        'packaging',
        'deskripsi_produk',
        'produsen',
        'pelabuhan_muat',
        'harga_satuan',
        'ppn',
        'kondisi_penyerahan',
        'pembayaran_id',
        'waktu_penyerahan',
        'syarat_lain',
        'dasar_ketentuan',
        'jumlah_pembayaran',
        'pembeli',
        'mutu',
        'harga',
        'volume',
        'tanggal_kontrak',
        'jatuh_tempo',
        'jenis_tempo_penyerahan',
        'jenis_kontrak',
    ];
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class);
    }
}
