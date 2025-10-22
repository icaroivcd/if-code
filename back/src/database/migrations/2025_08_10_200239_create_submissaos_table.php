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
        Schema::create('submissao', function (Blueprint $table) {
            $table->id();
            $table->date('data_submissao');
            $table->text('codigo');
            $table->integer('linguagem');
            $table->foreignId('atividade_id');
            $table->foreign('atividade_id')->references('id')->on('atividade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissao');
    }
};
