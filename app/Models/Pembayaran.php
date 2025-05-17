<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    use HasFactory;

    protected $table = 'pembayaran';

    protected $fillable = [
        'kontrak_id',
        'metode',
        'nama_bank',
        'cara_pembayaran',
        'atas_nama',
        'rek_no',
        'jatuh_tempo_pembayaran',
        'created_at'
    ];

    public function kontrak()
    {
        return $this->belongsTo(Kontrak::class);
    }
}
