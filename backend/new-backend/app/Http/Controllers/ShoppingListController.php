<?php



namespace App\Http\Controllers;



use App\Models\ShoppingListItem;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Log;



class ShoppingListController extends Controller

{

    public function index()

    {

        $user = Auth::user();

        Log::info('Fetching items for user: ' . $user->id);

        $items = $user->shoppingListItems;

        Log::info('Items fetched: ' . $items->count());

        Log::info('Items: ' . json_encode($items));

        return response()->json($items);

    }



    public function store(Request $request)

    {

        $user = Auth::user();

        Log::info('Creating item for user: ' . $user->id);

        $validatedData = $request->validate([

            'name' => 'required|string|max:255',

            'quantity' => 'required|integer|min:1',

            'purchased' => 'boolean',

        ]);



        $item = $user->shoppingListItems()->create($validatedData);

        Log::info('Item created: ' . $item->id);

        return response()->json($item, 201);

    }



    public function update(Request $request, $id)
    {
        $user = Auth::user();
        Log::info('Updating item ' . $id . ' for user: ' . $user->id);
        $item = $user->shoppingListItems()->find($id);
        
        if (!$item) {
            Log::warning('Item not found or not owned by user. Item ID: ' . $id . ', User ID: ' . $user->id);
            return response()->json(['message' => 'Item not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'quantity' => 'integer|min:1',
            'purchased' => 'boolean',
        ]);

        $item->update($validatedData);
        Log::info('Item updated: ' . $item->id);
        return response()->json($item);
    }



    public function destroy($id)

    {

        $user = Auth::user();

        Log::info('Deleting item ' . $id . ' for user: ' . $user->id);

        $item = $user->shoppingListItems()->findOrFail($id);

        $item->delete();

        Log::info('Item deleted: ' . $id);

        return response()->json(null, 204);

    }

}



