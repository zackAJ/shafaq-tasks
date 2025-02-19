<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create();

        $response = $this->post('api/login', [
            'email' => $user->email,
            'password' => 'password',
        ]);

        $response->assertJsonStructure(['token']);
    }

    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create();

        $this->post('api/login', [
            'email' => $user->email,
            'password' => 'wrong-password',
        ])
            ->assertInvalid();

    }

    public function test_users_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('api/logout');

        $response->assertNoContent();
    }
}
