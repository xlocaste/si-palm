<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('kontrak', function (Blueprint $table) {
            $table->id();
            $table->string('no_kontrak');
            $table->string('penjual_dan_pemilik_komoditas');
            $table->string('no_referensi');
            $table->string('komoditi');
            $table->string('jenis_komoditi');
            $table->string('symbol');
            $table->string('packaging');
            $table->string('deskripsi_produk');
            $table->string('produsen');
            $table->string('pelabuhan_muat');
            $table->integer('harga_satuan');
            $table->string('ppn');
            $table->string('kondisi_penyerahan');
            $table->string('pembayaran');
            $table->string('metode');
            $table->string('nama_bank');
            $table->string('cara_pembayaran');
            $table->string('atas_nama');
            $table->string('rek_no');
            $table->timestamp('waktu_penyerahan')->nullable();
            $table->string('syarat_lain');
            $table->string('dasar_ketentuan');
            $table->string('jumlah_pembayaran');
            $table->string('pembeli');
            $table->integer('mutu');
            $table->decimal('harga', 15, 2);
            $table->decimal('volume', 15, 2);
            $table->date('tanggal_kontrak');
            $table->date('jatuh_tempo');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kontrak');
    }
};
