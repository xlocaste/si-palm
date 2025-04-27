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
        Schema::create('realisasi_penyerahan', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kontrak_id');
            $table->unsignedBigInteger('invoice_id');
            $table->date('tanggal_serah')->unique();
            $table->boolean('alb');
            $table->boolean('ka',);
            $table->boolean('kk');
            $table->string('no_ba');
            $table->string('no_surat_penerbitan_invoice');
            $table->date('tanggal_surat_invoice');
            $table->timestamps();

            $table->foreign('kontrak_id')->references('id')->on('kontrak');
            $table->foreign('invoice_id')->references('id')->on('invoice');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('realisasi_penyerahan');
    }
};
