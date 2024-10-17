<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'content', 'description', 'cover_image', 'parent_id'];

    // A page can have many child pages
    public function children()
    {
        return $this->hasMany(Page::class, 'parent_id');
    }

    // A page can optionally have one parent page
    public function parent()
    {
        return $this->belongsTo(Page::class, 'parent_id');
    }
}

