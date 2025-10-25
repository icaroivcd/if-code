<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('submissao_correcao');

        Schema::table('correcao', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->string('token', 512)->unique()->change();
            $table->foreignId('submissao_id');
            $table->foreignId('status_correcao_id');
            $table->foreignId('caso_teste_id');
            $table->foreign('submissao_id')->references('id')->on('submissao')->cascadeOnDelete();
            $table->foreign('status_correcao_id')->references('id')->on('status_correcao');
            $table->foreign('caso_teste_id')->references('id')->on('caso_teste');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('correcao');
    }
};
