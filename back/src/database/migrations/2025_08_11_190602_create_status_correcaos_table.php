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
        Schema::create('status_correcao', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->unique();
            $table->string('descricao');
        });

        DB::table('status_correcao')->insert([
            ['nome' => 'Na Fila', 'descricao' => 'A submissão está na fila aguardando ser processada.'],
            ['nome' => 'Em Processamento', 'descricao' => 'A submissão está sendo processada.'],
            ['nome' => 'Aceita', 'descricao' => 'A submissão foi processada e aceita.'],
            ['nome' => 'Resposta Errada', 'descricao' => 'A submissão foi processada e rejeitada por resposta diferente da esperada.'],
            ['nome' => 'Tempo Limite Excedido', 'descricao' => 'A submissão foi processada e rejeitada por tempo de execução mais alto que o limite.'],
            ['nome' => 'Erro de Compilação', 'descricao' => 'A submissão foi processada e houve um erro durante a compilação.'],
            ['nome' => 'Erro de Execução (SIGSEGV)', 'descricao' => 'A submissão foi processada e houve uma falha de segmentação durante a execução.'],
            ['nome' => 'Erro de Execução (SIGXFSZ)', 'descricao' => 'A submissão foi processada e houve um erro de tamanho de arquivo excedido.'],
            ['nome' => 'Erro de Execução (SIGFPE)', 'descricao' => 'A submissão foi processada e houve um erro de ponto flutuante.'],
            ['nome' => 'Erro de Execução (SIGABRT)', 'descricao' => 'A submissão foi processada e o programa abortou sua execução.'],
            ['nome' => 'Erro de Execução (NZEC)', 'descricao' => 'A submissão foi processada e o programa retornou algo diferente de 0.'],
            ['nome' => 'Erro de Execução', 'descricao' => 'A submissão foi processada e ocorreu algum erro durante a execução do programa.'],
            ['nome' => 'Erro Interno', 'descricao' => 'Aconteceu um erro interno que impediu que a submissão fosse processada.'],
            ['nome' => 'Erro no Formato de Execução', 'descricao' => 'Erro no formato de execução.'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status_correcao');
    }
};
