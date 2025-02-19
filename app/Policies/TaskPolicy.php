<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

//FIX: not triggering for some reason
class TaskPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Task $task): bool
    {
        return $this->taskOwnedBy($task, $user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Task $task): bool
    {
        return $this->taskOwnedBy($task, $user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Task $task): bool
    {
        return $this->taskOwnedBy($task, $user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Task $task): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Task $task): bool
    {
        return $this->taskOwnedBy($task, $user);
    }

    private function taskOwnedBy(Task $task, User $user): bool
    {
        return $task->user()->is($user);
    }
}
