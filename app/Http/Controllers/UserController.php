<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all(); // or paginate() if many users
        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */

    public function show(User $user)
    {
        return Inertia::render('Users/Show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
   public function edit(User $user)
{
    // Pass the user object to the Edit.tsx component
    return Inertia::render('Users/Edit', [
        'user' => $user->only('id', 'name', 'email', 'role'), 
    ]);
}

    /**
     * Update the specified resource in storage.
     */
//     public function update(Request $request, string $id)
//     {
//         //
//     }
// // In UserController.php
public function update(Request $request, User $user)
{
    // 1. Validate the incoming data (name, email, role)
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'role' => 'required|string',
    ]);
    
    // 2. Update the user in the database
    $user->update($validated);
    
    // 3. Redirect to the index page to show all changes 👈 THIS IS CRUCIAL
    return redirect()->route('users.index'); 
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
