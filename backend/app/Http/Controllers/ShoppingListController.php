<?php



namespace App\Http\Controllers;



use App\Models\ShoppingListItem;

use Illuminate\Http\Request;



class ShoppingListController extends Controller

{

    public function index()

    {

        return ShoppingListItem::all();

    }



    public function store(Request $request)

    {

        $request->validate([

            'name' => 'required|string',

            'quantity' => 'required|integer|min:1',

        ]);



        return ShoppingListItem::create($request->all());

    }



    public function update(Request $request, ShoppingListItem $item)

    {

        $request->validate([

            'purchased' => 'required|boolean',

        ]);



        $item->update($request->all());

        return $item;

    }



    public function destroy(ShoppingListItem $item)

    {

        $item->delete();

        return response()->json(null, 204);

    }

}


