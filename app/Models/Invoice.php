<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $table = "invoice";

    protected $fillable = [
        'kontrak_id',
        'no_invoice',
        'tanggal_bayar',
        'nilai',
        'ppn',
        'terbilang',
    ];

    public function kontrak()
    {
        return $this->belongsTo(Kontrak::class);
    }

}
