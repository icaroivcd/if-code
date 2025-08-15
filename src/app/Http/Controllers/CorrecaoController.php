<?php

namespace App\Http\Controllers;

use App\Models\Correcao;
use App\Models\Submissao;
use Illuminate\Http\Request;

class CorrecaoController extends Controller
{
    public function buscaPorSubmissao(Submissao $submissao){
        $correcoes = Correcao::where('submissao_id', '=', $submissao->id)
            ->select('correcao.id', 'caso_teste_id', 'submissao_id', 'status_correcao.nome as status')
            ->join('status_correcao', 'status_correcao.id', '=', 'correcao.status_correcao_id')
            ->get();

        return response()->json($correcoes);
    }
}
