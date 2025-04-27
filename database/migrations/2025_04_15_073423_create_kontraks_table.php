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
            $table->string('pembeli');
            $table->integer('mutu');
            $table->integer('harga');
            $table->integer('volume');
            $table->date('tanggal_kontrak');
            $table->date(column:'jatuh_tempo');
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
