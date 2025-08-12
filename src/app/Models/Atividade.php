<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atividade extends Model
{
    protected $table = 'atividade';
    protected $fillable = [
        'data_entrega',
        'problema_id',
    ];

    public function problema()
    {
        return $this->hasOne(Problema::class, 'id', 'problema_id');
    }
}
