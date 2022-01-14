<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Support\Facades\Route;

Route::get('/register', [RegisteredUserController::class, 'create'])
                ->middleware(['guest', 'admin'])
                ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware(['guest', 'admin']);

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
                ->middleware('guest')
                ->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/user', [Controller::class, 'index'])->name('user.index');               // Index
    Route::get('/user/{id}/edit', [Controller::class, 'edit'])->name('user.edit');       // Edit
    Route::put('/user/{id}', [Controller::class, 'update'])->name('user.update');        // Update
    Route::delete('/user/{id}', [Controller::class, 'delete'])->name('user.delelte');    // Delete
});

Route::get('/', [Report::class, 'index'])->middleware('auth')->name('index');
Route::get('/create', [Report::class, 'create'])->middleware('auth')->name('create');
Route::post('/store', [Report::class, 'store'])->middleware('auth')->name('store');
