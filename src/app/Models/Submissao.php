<?php

namespace App\Models;

use App\Facades\Judge0;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Submissao extends Model
{
    protected $table = 'submissao';
    protected $fillable = [
        'id',
        'data_submissao',
        'codigo',
        'linguagem',
        'atividade_id'
    ];

    public function atividade(): BelongsTo
    {
        return $this->belongsTo(Atividade::class);
    }

    public function correcoes()
    {
        return $this->hasMany(Correcao::class);
    }

    public function getStatus(): array
    {
        $resultados = Judge0::getResultados($this);
        $resposta = [];
        foreach ($resultados as $resultado) {
            $resposta['status'] = StatusCorrecao::find($resultado['status_id'])->nome;
            if ($resultado['status_id'] == 4) {
                $resposta['erro_teste'] = Correcao::where('token', $resultado['token'])->first()->caso_teste_id;
            }
            else if ($resultado['status_id'] == 6) {
                $resposta['erro'] = base64_decode($resultado['compile_output']);
            }
            if($resultado['status_id'] != 3) {
                return $resposta;
            }
        }
        return $resposta;
    }

}
