<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    public function index()
    {
        $tickets = [
            ['id' => 1, 'task_id' => 1, 'title' => 'Scrape dataset', 'status' => 'Open'],
            ['id' => 2, 'task_id' => 1, 'title' => 'Clean dataset', 'status' => 'In Progress'],
        ];

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets
        ]);
    }

   public function show($id)
{
    $ticket = [
        'id' => $id,
        'task_id' => 1,
        'title' => 'Scrape dataset',
        'description' => 'Collect dataset from Kaggle competitions',
        'assignee_id' => 2,
        'status' => 'Open',
        'priority' => 'High',
    ];

    $users = [
        ['id' => 1, 'name' => 'Alice'],
        ['id' => 2, 'name' => 'Bob'],
        ['id' => 3, 'name' => 'Charlie'],
    ];

    $statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
    $priorities = ['Low', 'Medium', 'High', 'Critical'];

    return Inertia::render('Tickets/Show', [
        'ticket' => $ticket,
        'users' => $users,
        'statuses' => $statuses,
        'priorities' => $priorities,
    ]);
}

    public function create()
    {
        return Inertia::render('Tickets/Create');
    }

    public function store(Request $request)
    {
        return redirect()->route('tickets.index')->with('success', 'Ticket created!');
    }

    public function edit($id)
    {
        return Inertia::render('Tickets/Edit', [
            'ticket' => ['id' => $id, 'title' => 'Scrape dataset', 'status' => 'Open']
        ]);
    }

    public function update(Request $request, $id)
    {
        return redirect()->route('tickets.index')->with('success', 'Ticket updated!');
    }

    public function destroy($id)
    {
        return redirect()->route('tickets.index')->with('success', 'Ticket deleted!');
    }
}
