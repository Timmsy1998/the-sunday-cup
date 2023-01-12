<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApiController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Auth API Routes
Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');
Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
Route::get('/check-session', 'App\Http\Controllers\AuthController@check');
Route::get('/userinfo', 'App\Http\Controllers\AuthController@userinfo');



// Riot API Routes
Route::get('/summoner/{summonerName}', 'App\Http\Controllers\ApiController@getSummonerByName');
Route::get('/summoner/{summonerName}/rank', 'App\Http\Controllers\ApiController@getSummonerRankInformation');
Route::get('/matchlist/{accountId}', 'App\Http\Controllers\ApiController@getMatchListByAccount');
Route::get('/summoner-icons/all', 'App\Http\Controllers\ApiController@getAllSummonerIcons');
Route::get('/summoner-icons/available', 'App\Http\Controllers\ApiController@getAvailableSummonerIcons');
Route::get('/summoner-icons/random', 'App\Http\Controllers\ApiController@getRandomSummonerIcon');
Route::patch('/summoner/rank-update', 'App\Http\Controllers\UserController@updateRank');

