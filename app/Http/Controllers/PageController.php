<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Page;
use App\Services\PageService;
use Inertia\Inertia;

class PageController extends Controller
{
    protected $pageService;

    public function __construct(PageService $pageService)
    {
        $this->pageService = $pageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pages = $this->pageService->getParentPages();

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

        $this->pageService->createPage($validated);

        return redirect()->route('pages.index')->with('success', 'Page created successfully');
    }

    /**
     * Show the form for creating a new page under a parent.
     */
    public function create(Request $request)
    {
        $pageId = $request->route('pageId');
        $page = $this->pageService->getPageWithChildren($pageId);

        return Inertia::render('Admin/Pages/Form', [
            'parent' => $page,
        ]);
    }

    /**
     * Display the specified resource and its child pages for editing.
     */
    public function edit(Request $request)
    {
        $pageId = $request->route('pageId');
        $page = $this->pageService->getPageWithChildren($pageId);

        return Inertia::render('Admin/Pages/Form', [
            'page' => $page,
            'childPages' => $page->children ?? [],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        if (!$page) {
            return back()->withErrors(['page' => 'Page not found']);
        }

        // Validate the updated input
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'content' => 'required|string',
            'cover_image' => 'nullable|string',
            'parent_id' => 'nullable|exists:pages,id', // Ensure parent page exists
        ]);

        // Use the PageService to update the page
        $this->pageService->updatePage($page, $validated);

        return back()->with('success', 'Page updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $pageId = $request->route('pageId');
        $this->pageService->deletePage($pageId);

        return back()->with('success', 'Page deleted successfully');
    }
}
