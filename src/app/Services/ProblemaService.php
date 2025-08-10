<?php

namespace App\Services;

use App\Models\CasoTeste;
use App\Models\Problema;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProblemaService {

    private $_problema;
    private $_casos_teste = [];

    public function __construct(Request $request)
    {
        $this->_problema = new Problema($request->all());

        if(isset($request['casos_teste'])){
            $this->criaCasosTeste($request['casos_teste']);
        }
    }

    public function criaCasosTeste(array $casos_teste)
    {
        foreach($casos_teste as $caso_teste){
            $caso = new CasoTeste($caso_teste);
            $this->_casos_teste[] = $caso;
        }
    }

    public function salvar(){
        DB::beginTransaction();

        try{
            if(!$this->_problema->save()){
                DB::rollBack();
                return false;
            }

            foreach($this->_casos_teste as $caso_teste){
                $caso_teste->problema_id = $this->_problema->id;

                if(!$caso_teste->save()){
                    DB::rollBack();
                    return false;
                }
            }

        } catch(Exception $e){
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }

    public function getProblema(){
        return $this->_problema;
    }
}
