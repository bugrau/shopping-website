<?php



namespace App\Http\Controllers;



use App\Models\ShoppingListItem;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;



class ShoppingListController extends Controller

{

    public function index(Request $request)
    {
        return $request->user()->shoppingListItems;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:255',

            'quantity' => 'required|integer|min:1|max:1000',

            'category' => 'nullable|string|max:255',

        ]);



        if ($validator->fails()) {

            return response()->json(['errors' => $validator->errors()], 422);

        }

        $item = $request->user()->shoppingListItems()->create($request->all());
        return $item;
    }

    public function update(Request $request, ShoppingListItem $item)
    {
        $this->authorize('update', $item);

        $validator = Validator::make($request->all(), [

            'name' => 'sometimes|required|string|max:255',

            'quantity' => 'sometimes|required|integer|min:1|max:1000',

            'purchased' => 'sometimes|required|boolean',

            'category' => 'nullable|string|max:255',

        ]);



        if ($validator->fails()) {

            return response()->json(['errors' => $validator->errors()], 422);

        }

        $item->update($request->all());
        return $item;
    }

    public function destroy(ShoppingListItem $item)
    {
        $this->authorize('delete', $item);

        $item->delete();
        return response()->json(null, 204);
    }

}
