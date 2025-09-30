<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    // For demonstration we accept project id in requests when nested
    public function index($projectId)
    {
        // in real app: Task::where('project_id', $projectId)->get()
        $tasks = (new ProjectController())->sampleTasksForProject((int)$projectId);
        return Inertia::render('Tasks/Index', [
            'projectId' => $projectId,
            'tasks' => $tasks,
        ]);
    }

    public function create($projectId)
    {
        return Inertia::render('Tasks/Create', ['projectId' => $projectId]);
    }

    public function store(Request $request, $projectId)
    {
        // dummy: pretend saved
        return redirect()->route('projects.show', $projectId)->with('success', 'Task created (dummy)');
    }

    // app/Http/Controllers/TaskController.php
public function show($id)
{
    // dummy task
    $task = ['id'=> $id, 'title'=>'Task '.$id, 'status'=>'todo', 'assigned'=>'N/A', 'project_id'=>1];

    // dummy subtasks (in real app: Subtask::where('task_id',$id)->get())
    $subtasks = [
        ['id'=> 101, 'title'=>'Wireframes', 'status'=>'todo', 'assigned'=>'Nafisa', 'due_date'=>'2025-09-05'],
        ['id'=> 102, 'title'=>'Prototype', 'status'=>'in_progress', 'assigned'=>'Anas', 'due_date'=>'2025-09-12'],
    ];

    return Inertia::render('Tasks/Show', [
        'task' => $task,
        'subtasks' => $subtasks,
        'projectId' => 1,
    ]);
}


    public function edit($projectId, $id)
    {
        $task = ['id'=> $id, 'title'=>'Task '.$id, 'status'=>'todo', 'assigned'=>'N/A'];
        return Inertia::render('Tasks/Edit', ['task' => $task, 'projectId' => $projectId]);
    }

    public function update(Request $request, $projectId, $id)
    {
        return redirect()->route('projects.show', $projectId)->with('success', 'Task updated (dummy)');
    }

    public function destroy($projectId, $id)
    {
        return redirect()->route('projects.show', $projectId)->with('success', 'Task deleted (dummy)');
    }
}
