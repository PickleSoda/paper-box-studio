<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\PageController;

use Inertia\Inertia;

Route::get('/', function () {
    $defaultLocale = config('app.locale'); // e.g., 'en'
    return redirect()->to('/' . $defaultLocale);
});

Route::group(['prefix' => '{locale}', 'middleware' => 'locale'], function () {

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


            Route::get('/pages', [PageController::class, 'index'])->name('pages.index');
            Route::post('/pages', [PageController::class, 'store'])->name('pages.store');
            Route::get('/pages/create/{pageId?}', [PageController::class, 'create'])->name('pages.create');
            Route::get('/pages/edit/{pageId?}', [PageController::class, 'edit'])->name('pages.edit');
            Route::patch('/pages/{page}', [PageController::class, 'update'])->name('pages.update');
            Route::delete('/pages/{pageId}', [PageController::class, 'destroy'])->name('pages.destroy');

        });
    });
});

Route::fallback(function () {
    $defaultLocale = config('app.locale');
    $currentPath = request()->path();

    // Prevent redirect loop if already on the default locale
    if (!str_starts_with($currentPath, $defaultLocale)) {
        return redirect()->to('/' . $defaultLocale . '/' . $currentPath);
    }

    // Optionally, render a 404 page or similar
    abort(404);
});


require __DIR__ . '/auth.php';