<?php







use App\Http\Controllers\AuthController;



use App\Http\Controllers\ShoppingListController;



use Illuminate\Support\Facades\Route;







// Authentication routes



Route::post('/register', [AuthController::class, 'register']);



Route::post('/login', [AuthController::class, 'login']);



Route::post('/check-email', [AuthController::class, 'checkEmail']);







Route::middleware('auth:sanctum')->group(function () {



    Route::post('/logout', [AuthController::class, 'logout']);



    Route::apiResource('items', ShoppingListController::class);



});






