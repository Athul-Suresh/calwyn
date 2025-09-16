<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use App\Models\Etiquette;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CalendarController extends Controller
{
    public function index(): Response
    {
        $events = CalendarEvent::all();
        $etiquettes = Etiquette::orderBy('sort_order')->get();
        return Inertia::render('calendar/index', [
            'events' => $events,
            'etiquettes' => $etiquettes
        ]);
    }


    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
            'allDay' => 'boolean',
            'color' => 'nullable|string|in:blue,orange,violet,rose,emerald',
            'label' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255'
        ]);

        CalendarEvent::create($validated);

        return to_route('calendar.index');
    }

     /**
     * Show the calendar event edit form.
     */
    public function edit(CalendarEvent $calendar): Response
    {
        $etiquettes = Etiquette::orderBy('sort_order')->get();

        return Inertia::render('calendar/index', [
            'events' => CalendarEvent::all(),
            'etiquettes' => $etiquettes,
            'selectedEvent' => $calendar
        ]);
    }

    public function update(Request $request, CalendarEvent $calendar): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start' => 'required|date',
            'end' => 'required|date|after:start',
            'allDay' => 'boolean',
            'color' => 'nullable|string|in:blue,orange,violet,rose,emerald',
            'label' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255'
        ]);

        $calendar->update($validated);

        return to_route('calendar.index');
    }

    public function destroy(CalendarEvent $calendar): RedirectResponse
    {
        $calendar->delete();
        return to_route('calendar.index');
    }


}
