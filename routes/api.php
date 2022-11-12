<?php

use App\Http\Controllers\MaterialController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\RoomJobController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function ()
{
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::resource('/room', RoomController::class);
    Route::resource('/roomjob', RoomJobController::class);
    Route::resource('/material', MaterialController::class);
});

Route::get('/room-store2', [RoomController::class,'store2']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
