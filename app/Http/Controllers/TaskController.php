<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrUpdateTaskRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Notifications\TaskCreatedNotification;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $tasks = auth()->user()->tasks()->paginate(10);

        return TaskResource::collection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrUpdateTaskRequest $request): TaskResource
    {
        $task = $request
            ->user()
            ->tasks()
            ->create($request->validated());

        $task->user->notify(new TaskCreatedNotification($task));

        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): TaskResource
    {
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreOrUpdateTaskRequest $request, Task $task): TaskResource
    {
        $task->update($request->validated());

        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}
