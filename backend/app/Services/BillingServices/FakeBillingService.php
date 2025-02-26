<?php

namespace App\Services\BillingServices;

use App\Models\User;

class FakeBillingService implements BillingService
{
    public function buildCheckoutLink(User $user, string $successUrl, string $cancelUrl): string
    {
        return $successUrl;
    }

    public function isSubscribed(User $user): bool
    {
        throw new \Exception('this should be mocked only');
    }
}
