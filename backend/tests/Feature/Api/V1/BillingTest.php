<?php

namespace Tests\Feature\Api\V1;

use App\Models\User;
use App\Services\BillingServices\BillingService;
use App\Services\BillingServices\FakeBillingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

class BillingTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_checkout()
    {

        $user = User::factory()->create();
        $url = config('app.url');

        $this->instance(BillingService::class, Mockery::mock(FakeBillingService::class, function (MockInterface $mock) {
            $mock
                ->shouldReceive('isSubscribed')
                ->andReturn(false);

            $mock
                ->shouldReceive('buildCheckoutLink')
                ->andReturn('a link');
        }));

        $this
            ->actingAs($user)
            ->apiCall('post', 'subscription-checkout', ['success_url' => $url, 'cancel_url' => $url])

            ->assertCreated()
            ->assertJsonStructure(['data' => [
                'checkoutLink',
            ]]);
    }

    public function test_checkout_is_validated()
    {
        $user = User::factory()->create();

        $this->instance(BillingService::class, Mockery::mock(FakeBillingService::class, function (MockInterface $mock) {
            $mock
                ->shouldReceive('isSubscribed')
                ->andReturn(false);

            $mock
                ->shouldReceive('buildCheckoutLink')
                ->andReturn('a link');
        }));

        $this
            ->actingAs($user)
            ->apiCall('post', 'subscription-checkout')

            ->assertUnprocessable()
            ->assertJsonValidationErrors(['success_url', 'cancel_url']);

        $this
            ->apiCall('post', 'subscription-checkout', ['success_url' => 'not a link', 'cancel_url' => 'not a link'])

            ->assertUnprocessable()
            ->assertJsonValidationErrors(['success_url', 'cancel_url']);
    }

    public function test_subscribed_user_cant_checkout()
    {
        $user = User::factory()->create();
        $url = config('app.url');

        $this->instance(BillingService::class, Mockery::mock(FakeBillingService::class, function (MockInterface $mock) {
            $mock
                ->shouldReceive('isSubscribed')
                ->andReturn(true);

            $mock
                ->shouldReceive('buildCheckoutLink')
                ->andReturn('a link');
        }));

        $this
            ->actingAs($user)
            ->apiCall('post', 'subscription-checkout', ['success_url' => $url, 'cancel_url' => $url])

            ->assertForbidden();
    }
}
