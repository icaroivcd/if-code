<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Professor;
use App\Models\User;
use App\Http\Resources\ProfessorResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class ProfessorController extends Controller
{

    /**
     * @OA\Get(
     *     path="/api/professores",
     *     summary="Lista todos os professores",
     *     tags={"Professores"},
     *     @OA\Response(
     *         response=200,
     *         description="Operação bem-sucedida",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/ProfessorResource"))
     *     )
     * )
     */
    public function index()
    {
        // Busca usuários que possuem uma entrada correspondente na tabela 'professor'
        $professores = User::join('professor', 'users.id', '=', 'professor.id')
            ->select('users.*')
            ->latest('users.created_at')
            ->paginate(15);

        return ProfessorResource::collection($professores);
    }


    /**
     * @OA\Post(
     *     path="/api/professores",
     *     summary="Cria um novo professor",
     *     tags={"Professores"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/StoreProfessorRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Professor criado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/ProfessorResource")
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Erro de validação"
     *     )
     * )
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'area_atuacao' => 'required|string|max:100',
        ]);

        $user = DB::transaction(function () use ($validated) {
            // Primeiro cria o User
            $user = User::create([
                'name' => $validated['name'],
                'email' => strtolower($validated['email']),
                'password' => $validated['password'],
            ]);

            // Depois cria o Professor
            Professor::create([
                'id' => $user->id,
                'area_atuacao' => $validated['area_atuacao'],
            ]);

            // Atribui a role de professor
            $user->assignRole('professor');

            return $user;
        });

        return (new ProfessorResource($user))
            ->response()
            ->setStatusCode(201); // HTTP 201: Created
    }


    /**
     * @OA\Put(
     *     path="/api/professores/{id}",
     *     summary="Atualiza um professor existente",
     *     tags={"Professores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/UpdateProfessorRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Professor atualizado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/ProfessorResource")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Professor não encontrado"
     *     )
     * )
     */
    public function update(Request $request, User $professor)
    {
        // Verifica se o usuário tem um registro de professor associado
        $professorRecord = Professor::where('id', $professor->id)->first();
        if (!$professorRecord) {
            return response()->json(['message' => 'Professor não encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($professor->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'area_atuacao' => 'sometimes|required|string|max:100',
        ]);

        DB::transaction(function () use ($professor, $professorRecord, $validated, $request) {
            // Atualiza dados do User
            $userData = $request->only('name', 'email');
            if ($request->filled('password')) {
                $userData['password'] = $validated['password'];
            }
            $professor->update($userData);

            // Atualiza dados do Professor
            if ($request->has('area_atuacao')) {
                $professorRecord->update(['area_atuacao' => $validated['area_atuacao']]);
            }
        });

        return new ProfessorResource($professor->fresh());
    }

    /**
     * @OA\Get(
     *     path="/api/professores/{id}",
     *     summary="Busca um professor pelo ID",
     *     tags={"Professores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do professor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operação bem-sucedida",
     *         @OA\JsonContent(ref="#/components/schemas/ProfessorResource")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Professor não encontrado"
     *     )
     * )
     */
    public function show(User $professor)
    {
        // Verifica se o usuário tem um registro de professor associado
        $professorRecord = Professor::where('id', $professor->id)->first();
        if (!$professorRecord) {
            return response()->json(['message' => 'Professor não encontrado'], 404);
        }
        return new ProfessorResource($professor);
    }

    /**
     * @OA\Delete(
     *     path="/api/professores/{id}",
     *     summary="Deleta um professor",
     *     tags={"Professores"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Professor deletado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Professor não encontrado"
     *     )
     * )
     */
    public function destroy(User $professor)
    {
        // Verifica se o usuário tem um registro de professor associado
        $professorRecord = Professor::where('id', $professor->id)->first();
        if (!$professorRecord) {
            return response()->json(['message' => 'Professor não encontrado'], 404);
        }

        DB::transaction(function () use ($professor, $professorRecord) {
            // Primeiro deleta o registro de Professor
            $professorRecord->delete();
            // Depois deleta o User
            $professor->delete();
        });

        return response()->noContent(); // HTTP 204: No Content
    }
}
