<?php

namespace Tests\Unit;

use App\Http\Middleware\RequiresSubscriptionMiddleware;
use App\Models\User;
use App\Services\BillingServices\BillingService;
use App\Services\BillingServices\FakeBillingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Mockery;
use Mockery\MockInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Tests\TestCase;

class MiddlewareTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Setup a request , a next closure and a middleware instance
     */
    private function arrange(string $middlewareClass): array
    {

        $next = function (): Response {
            return response('success');
        };

        $middleware = new $middlewareClass;

        $user = User::factory()->create();

        return [$user, $next, $middleware];
    }

    public function test_requires_subscription_middleware(): void
    {
        [$user , $next, $middleware] = $this->arrange(RequiresSubscriptionMiddleware::class);

        $cases = [
            [
                'requiresSub' => true,
                'isSubscribed' => true,
                'expect' => 200,
            ],

            [
                'requiresSub' => false,
                'isSubscribed' => false,
                'expect' => 200,
            ],

            [
                'requiresSub' => false,
                'isSubscribed' => true,
                'expect' => 403, //todo
            ],

            [
                'requiresSub' => true,
                'isSubscribed' => false,
                'expect' => 403,
            ],

        ];

        $this->actingAs($user);

        foreach ($cases as $case) {
            $this->instance(BillingService::class, Mockery::mock(FakeBillingService::class, function (MockInterface $mock) use ($case) {
                $mock->shouldReceive('isSubscribed')
                    ->andReturn($case['isSubscribed']);
            }));

            $request = Request::create(route('login'));

            $request->setUserResolver(fn () => $user);

            try {
                $response = $middleware->handle($request, $next, $case['requiresSub']);
                $this->assertEquals($case['expect'], $response->getStatusCode());
            } catch (HttpExceptionInterface $e) {
                $this->assertEquals($case['expect'], $e->getStatusCode());
            }
        }

    }
}
