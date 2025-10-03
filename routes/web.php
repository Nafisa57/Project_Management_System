<?php
 
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\ActivityLogController;
 
 
 
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
 
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
 
Route::resource("users", UserController::class);
Route::resource("roles", RoleController::class);
Route::resource("projects", ProjectController::class);
 // nested tasks (shallow so /tasks/{task} exists for non-nested routes)
Route::resource('projects.tasks', TaskController::class)->shallow();
Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
// Route to show the edit form
Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
// Route to handle the update submission
Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
 
Route::resource('tickets', TicketController::class);
Route::get('/activity_log', [ActivityLogController::class, 'index'])->name('activity_log');
<<<<<<< HEAD
 
 
=======


>>>>>>> d38b3333b6b1b7c7eb358c6be4e86da0b262cb0a
});
 
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';