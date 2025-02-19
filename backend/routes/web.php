<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    Artisan::call('inspire');
    $quote = Artisan::output();

    return "<body style='background-color:black; color:white;'>$quote</body>";
});

require __DIR__.'/auth.php';
