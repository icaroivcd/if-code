<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Cria um usuário de teste
        //TODO: CRIE UM SEEDER PARA FICAR MAIS ORGANIZADO
        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Roda os outros seeders
        $this->call([
            CursoSeeder::class, // Primeiro cria os cursos
            AlunoSeeder::class, // Depois cria os alunos, que dependem dos cursos
        ]);
    }
}
