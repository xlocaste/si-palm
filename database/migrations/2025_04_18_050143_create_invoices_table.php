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
        Schema::create('invoice', function (Blueprint $table) {
            $table->id();
            $table->string('no_invoice')->unique();
            $table->unsignedBigInteger('kontrak_id')->nullable();
            $table->date('tanggal_bayar');
            $table->string('nilai');
            $table->timestamps();

            $table->foreign('kontrak_id')->references('id')->on('kontrak');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice');
    }
};
