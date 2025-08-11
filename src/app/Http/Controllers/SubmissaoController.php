<?php

namespace App\Http\Controllers;

use App\Models\Submissao;
use App\Services\SubmissaoService;
use Exception;
use Illuminate\Http\Request;
use Throwable;

class SubmissaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $submissoes = Submissao::all();

        return response()->json($submissoes);
    }

    /**
     * Store a newly created resource in storage.
     * @throws Throwable
     */
    public function store(Request $request)
    {
        $submissaoService = new SubmissaoService($request);

        if (!$submissaoService->salvar()) {
            return response()->json(['message' => 'Erro ao salvar submissao'], 500);
        }

        return response()->json([
            'message' => 'Submissão criada com sucesso!',
            'submissao' => $submissaoService->getSubmissao()->only(['id'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Submissao $submissao)
    {
        try {
            $status = $submissao->getStatus();
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }

        return response()->json($status);
    }

//    /**
//     * Update the specified resource in storage.
//     */
//    public function update(Request $request, Problema $submissao)
//    {
//
//    }
//    /**
//     * Remove the specified resource from storage.
//     */
//    public function destroy(Submissao $submissao)
//    {
//        try{
//            $submissao->delete();
//        } catch(Exception $e){
//            return response()->json(['Erro ao apagar.'], 400);
//        }
//
//        return response()->json(['Apagado com sucesso!']);
//    }
}
