<?php



namespace App\Http\Controllers;



use App\Models\ShoppingListItem;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use Illuminate\Support\Facades\Log;



class ShoppingListController extends Controller

{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        \Log::info('User: ' . $request->user());
        \Log::info('Token: ' . $request->bearerToken());
        return $request->user()->shoppingListItems;
    }

    public function store(Request $request)
    {
        \Log::info('Request user: ' . $request->user());
        \Log::info('Request all: ' . json_encode($request->all()));

        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:255',

            'quantity' => 'required|integer|min:1|max:1000',

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
