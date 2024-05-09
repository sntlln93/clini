<?php

use App\Http\Controllers\Clini\Patients\GetPatientsController;
use App\Http\Controllers\Clini\Patients\StorePatientController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/patients', GetPatientsController::class)->name('index');
    Route::post('/patients', StorePatientController::class)->name('index');
})->as('patient.');
