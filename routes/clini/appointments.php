<?php

use App\Http\Controllers\Clini\Appointments\GetAppointmentsController;
use App\Http\Controllers\Clini\Appointments\GetClosestAppointmentController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/appointments/closest', GetClosestAppointmentController::class)->name('closest');
    Route::get('/appointments', GetAppointmentsController::class)->name('index');
})->as('appointment.');
