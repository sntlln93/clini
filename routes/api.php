<?php

use App\Http\Controllers\Auth\CheckAuthController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::get('/check-auth', CheckAuthController::class)->middleware('auth:sanctum');
Route::post('/login', LoginController::class)->name('auth.login');
