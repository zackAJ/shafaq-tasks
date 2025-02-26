<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckoutRequest;
use App\Services\BillingServices\BillingService;

class CheckoutController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(CheckoutRequest $request, BillingService $billingService)
    {
        /** @var \App\Models\User */
        $user = $request->user();
        $url = $billingService->buildCheckoutLink($user, $request->string('success_url'), $request->string('cancel_url'));

        // NOTE: would be a redirect in a real app (all server side)
        return response()->json(['data' => [
            'checkoutLink' => $url,
        ]], 201);
    }
}
