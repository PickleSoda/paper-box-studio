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
    public function index()
    {
        // Fetch all pages, including their relationships (parent/children if necessary)
        $pages = Page::with('children', 'parent')->get();

        return Inertia::render('Admin/Pages/index', [
            'pages' => $pages
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
            'parent_id' => 'nullable|exists:pages,id', // Ensure the parent page exists
        ]);

        // Create the new page
        Page::create($validated);

        // Redirect to the pages index with a success message
        return redirect()->route('pages.index')->with('success', 'Page created successfully');
    }

    public function create(Request $request)
    {
        $pageId = $request->route('pageId');
        $page = Page::findOrFail($pageId);

        return Inertia::render('Admin/Pages/Form', [
            'parent' => $page,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function edit(Request $request)
    {
        $pageId = $request->route('pageId');
        $page = Page::with('children')->findOrFail($pageId);

        return Inertia::render('Admin/Pages/Form', [
            'page' => $page,
            'childPages' => $page->children ?? [],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate the updated input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'cover_image' => 'nullable|string',
            'parent_id' => 'nullable|exists:pages,id', // Ensure parent page exists
        ]);

        // Find the page and update it
        $page = Page::findOrFail($id);
        $page->update($validated);

        // Redirect back to the pages list with a success message
        return redirect()->route('pages.index')->with('success', 'Page updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the page and delete it
        $page = Page::findOrFail($id);
        $page->delete();

        // Redirect back to the pages list with a success message
        return redirect()->route('pages.index')->with('success', 'Page deleted successfully');
    }
}