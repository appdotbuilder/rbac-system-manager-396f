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
        Schema::create('application_submenus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_menu_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug');
            $table->string('icon')->nullable();
            $table->string('route')->nullable();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('slug');
            $table->index('is_active');
            $table->index('sort_order');
            $table->index(['application_menu_id', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('application_submenus');
    }
};