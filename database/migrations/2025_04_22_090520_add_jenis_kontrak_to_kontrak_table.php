<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('kontrak', function (Blueprint $table) {
            $table->enum('jenis_kontrak', ['CPO', 'PK'])->default('CPO');
        });
    }

    public function down(): void
    {
        Schema::table('kontrak', function (Blueprint $table) {
            $table->dropColumn('jenis_kontrak');
        });
    }
};
