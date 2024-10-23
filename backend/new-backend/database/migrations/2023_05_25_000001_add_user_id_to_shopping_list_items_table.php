<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdToShoppingListItemsTable extends Migration
{
    public function up()
    {
        Schema::table('shopping_list_items', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('shopping_list_items', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }
}
