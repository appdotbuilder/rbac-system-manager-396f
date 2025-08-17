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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('user_role_id')->nullable()->after('email_verified_at')->constrained()->onDelete('set null');
            $table->foreignId('user_type_id')->nullable()->after('user_role_id')->constrained()->onDelete('set null');
            $table->boolean('is_active')->default(true)->after('user_type_id');
            $table->timestamp('last_login_at')->nullable()->after('is_active');
            
            $table->index('user_role_id');
            $table->index('user_type_id');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['user_role_id']);
            $table->dropForeign(['user_type_id']);
            $table->dropColumn(['user_role_id', 'user_type_id', 'is_active', 'last_login_at']);
        });
    }
};