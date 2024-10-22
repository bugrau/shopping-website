<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCategoryToShoppingListItems extends Migration
{
    public function up()
    {
        Schema::table('shopping_list_items', function (Blueprint $table) {
            $table->string('category')->nullable();
        });
    }

    public function down()
    {
        Schema::table('shopping_list_items', function (Blueprint $table) {
            $table->dropColumn('category');
        });
    }
}
