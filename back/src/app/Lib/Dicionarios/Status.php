<?php
namespace App\Lib\Dicionarios;

class Status {
    const NA_FILA = 1;
    const EM_PROCESSAMENTO = 2;
    const ACEITA = 3;
    const RESPOSTA_ERRADA = 4;
    const TEMPO_LIMITE_EXCEDIDO = 5;
    const ERRO_DE_COMPILACAO = 6;
    const ERRO_EXECUCAO_SIGSEV = 7;
    const ERRO_EXECUCAO_SIGXFSZ = 8;
    const ERRO_EXECUCAO_SIGFPE = 9;
    const ERRO_EXECUCAO_SIGABRT = 10;
    const ERRO_EXECUCAO_NZEC = 11;
    const ERRO_EXECUCAO = 12;
    const ERRO_INTERNO = 13;
    const ERRO_FORMATO_EXECUCAO = 14;


    static function all(){
        return [
            self::NA_FILA => ['nome' => 'Na Fila', 'descricao' => 'A submissão está na fila aguardando ser processada.'],
            self::EM_PROCESSAMENTO => ['nome' => 'Em Processamento', 'descricao' => 'A submissão está sendo processada.'],
            self::ACEITA => ['nome' => 'Aceita', 'descricao' => 'A submissão foi processada e aceita.'],
            self::RESPOSTA_ERRADA => ['nome' => 'Resposta Errada', 'descricao' => 'A submissão foi processada e rejeitada por resposta diferente da esperada.'],
            self::TEMPO_LIMITE_EXCEDIDO => ['nome' => 'Tempo Limite Excedido', 'descricao' => 'A submissão foi processada e rejeitada por tempo de execução mais alto que o limite.'],
            self::ERRO_DE_COMPILACAO => ['nome' => 'Erro de Compilação', 'descricao' => 'A submissão foi processada e houve um erro durante a compilação.'],
            self::ERRO_EXECUCAO_SIGSEV => ['nome' => 'Erro de Execução (SIGSEGV)', 'descricao' => 'A submissão foi processada e houve uma falha de segmentação durante a execução.'],
            self::ERRO_EXECUCAO_SIGXFSZ =>['nome' => 'Erro de Execução (SIGXFSZ)', 'descricao' => 'A submissão foi processada e houve um erro de tamanho de arquivo excedido.'],
            self::ERRO_EXECUCAO_SIGFPE => ['nome' => 'Erro de Execução (SIGFPE)', 'descricao' => 'A submissão foi processada e houve um erro de ponto flutuante.'],
            self::ERRO_EXECUCAO_SIGABRT => ['nome' => 'Erro de Execução (SIGABRT)', 'descricao' => 'A submissão foi processada e o programa abortou sua execução.'],
            self::ERRO_EXECUCAO_NZEC => ['nome' => 'Erro de Execução (NZEC)', 'descricao' => 'A submissão foi processada e o programa retornou algo diferente de 0.'],
            self::ERRO_EXECUCAO => ['nome' => 'Erro de Execução', 'descricao' => 'A submissão foi processada e ocorreu algum erro durante a execução do programa.'],
            self::ERRO_INTERNO => ['nome' => 'Erro Interno', 'descricao' => 'Aconteceu um erro interno que impediu que a submissão fosse processada.'],
            self::ERRO_FORMATO_EXECUCAO => ['nome' => 'Erro no Formato de Execução', 'descricao' => 'Erro no formato de execução.'],
        ];
    }

    static function get(int $id){
        return self::all()[$id];
    }

}
