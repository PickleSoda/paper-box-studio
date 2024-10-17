<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function create()
    {
        // Fetch all pages to allow selecting a parent page (if applicable)
        $allPages = Page::all();

        return Inertia::render('Admin/PageForm', [
            'allPages' => $allPages
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the input data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'cover_image' => 'nullable|string',
            'parent_id' => 'nullable|exists:pages,id', // parent page should exist in the pages table
        ]);

        // Create the new page
        Page::create($validated);

        // Redirect to the admin pages index or back to form with success message
        return redirect()->route('pages')->with('success', 'Page created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
