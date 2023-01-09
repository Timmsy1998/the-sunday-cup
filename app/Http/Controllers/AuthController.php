<?php

namespace App\Http\Controllers;

use App\Models\User as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'summonerName' => 'required|string|min:3',
        ]);

        if ($validator->fails()) {
            return Response::json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Create the user
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'summoner_name' => $request->summonerName,
            'summoner_verified' => $request->summoner_verified,
            'rank' => $request->rank,
            'team_code' => NULL,
        ]);

        // Return a response
        return Response::json([
            'message' => 'Successfully registered user',
            'user' => $user
        ], 201);
    }
}
