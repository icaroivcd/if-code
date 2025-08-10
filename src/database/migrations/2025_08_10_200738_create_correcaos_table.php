<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('correcao', function (Blueprint $table) {
            $table->id();
            $table->string('token', 512);
            $table->integer('status');
            $table->timestamps();
        });

        Schema::create('submissao_correcao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('submissao_id');
            $table->foreignId('correcao_id');
            $table->foreign('submissao_id')->references('id')->on('submissao')->cascadeOnDelete();
            $table->foreign('correcao_id')->references('id')->on('correcao');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissao_correcao');
        Schema::dropIfExists('correcao');
    }
};
