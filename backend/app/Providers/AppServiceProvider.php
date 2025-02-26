<?php

namespace App\Providers;

use App\Models\Subscription;
use App\Models\SubscriptionItem;
use App\Services\BillingServices\BillingService;
use App\Services\BillingServices\StripeBillingService;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->configureBindings();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureLaravelFramework();
        $this->configureCachier();
    }

    private function configureCachier(): void
    {

        Cashier::useSubscriptionModel(Subscription::class);
        Cashier::useSubscriptionItemModel(SubscriptionItem::class);
    }

    private function configureLaravelFramework(): void
    {
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url')."/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
        Model::unguard();
        DB::prohibitDestructiveCommands($this->app->isProduction());
        Date::use(CarbonImmutable::class);
    }

    private function configureBindings()
    {
        $this->app->bind(BillingService::class, StripeBillingService::class);
    }
}
