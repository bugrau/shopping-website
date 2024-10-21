<?php

use App\Http\Controllers\ShoppingListController;
use Illuminate\Support\Facades\Route;

Route::get('/items', [ShoppingListController::class, 'index']);
Route::post('/items', [ShoppingListController::class, 'store']);
Route::put('/items/{item}', [ShoppingListController::class, 'update']);
Route::delete('/items/{item}', [ShoppingListController::class, 'destroy']);
