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
        Schema::create('caso_teste', function (Blueprint $table) {
            $table->id();
            $table->text('entrada');
            $table->text('saida');
            $table->boolean('privado')->default(true);
            $table->foreignId('problema_id');
            $table->foreign('problema_id')->references('id')->on('problema')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('caso_teste');
    }
};
