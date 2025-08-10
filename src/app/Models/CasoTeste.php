<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CasoTeste extends Model
{
    use HasFactory;
    protected $table = 'caso_teste';

    protected $fillable = [
        'entrada', 'saida', 'privado', 'problema_id',
    ];
}
