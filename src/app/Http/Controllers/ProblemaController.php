<?php

namespace App\Http\Controllers;

use App\Models\Problema;
use App\Services\ProblemaService;
use Exception;
use Illuminate\Http\Request;

class ProblemaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $problemas = Problema::with('casosTeste')->get();


        return response()->json([$problemas]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $problemaService = new ProblemaService($request);

        if(!$problemaService->salvar()){
            return response()->json('Erro ao salvar!', 400);
        }

        return response()->json($problemaService->getProblema());
    }

    /**
     * Display the specified resource.
     */
    public function show(Problema $problema)
    {
        return response()->json($problema);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Problema $problema)
    {

    }
    public function teste(){

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Problema $problema)
    {
         try{
            $problema->delete();
        } catch(Exception $e){
            return response()->json(['Erro ao apagar.'], 400);
        }

        return response()->json(['Apagado com sucesso!']);
    }
}
