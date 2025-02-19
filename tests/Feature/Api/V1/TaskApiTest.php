<?php

namespace Tests\Feature\V1\Api;

use App\Enums\TaskStatus;
use App\Models\Task;
use App\Models\User;
use App\Notifications\TaskCreatedNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Notification;
use Tests\TestCase;

class TaskApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_task()
    {
        Notification::fake();
        $user = User::factory()->create();

        $data = [
            'title' => 'foo',
            'description' => 'foo',
            'status' => TaskStatus::PENDING->value,
            'due_date' => now()->addMonth(),
        ];

        $this->actingAs($user)
            ->apiCall('POST', '/tasks', $data)

            ->assertCreated()
            ->assertJsonStructure(array_keys($data), $data);

        $this->assertDatabaseCount('tasks', 1);
        Notification::assertSentTo($user, TaskCreatedNotification::class);
    }

    public function test_user_can_see_task()
    {
        $task = Task::factory()->create();
        $user = $task->user;
        $this->actingAs($user)
            ->apiCall('GET', "tasks/$task->id")

            ->assertOk();
    }

    public function test_user_can_see_tasks()
    {
        $tasks = Task::factory(10)->create();
        $user = $tasks->first()->user;

        $this->actingAs($user)
            ->apiCall('GET', 'tasks')

            ->assertOk()
            ->assertJsonCount($user->tasks()->count(), 'data');
    }

    public function test_user_can_update_task()
    {
        $task = Task::factory()->create([
            'status' => TaskStatus::PENDING->value,
            'due_date' => now()->addMonth(),
        ]);
        $user = $task->user;

        $newDate = now()->addMonth(2);

        $data = [
            'title' => 'updated',
            'description' => 'updated',
            'status' => TaskStatus::COMPLETED->value,
            'due_date' => $newDate,
        ];

        $this->actingAs($user)
            ->apiCall('PATCH', "/tasks/$task->id", $data)

            ->assertJsonStructure(array_keys($data), $data);
    }

    public function test_user_can_delete_task()
    {
        $task = Task::factory()->create();
        $user = $task->user;

        $this->actingAs($user)
            ->apiCall('DELETE', "tasks/$task->id")

            ->assertNoContent();
        $this->assertDatabaseEmpty('tasks');
    }

    public function test_guest_cant_manage_tasks()
    {
        $this
            ->apiCall('POST', 'tasks')
            ->assertUnauthorized();

        $this
            ->apiCall('GET', 'tasks')
            ->assertUnauthorized();

        $this
            ->apiCall('GET', 'tasks/1')
            ->assertUnauthorized();

        $this
            ->apiCall('DELETE', 'tasks/1')
            ->assertUnauthorized();

        $this
            ->apiCall('PATCH', 'tasks/1')
            ->assertUnauthorized();
    }

    // FIX: Policy not triggering
    // public function test_user_cant_see_others_tasks()
    // {
    //     $users = User::factory(2)->create();
    //
    //     Task::factory()->create(['user_id' => $users[1]]);
    //
    //     $this->actingAs($users[0])
    //         ->apiCall('GET', 'tasks')
    //         ->assertJsonCount(0, 'data');
    //
    //     $this
    //         ->apiCall('DELETE', 'tasks/1')
    //         ->assertUnauthorized();
    //
    //     $this
    //         ->apiCall('GET', 'tasks/1')
    //         ->assertUnauthorized();
    //
    //     $this
    //         ->apiCall('PATCH', 'tasks/1')
    //         ->assertUnauthorized();
    // }
}
