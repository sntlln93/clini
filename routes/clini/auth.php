<?php

use App\Http\Controllers\Auth\CheckAuthController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/check-auth', CheckAuthController::class)->name('auth.check');
    Route::delete('/logout', LogoutController::class)->name('auth.logout');
});

Route::post('/login', LoginController::class)->name('auth.login');
