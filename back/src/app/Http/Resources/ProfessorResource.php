<?php

namespace App\Http\Resources;

use App\Models\Professor;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfessorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // this->resource se refere ao objeto User que foi passado para o resource
        // Busca o professor associado diretamente
        $professor = Professor::where('id', $this->id)->first();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->toDateTimeString(),
            'area_atuacao' => $professor?->area_atuacao,
        ];
    }
}
