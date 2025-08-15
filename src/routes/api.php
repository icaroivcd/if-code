<?php

use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\CorrecaoController;
use App\Http\Controllers\ProblemaController;
use App\Http\Controllers\SubmissaoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::apiResource('atividade', AtividadeController::class);
Route::apiResource('problema', ProblemaController::class);
Route::apiResource('submissao', SubmissaoController::class)
->except('update', 'destroy');
Route::get('/correcao/busca-por-submissao/{submissao}', [CorrecaoController::class, 'buscaPorSubmissao']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
