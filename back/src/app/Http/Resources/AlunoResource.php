<?php

namespace App\Http\Resources;

use App\Models\Aluno;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlunoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // this->resource se refere ao objeto User que foi passado para o resource
        // Busca o aluno associado diretamente
        $aluno = Aluno::with('curso')->where('user_id', $this->id)->first();
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toDateTimeString(),
            'matricula' => $aluno?->matricula,
            'curso' => $aluno?->curso ? [
                'id' => $aluno->curso->id,
                'nome' => $aluno->curso->nome,
            ] : null
        ];
    }
}
