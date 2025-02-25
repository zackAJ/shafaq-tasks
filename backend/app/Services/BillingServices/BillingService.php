<?php

namespace App\Services\BillingServices;

use App\Models\User;

interface BillingService
{
    public function buildCheckoutLink(User $user, string $successUrl, string $cancelUrl): string;

    public function isSubscribed(User $user): bool;

    // other methods like unsubscribe, refund ...
}
