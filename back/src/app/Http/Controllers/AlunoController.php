<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\AlunoResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class AlunoController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/alunos",
     *     summary="Lista todos os alunos",
     *     tags={"Alunos"},
     *     @OA\Response(
     *         response=200,
     *         description="Operação bem-sucedida",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/AlunoResource"))
     *     )
     * )
     */
    public function index()
    {
        $alunos = User::whereHas('aluno')->latest()->paginate(15);
        return AlunoResource::collection($alunos);
    }

    /**
     * @OA\Post(
     *     path="/api/alunos",
     *     summary="Cria um novo aluno",
     *     tags={"Alunos"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/StoreAlunoRequest")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Aluno criado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/AlunoResource")
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
            'curso_id' => 'required|exists:cursos,id',
        ]);

        $user = DB::transaction(function () use ($validated) {
            $user = User::create($validated);
            $user->aluno()->create(['curso_id' => $validated['curso_id']]);
            return $user;
        });

        return (new AlunoResource($user))
            ->response()
            ->setStatusCode(201); // HTTP 201: Created
    }

    /**
     * @OA\Get(
     *     path="/api/alunos/{id}",
     *     summary="Busca um aluno pelo ID",
     *     tags={"Alunos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID do aluno",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Operação bem-sucedida",
     *         @OA\JsonContent(ref="#/components/schemas/AlunoResource")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Aluno não encontrado"
     *     )
     * )
     */
    public function show(User $aluno)
    {
        if (!$aluno->aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }
        return new AlunoResource($aluno);
    }

    /**
     * @OA\Put(
     *     path="/api/alunos/{id}",
     *     summary="Atualiza um aluno existente",
     *     tags={"Alunos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/UpdateAlunoRequest")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Aluno atualizado com sucesso",
     *         @OA\JsonContent(ref="#/components/schemas/AlunoResource")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Aluno não encontrado"
     *     )
     * )
     */
    public function update(Request $request, User $aluno)
    {
        if (!$aluno->aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => ['sometimes', 'required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($aluno->id)],
            'password' => 'nullable|string|min:8|confirmed',
            'curso_id' => 'sometimes|required|exists:cursos,id',
        ]);

        DB::transaction(function () use ($aluno, $validated, $request) {
            $aluno->update($request->only('name', 'email', 'password'));
            if ($request->has('curso_id')) {
                $aluno->aluno->update(['curso_id' => $validated['curso_id']]);
            }
        });

        return new AlunoResource($aluno->fresh());
    }

    /**
     * @OA\Delete(
     *     path="/api/alunos/{id}",
     *     summary="Deleta um aluno",
     *     tags={"Alunos"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Aluno deletado com sucesso"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Aluno não encontrado"
     *     )
     * )
     */
    public function destroy(User $aluno)
    {
        if (!$aluno->aluno) {
            return response()->json(['message' => 'Aluno não encontrado'], 404);
        }

        $aluno->delete();

        return response()->noContent(); // HTTP 204: No Content
    }
}
