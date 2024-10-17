<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->json('title');
            $table->json('content');
            $table->json('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->boolean('is_visible')->default(false);
            $table->foreignId('parent_id')->nullable()->constrained('pages')->onDelete('cascade'); // optional parent page
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
