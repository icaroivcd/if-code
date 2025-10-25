<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professor extends Model
{
    use HasFactory;

    protected $table = "professor";


    protected $fillable = [
        'id',
        'area_atuacao',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'id');
    }

    // public function turmas()
    // {
    //     return $this->hasMany(Turma::class, 'professor_id');
    // }

    public function problemas()
    {
        return $this->hasMany(Problema::class, 'professor_id');
    }
}
