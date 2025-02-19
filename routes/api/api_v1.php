<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])
    ->prefix('v1')

    ->group(function () {
        Route::get('/user', UserController::class);
        Route::apiResource('tasks', TaskController::class);
    });
