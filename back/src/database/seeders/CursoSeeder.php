<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Curso;

class CursoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpa a tabela antes de popular para evitar duplicatas ao rodar o seeder várias vezes
        Curso::truncate();

        Curso::create(['nome' => 'Engenharia de Software']);
        Curso::create(['nome' => 'Ciência da Computação']);
        Curso::create(['nome' => 'Sistemas de Informação']);
    }
}
