<?php

use App\Http\Controllers\Clini\Appointments\GetAppointmentsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/appointments', GetAppointmentsController::class)->name('appointment.index');
});
