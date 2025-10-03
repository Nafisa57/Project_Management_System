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
Route::resource('tickets', TicketController::class);
Route::get('/activity_log', [ActivityLogController::class, 'index'])->name('activity_log');


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
