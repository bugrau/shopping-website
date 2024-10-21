<?php



use Illuminate\Database\Migrations\Migration;

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Support\Facades\Schema;



class CreateShoppingListItemsTable extends Migration

{

    public function up()

    {

        Schema::create('shopping_list_items', function (Blueprint $table) {

            $table->id();

            $table->string('name');

            $table->integer('quantity');

            $table->boolean('purchased')->default(false);

            $table->timestamps();

        });

    }



    public function down()

    {

        Schema::dropIfExists('shopping_list_items');

    }

}


