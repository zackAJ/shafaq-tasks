<?php

namespace Tests\Feature\Api\V1;

use App\Models\User;
use App\Services\BillingServices\BillingService;
use App\Services\BillingServices\FakeBillingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Mockery\MockInterface;
use Tests\TestCase;

class QuoteTest extends TestCase
{
    use RefreshDatabase;

    public function test_freemium_user_cant_get_quote()
    {
        $user = User::factory()->create();

        $this->instance(BillingService::class, Mockery::mock(FakeBillingService::class, function (MockInterface $mock) {
            $mock
                ->shouldReceive('isSubscribed')
                ->andReturn(false);
        }));

        $this
            ->actingAs($user)
            ->apiCall('get', 'quote')
            ->assertForbidden();
    }

    public function test_premium_user_cant_get_quote()
    {
        $user = User::factory()->create();

        $this->instance(BillingService::class, Mockery::mock(FakeBillingService::class, function (MockInterface $mock) {
            $mock
                ->shouldReceive('isSubscribed')
                ->andReturn(true);
        }));

        $this
            ->actingAs($user)
            ->apiCall('get', 'quote')
            ->assertOk()
            ->assertJsonStructure([
                'data' => ['quote'],
            ]);
    }
}
