<?php


use App\Http\Controllers\ProjectController;
use App\Notifications\StaffNewAccountNotification;
use Illuminate\Support\Facades\Route;
use App\Models\Document;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// public routes
Route::apiResource('projects', ProjectController::class); // To Auth Upon User Module Development
