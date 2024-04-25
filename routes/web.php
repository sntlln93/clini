<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('app');
});

Route::middleware('auth')->group(function () {
});

require __DIR__.'/auth.php';
