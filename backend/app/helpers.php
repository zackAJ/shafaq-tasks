<?php

use App\Services\BillingServices\BillingService;

if (! function_exists('billing')) {

    /**
     * get the billing instance
     */
    function billing(): BillingService
    {
        return app(BillingService::class);
    }
}
