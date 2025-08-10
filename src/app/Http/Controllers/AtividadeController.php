<?php

namespace App\Http\Controllers;

use App\Models\Atividade;
use Exception;
use Illuminate\Http\Request;

class AtividadeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $atividades = Atividade::all();

        return response()->json($atividades);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $atividade = Atividade::create($request->all());

        return response()->json($atividade);
    }

    /**
     * Display the specified resource.
     */
    public function show(Atividade $atividade)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Atividade $atividade)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Atividade $atividade)
    {
        //
    }
}
