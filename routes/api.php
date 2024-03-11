<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\FormController;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
     // Projects routes
     Route::get('/projects', [ProjectController::class, 'index']);
     Route::get('/projects/{project}', [ProjectController::class, 'show']);
     Route::post('/projects', [ProjectController::class, 'store']);
     Route::put('/projects/{project}', [ProjectController::class, 'update']);
     Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
 

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
    Route::get('/usersAccount', [UserController::class, 'indexUsers']);
    Route::delete('/usersAccount/{user}', [UserController::class, 'destroyUsers']);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/UnauthorizedUsers', [UserController::class, 'showUnauth']);

    Route::post('/users', [UserController::class, 'store']);
    Route::delete('/UnauthorizedUsers/{user}', [UserController::class, 'destroyUnauth']); // Ajout de la route pour supprimer un utilisateur
    Route::post('/authorizedUsers', [UserController::class, 'authorizeUnauthorizedUser']); 
   });


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Remove one of the following lines, as they are duplicate
Route::post('/loginwithgoogle', [AuthController::class, 'handleGoogleCallback']);

Route::post('/passwordreset', [AuthController::class, 'passwordReset']);
Route::post('/newpassword', [AuthController::class, 'newPassword']);
Route::post('/send-email', [App\Http\Controllers\MailController::class, 'sendEmail']);
Route::post('/storeUnAuthUser', [UserController::class, 'storeUnAuthUser']);
