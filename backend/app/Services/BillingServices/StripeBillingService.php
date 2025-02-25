<?php

namespace App\Services\BillingServices;

use App\Models\User;

class StripeBillingService implements BillingService
{
    public function buildCheckoutLink(User $user, string $successUrl, string $cancelUrl): string
    {
        return $user
            ->newSubscription('default', config('billing.price_id'))
            ->checkout([
                'success_url' => $successUrl,
                'cancel_url' => $cancelUrl,
            ])
            ->url;
    }

    public function isSubscribed(User $user): bool
    {
        return $user->subscribed();
    }
}
