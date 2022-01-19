<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;

Route::get('/register', [RegisteredUserController::class, 'create'])
                ->middleware(['guest'])
                ->name('register');

Route::post('/register', [RegisteredUserController::class, 'store'])
                ->middleware(['guest']);

Route::get('/login', [AuthenticatedSessionController::class, 'create'])
                ->middleware('guest')
                ->name('login');

Route::post('/login', [AuthenticatedSessionController::class, 'store'])
                ->middleware('guest');

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->middleware('auth')
                ->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/user/{id}/edit', [Controller::class, 'edit'])->name('user.edit');       // Edit
    Route::put('/user/{id}', [Controller::class, 'update'])->name('user.update');        // Update
});

Route::get('/', [ReportController::class, 'index'])->middleware('auth')->name('index');
Route::get('/create', [ReportController::class, 'create'])->middleware('auth')->name('create');
Route::post('/store', [ReportController::class, 'store'])->middleware('auth')->name('store');
Route::get('/edit/{id}', [ReportController::class, 'edit'])->middleware('auth')->name('edit');
Route::put('/update/{id}', [ReportController::class, 'update'])->middleware('auth')->name('update');

Route::get('/result', [ReportController::class, 'result'])->name('result');

