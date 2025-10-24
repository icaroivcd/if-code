<?php

use App\Http\Controllers\AtividadeController;
use App\Http\Controllers\CorrecaoController;
use App\Http\Controllers\ProblemaController;
use App\Http\Controllers\SubmissaoController;
use App\Http\Controllers\ProfessorController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

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

Route::apiResource('atividades', AtividadeController::class);
Route::apiResource('problemas', ProblemaController::class);
Route::apiResource('professores', ProfessorController::class);
Route::apiResource('submissoes', SubmissaoController::class)
->except('update', 'destroy')
->parameters(['submissoes' => 'submissao']);

Route::get('/correcao/busca-por-submissao/{submissao}', [CorrecaoController::class, 'buscaPorSubmissao']);

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/user/roles', [AuthController::class, 'roles']);
    Route::get('/user/permissions', [AuthController::class, 'permissions']);
});
