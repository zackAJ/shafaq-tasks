<?php

namespace Database\Factories;

use App\Enums\TaskStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Lottery;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'user_id' => Lottery::odds(1, 2)
                ->winner(
                    fn () => rescue(
                        fn () => User::inRandomOrder()->firstOrFail()->id,
                        fn () => User::factory()->create()
                    )
                )

                ->loser(fn () => User::factory()),

            'status' => Arr::random(TaskStatus::cases()),
            'due_date' => fake()->dateTimeBetween(now(), now()->addMonths(3)),
        ];
    }
}
