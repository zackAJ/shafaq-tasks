<?php

use App\Http\Middleware\RequiresSubscriptionMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware

            ->alias([
                'verified' => \App\Http\Middleware\EnsureEmailIsVerified::class,
                'subscription' => RequiresSubscriptionMiddleware::class,
            ])

            // NOTE: for demo only, because I don't have ability to set cookies under vercel domain
            ->validateCsrfTokens(except: ['*', 'stripe/*']);
    })

    ->withExceptions(function (Exceptions $exceptions) {
        //
    })
    ->create();
