<?php

namespace App\Services;

use App\Models\Page;
use Illuminate\Support\Facades\Cache;

class PageService
{
    /**
     * Get active pages.
     * If an ID is provided, return child pages for the given parent page.
     * If no ID is provided, return root (parent) pages.
     *
     * @param int|null $parentId
     * @return \Illuminate\Support\Collection
     */

    public function getActivePages(?int $parentId = null)
    {
        $cacheKey = $parentId ? "pages_for_parent_{$parentId}" : "parent_pages";
    
        return Cache::remember($cacheKey, now()->addMinutes(10), function () use ($parentId) {
            if (is_null($parentId)) {
                return Page::whereNull('parent_id')
                ->where('is_visible', true)
                ->get(['id', 'title', 'is_visible']);
            }
    
            return Page::where('parent_id', $parentId)->get(['id', 'title', 'is_visible']);
        });
    }

    public function getParentPages()
    {
        return Page::whereNull('parent_id')->
        get(['id', 'title', 'is_visible']);
    }

    /**
     * Create a new page with validated data.
     *
     * @param array $data
     * @return \App\Models\Page
     */
    public function createPage(array $data)
    {
        return Page::create($data);
    }

    /**
     * Update an existing page with validated data.
     *
     * @param \App\Models\Page $page
     * @param array $data
     * @return \App\Models\Page
     */
    public function updatePage(Page $page, array $data)
    {
        $page->update($data);
        return $page;
    }

    /**
     * Find a page by ID and optionally load its children.
     *
     * @param int $pageId
     * @return \App\Models\Page
     */
    public function getPageWithChildren(int $pageId)
    {
        return Page::with('children:id,parent_id,title,is_visible')->findOrFail($pageId);
    }

    /**
     * Delete a page by its ID.
     *
     * @param int $pageId
     * @return void
     */
    public function deletePage(int $pageId)
    {
        $page = Page::findOrFail($pageId);
        $page->delete();
    }
}

