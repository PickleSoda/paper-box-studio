<?php

namespace App\Services;

use App\Models\Page;

class PageService
{
    /**
     * Get pages with subpages.
     *
     * @return array
     */
    public function getPagesWithSubpages()
    {
        // Fetch pages that have no parent (root pages) and their subpages (children)
        $pages = Page::whereNull('parent_id')
            ->with('children:id,parent_id,title,is_visible') // Only select specific fields for children
            ->get(['id', 'title', 'is_visible']); // Only select specific fields for the root pages

        // Map the pages into an array with required attributes (id, title, visibility, and subpages)
        return $pages->map(function ($page) {
            return [
                'id' => $page->id,
                'title' => $page->title,
                'is_visible' => $page->is_visible,
                'subpages' => $page->children->map(function ($child) {
                    return [
                        'id' => $child->id,
                        'title' => $child->title,
                        'is_visible' => $child->is_visible,
                        'subpages' => [],
                    ];
                }),
            ];
        })->toArray();
    }
}
