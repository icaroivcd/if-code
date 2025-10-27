<?php

namespace App\Models;

/**
 * @OA\Schema(
 *     schema="AlunoResource",
 *     type="object",
 *     title="Aluno Resource",
 *     description="Recurso de resposta de aluno",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="name", type="string", example="Ana Carolina"),
 *     @OA\Property(property="email", type="string", format="email", example="ana.carolina@email.com"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2024-01-15 10:30:00"),
 *     @OA\Property(property="matricula", type="string", nullable=true, example="2023001"),
 *     @OA\Property(
 *         property="curso",
 *         type="object",
 *         nullable=true,
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="nome", type="string", example="Ciência da Computação")
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="StoreAlunoRequest",
 *     type="object",
 *     title="Store Aluno Request",
 *     required={"name", "email", "password", "password_confirmation", "curso_id"},
 *     @OA\Property(property="name", type="string", maxLength=255, example="Ana Carolina"),
 *     @OA\Property(property="email", type="string", format="email", maxLength=255, example="ana.carolina@email.com"),
 *     @OA\Property(property="password", type="string", format="password", minLength=8, example="password123"),
 *     @OA\Property(property="password_confirmation", type="string", format="password", example="password123"),
 *     @OA\Property(property="curso_id", type="integer", example=1),
 *     @OA\Property(property="matricula", type="string", nullable=true, maxLength=255, example="2023001")
 * )
 *
 * @OA\Schema(
 *     schema="UpdateAlunoRequest",
 *     type="object",
 *     title="Update Aluno Request",
 *     @OA\Property(property="name", type="string", maxLength=255, example="Ana Carolina Silva"),
 *     @OA\Property(property="email", type="string", format="email", maxLength=255, example="ana.silva@email.com"),
 *     @OA\Property(property="password", type="string", format="password", minLength=8, example="newpassword123"),
 *     @OA\Property(property="password_confirmation", type="string", format="password", example="newpassword123"),
 *     @OA\Property(property="curso_id", type="integer", example=2),
 *     @OA\Property(property="matricula", type="string", nullable=true, maxLength=255, example="2023001")
 * )
 */
class Schemas
{
}