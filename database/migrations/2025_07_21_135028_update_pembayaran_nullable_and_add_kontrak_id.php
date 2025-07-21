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
        Schema::table('pembayaran', function (Blueprint $table) {
            $table->string('metode')->nullable()->change();
            $table->string('nama_bank')->nullable()->change();
            $table->string('cara_pembayaran')->nullable()->change();
            $table->string('atas_nama')->nullable()->change();
            $table->string('rek_no')->nullable()->change();
            $table->date('jatuh_tempo_pembayaran')->nullable()->change();
            $table->unsignedBigInteger('kontrak_id')->nullable()->change();
            $table->string('file')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pembayaran', function (Blueprint $table) {
            $table->string('metode')->nullable(false)->change();
            $table->string('nama_bank')->nullable(false)->change();
            $table->string('cara_pembayaran')->nullable(false)->change();
            $table->string('atas_nama')->nullable(false)->change();
            $table->string('rek_no')->nullable(false)->change();
            $table->date('jatuh_tempo_pembayaran')->nullable(false)->change();
            $table->unsignedBigInteger('kontrak_id')->nullable(false)->change();
            $table->string('file')->nullable(false)->change();
        });
    }
};
