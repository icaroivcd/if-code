<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        $token = $request->user()->createToken('login')->plainTextToken;

        return response(json_encode(['token' => $token]), 200)
        ->header('Content-Type', 'application/json');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        $accessToken = $request->user()?->currentAccessToken();
        if ($accessToken && get_class($accessToken) === 'Laravel\Sanctum\PersonalAccessToken') {
            $accessToken->delete();
        }

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
