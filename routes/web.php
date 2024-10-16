<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard/index');
    })->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::middleware(['role:admin|moderator'])->group(function () {
        Route::get('/booking', [BookingController::class, 'index'])->name('booking');
        Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
        Route::patch('/booking/{booking}', [BookingController::class, 'update'])->name('booking.update');
        Route::delete('/booking/{booking}', [BookingController::class, 'destroy'])->name('booking.destroy');
    });
});

require __DIR__ . '/auth.php';