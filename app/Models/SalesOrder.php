<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    use HasFactory;

    protected $table = "sales_order";

    protected $fillable = [
        'kontrak_id',
        'no_sales_order',
        'tanggal_sales_order',
        'tahap',
        'volume_sales_order',
        'nilai',
    ];

    public function kontrak()
    {
        return $this->belongsTo(Kontrak::class);
    }
}
