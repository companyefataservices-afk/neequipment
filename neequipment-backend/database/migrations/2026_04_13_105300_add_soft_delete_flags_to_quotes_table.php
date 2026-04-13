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
        Schema::table('quotes', function (Blueprint $col) {
            $col->timestamp('deleted_at_client')->nullable();
            $col->timestamp('deleted_at_admin')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quotes', function (Blueprint $col) {
            $col->dropColumn(['deleted_at_client', 'deleted_at_admin']);
        });
    }
};
