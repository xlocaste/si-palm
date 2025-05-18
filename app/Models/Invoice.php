<?php

namespace App\Models;

use Carbon\Carbon;
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
        'jumlah',
        'created_at',
    ];

    public function kontrak()
    {
        return $this->belongsTo(Kontrak::class);
    }

    public function getFormattedCreatedAtAttribute()
    {
        return Carbon::parse($this->created_at)->translatedFormat('d F Y');
    }
}
