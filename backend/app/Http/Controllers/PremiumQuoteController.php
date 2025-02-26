<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Artisan;

class PremiumQuoteController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        Artisan::call('inspire');

        return response()->json(['data' => ['quote' => Artisan::output()]]);
    }
}
