<?php

namespace App\Http\Controllers;

use App\Models\Etiquette;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class EtiquetteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse|InertiaResponse
    {
        $etiquettes = Etiquette::orderBy('sort_order')->get();

        // If it's an API request (Accept: application/json), return JSON
        if ($request->wantsJson()) {
            return response()->json($etiquettes);
        }

        // Otherwise, return the Inertia page
        return Inertia::render('etiquettes/index', [
            'etiquettes' => $etiquettes
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|in:blue,orange,violet,rose,emerald',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        // Set default values
        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['sort_order'] = $validated['sort_order'] ?? Etiquette::max('sort_order') + 1;

        $etiquette = Etiquette::create($validated);
        return response()->json($etiquette, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Etiquette $etiquette): JsonResponse
    {
        return response()->json($etiquette);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Etiquette $etiquette): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|in:blue,orange,violet,rose,emerald',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ]);

        $etiquette->update($validated);
        return response()->json($etiquette);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Etiquette $etiquette): JsonResponse
    {
        $etiquette->delete();
        return response()->json(['message' => 'Etiquette deleted successfully'], 200);
    }

    /**
     * Toggle the active status of an etiquette.
     */
    public function toggleActive(Etiquette $etiquette): JsonResponse
    {
        $etiquette->update(['is_active' => !$etiquette->is_active]);
        return response()->json($etiquette);
    }

    /**
     * Update the sort order of etiquettes.
     */
    public function updateOrder(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'etiquettes' => 'required|array',
            'etiquettes.*.id' => 'required|string|exists:etiquettes,id',
            'etiquettes.*.sort_order' => 'required|integer|min:0'
        ]);

        foreach ($validated['etiquettes'] as $etiquetteData) {
            Etiquette::where('id', $etiquetteData['id'])
                ->update(['sort_order' => $etiquetteData['sort_order']]);
        }

        $etiquettes = Etiquette::orderBy('sort_order')->get();
        return response()->json($etiquettes);
    }
}
