<?php



use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShoppingListController;

use Illuminate\Support\Facades\Route;



// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/items', [ShoppingListController::class, 'index']);
    Route::post('/items', [ShoppingListController::class, 'store']);
    Route::put('/items/{item}', [ShoppingListController::class, 'update']);
    Route::delete('/items/{item}', [ShoppingListController::class, 'destroy']);
});




