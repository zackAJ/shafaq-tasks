<?php

namespace Tests\Dev;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Tests\TestCase;

class SeedersTest extends TestCase
{
    use RefreshDatabase;

    public function test_tasks_seeders()
    {
        Artisan::call('db:seed TaskSeeder');
        $this->assertDatabaseCount('tasks', 20);
    }
}
