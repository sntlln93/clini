<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request): \Illuminate\Http\Response
    {
        [$username, $password] = Arr::flatten($request->validated());

        $user = User::where('username', $username)->first();

        if (! $user || ! Hash::check($password, $user->password)) {
            return response([
                'message' => 'Invalid credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $user_resource = (new UserResource($user))->resolve();

        return response([
            'token' => $token,
            ...$user_resource,

        ], Response::HTTP_OK);
    }
}
