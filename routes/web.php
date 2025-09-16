<?php

use App\Http\Controllers\CalendarController;
use App\Http\Controllers\EtiquetteController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('calendar',CalendarController::class)->names('calendar');
    Route::resource('etiquettes',EtiquetteController::class)->names('etiquettes');

    // Additional etiquette routes
    Route::patch('etiquettes/{etiquette}/toggle-active', [EtiquetteController::class, 'toggleActive'])->name('etiquettes.toggle-active');
    Route::patch('etiquettes/update-order', [EtiquetteController::class, 'updateOrder'])->name('etiquettes.update-order');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
