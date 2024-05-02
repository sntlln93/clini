<?php

use App\Http\Controllers\Clini\Patients\GetPatientsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/patients', GetPatientsController::class)->name('index');
})->as('patient.');
