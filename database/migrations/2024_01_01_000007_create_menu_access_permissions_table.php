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
        Schema::create('menu_access_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_role_id')->constrained()->onDelete('cascade');
            $table->foreignId('application_menu_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('application_submenu_id')->nullable()->constrained()->onDelete('cascade');
            $table->boolean('can_view')->default(true);
            $table->boolean('can_create')->default(false);
            $table->boolean('can_edit')->default(false);
            $table->boolean('can_delete')->default(false);
            $table->timestamps();
            
            $table->unique(['user_role_id', 'application_menu_id', 'application_submenu_id'], 'unique_role_menu_submenu');
            $table->index('user_role_id');
            $table->index('application_menu_id');
            $table->index('application_submenu_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_access_permissions');
    }
};