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

}
