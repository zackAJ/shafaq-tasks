<?php

use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\PremiumQuoteController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::middleware(['auth'])->group(function () {
        Route::get('/me', UserController::class);
        Route::apiResource('tasks', TaskController::class);

        Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
            ->middleware(['signed', 'throttle:6,1'])
            ->name('verification.verify');

        Route::post('/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
            ->middleware(['throttle:6,1'])
            ->name('verification.send');

        // NOTE: would in web.php with a redirect response
        Route::post('/subscription-checkout', CheckoutController::class)->middleware('subscription:0');

        Route::get('/quote', PremiumQuoteController::class)->middleware('subscription:1');
    });
});
