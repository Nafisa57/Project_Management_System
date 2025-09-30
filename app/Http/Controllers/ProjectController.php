<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    // Dummy dataset (in a real app you'd use Project::with(...))
    protected function sampleProjects()
    {
        return [
            [
                'id' => 1,
                'name' => 'AI Research',
                'owner' => 'Nafisa',
                'status' => 'Active',
                'start_date' => '2025-09-01',
                'end_date' => '2025-12-01',
                'tasks_count' => 5,
            ],
            [
                'id' => 2,
                'name' => 'Website Redesign',
                'owner' => 'Anas',
                'status' => 'Planning',
                'start_date' => '2025-08-10',
                'end_date' => '2025-10-15',
                'tasks_count' => 8,
            ],
        ];
    }

    protected function sampleTasksForProject($projectId)
    {
        // simple tasks keyed by project id
        $all = [
            1 => [
                ['id'=>1,'title'=>'Design mockups','assigned'=>'Aisha','status'=>'in_progress','priority'=>'High','due_date'=>'2025-09-10'],
                ['id'=>2,'title'=>'Research dataset','assigned'=>'Nafisa','status'=>'todo','priority'=>'Medium','due_date'=>'2025-09-20'],
            ],
            2 => [
                ['id'=>3,'title'=>'Wireframe','assigned'=>'Anas','status'=>'todo','priority'=>'Medium','due_date'=>'2025-08-20'],
                ['id'=>4,'title'=>'Deploy staging','assigned'=>'Zara','status'=>'todo','priority'=>'Low','due_date'=>'2025-09-05'],
            ],
        ];

        return $all[$projectId] ?? [];
    }

    public function index()
    {
        $projects = $this->sampleProjects();
        return Inertia::render('Projects/Index', [
            'projects' => $projects,
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create'); // optional page (frontend-only for now)
    }

    public function store(Request $request)
    {
        // dummy response — in real app validate & save
        return redirect()->route('projects.index')->with('success', 'Project created (dummy)');
    }

    public function show($id)
    {
        $projects = $this->sampleProjects();
        $project = collect($projects)->firstWhere('id', (int)$id) ?? $projects[0];
        $tasks = $this->sampleTasksForProject($project['id']);

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'tasks' => $tasks,
        ]);
    }

    public function edit($id)
    {
        $projects = $this->sampleProjects();
        $project = collect($projects)->firstWhere('id', (int)$id) ?? $projects[0];
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }

    public function update(Request $request, $id)
    {
        // dummy update
        return redirect()->route('projects.show', $id)->with('success', 'Project updated (dummy)');
    }

    public function destroy($id)
    {
        // dummy delete
        return redirect()->route('projects.index')->with('success', 'Project deleted (dummy)');
    }
}
