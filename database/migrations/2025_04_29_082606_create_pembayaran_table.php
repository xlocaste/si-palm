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
        Schema::create('pembayaran', function (Blueprint $table) {
            $table->id();
            $table->string('metode'); 
            $table->string('nama_bank')->nullable(); 
            $table->string('cara_pembayaran'); 
            $table->string('atas_nama'); 
            $table->string('rek_no'); 
            $table->date('jatuh_tempo_pembayaran')->nullable(); 
            $table->timestamps();  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran');
    }
};

