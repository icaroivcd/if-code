<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="CasoTeste",
 *     type="object",
 *     title="Caso de Teste Model",
 *     description="Representa um único caso de teste para um problema, com entrada e saída esperada.",
 *     properties={
 *         @OA\Property(property="id", type="integer", readOnly="true", example=1),
 *         @OA\Property(property="entrada", type="string", description="Dados de entrada para o caso de teste.", example="5\n10"),
 *         @OA\Property(property="saida", type="string", description="Saída esperada para a entrada fornecida.", example="15"),
 *         @OA\Property(property="privado", type="boolean", description="Indica se o caso de teste é visível para o usuário (false) ou oculto (true).", example=false),
 *         @OA\Property(property="problema_id", type="integer", readOnly="true", description="ID do problema ao qual o caso de teste pertence.", example=1)
 *     }
 * )
 */
class CasoTeste extends Model
{
    use HasFactory;
    protected $table = 'caso_teste';

    protected $fillable = [
        'entrada', 'saida', 'privado', 'problema_id',
    ];
}
