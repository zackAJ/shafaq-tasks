<?php

namespace Tests\Unit;

use App\Models\User;
use App\Services\BillingServices\BillingService;
use App\Services\BillingServices\FakeBillingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BillingTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_checkout()
    {

        $user = User::factory()->create();
        $url = config('app.url');
        $this->app->bind(BillingService::class, FakeBillingService::class);

        $this->actingAs($user);
        $this
            ->apiCall('post', 'subscription-checkout', ['success_url' => $url, 'cancel_url' => $url])

            ->assertCreated()
            ->assertJsonStructure(['data' => [
                'checkoutLink',
            ]]);
    }

    public function test_checkout_is_validated()
    {
        $user = User::factory()->create();

        $this->app->bind(BillingService::class, FakeBillingService::class);

        $this->actingAs($user);
        $this
            ->apiCall('post', 'subscription-checkout')
            ->assertJsonValidationErrors(['success_url', 'cancel_url']);

        $this
            ->apiCall('post', 'subscription-checkout', ['success_url' => 'not a link', 'cancel_url' => 'not a link'])
            ->assertJsonValidationErrors(['success_url', 'cancel_url']);
    }
}
