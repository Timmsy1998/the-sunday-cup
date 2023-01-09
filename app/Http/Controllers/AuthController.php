<?php

namespace App\Http\Controllers;

use App\Models\User as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use GuzzleHttp\Client;

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

        if ($user->fails()) {
            return Response::json([
                'errors' => $user->errors()
            ], 422);
        }

        // Return a response
        return Response::json([
            'message' => 'Successfully registered user',
            'user' => $user
        ], 201);

        // Start a Session For The Newly Registered User
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            // Start a new session for the user
            session(['user_id' => Auth::id()]);

            // Get the current user's session data
            $session = Auth::user()->toArray();

            // Set the state in the VueX store
            $client = new Client();
            $client->request('POST', '/api/set-session', [
                'form_params' => [
                    'session' => $session,
                ],
            ]);

            // Return a response
            return Response::json([
                'message' => 'Successfully logged in',
                'user' => Auth::user()
            ], 201);
        } else {
            // Return a response
            return Response::json([
                'errors' => [
                    'username' => ['These credentials do not match our records.']
                ]
            ], 422);
        }
    }

    public function login(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return Response::json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Attempt to log the user in
        if (Auth::attempt(['username' => $request->username, 'password' => $request->password])) {
            // Start a new session for the user
            session(['user_id' => Auth::id()]);

            // Get the current user's session data
            $session = Auth::user()->toArray();

            // Set the state in the VueX store
            $client = new Client();
            $client->request('POST', '/api/set-session', [
                'form_params' => [
                    'session' => $session,
                ],
            ]);

            // Return a response
            return Response::json([
                'message' => 'Successfully logged in',
                'user' => Auth::user()
            ], 201);
        } else {
            // Return a response
            return Response::json([
                'errors' => [
                    'username' => ['These credentials do not match our records.']
                ]
            ], 422);
        }
    }
}
