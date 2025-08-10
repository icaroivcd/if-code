<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Problema extends Model
{
    use HasFactory;

    protected $table = 'problema';

    protected $fillable = [
        'titulo',
        'enunciado',
        'tempo_limite',
        'memoria_limite',
    ];

    public function casosTeste(){
        return $this->hasMany(CasoTeste::class, 'problema_id');
    }
}
