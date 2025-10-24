<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        $user = $request->user();

        $token = $user->createToken('login')->plainTextToken;

        return response(json_encode(['token' => $token]), 200)
        ->header('Content-Type', 'application/json');
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->noContent();
    }

    public function user(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    public function roles(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'roles' => $user->getRoleNames(),
        ]);
    }

    public function permissions(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'permissions' => $user->getAllPermissions()->pluck('name'),
        ]);
    }
}
