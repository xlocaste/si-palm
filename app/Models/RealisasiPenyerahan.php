<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RealisasiPenyerahan extends Model
{
    use HasFactory;

    protected $table = "realisasi_penyerahan";

    protected $fillable = [
        'kontrak_id',
        'invoice_id',
        'tanggal_serah',
        'alb',
        'ka',
        'kk',
        'no_ba',
        'no_surat_penerbitan_invoice',
        'tanggal_surat_invoice',
    ];

    public function kontrak()
    {
        return $this->belongsTo(Kontrak::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function getFormattedCreatedAtAttribute()
    {
        return Carbon::parse($this->created_at)->translatedFormat('d F Y');
    }
}
