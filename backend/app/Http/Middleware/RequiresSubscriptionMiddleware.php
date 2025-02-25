<?php

namespace App\Http\Middleware;

use App\Services\BillingServices\BillingService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequiresSubscriptionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, bool $mustBeSubscribed = true): Response
    {
        /** @var \App\Models\User */
        $user = $request->user();

        /** @var \App\Services\BillingServices\BillingService */
        $billingService = app(BillingService::class);

        abort_if(! $user, 401, 'no user is provided');

        abort_if((! $mustBeSubscribed) && $billingService->isSubscribed($user), code: 403, message: 'user already subscribed, access denied');

        abort_if($mustBeSubscribed && (! $billingService->isSubscribed($user)), code: 403, message: 'subscription required');

        return $next($request);
    }
}
