<?php

namespace App\Http\Controllers;

use App\Models\User as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Response;
use GuzzleHttp\Client;
use App\Models\Session as SessionModel;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuthController extends Controller
{
    use AuthenticatesUsers;

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
            $user = Auth::user();
            $session = Session::createSession($user);

            // Return a response
            return Response::json([
                'message' => 'Successfully logged in',
                'user' => Auth::user(),
                'session' => $session
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

        $validatedData = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $username = $validatedData['username'];
        $password = $validatedData['password'];

        htmlspecialchars($username, ENT_QUOTES, 'UTF-8');

        if (Auth::attempt(['username' => $username, 'password' => $password])) {
            // Authentication passed...
            session()->put('user_id', auth()->user()->id);
            $sessionId = session()->getId();
            $user = Auth::user();
            return response()->json([
                'status' => 'success',
                'username' => $user->username,
                'user_id' => session()->get('user_id'),
                'summonerName' => $user->summoner_name,
                'rank' => $user->rank,
                'isLoggedIn' => true,
                'token' => $sessionId,
            ], 200);
        }
    }

    public function logout()
    {
        Auth::logout();
        session()->flush();
        session()->regenerate();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function check()
    {
        $sessionFound = auth()->check();
        return response()->json([
            'sessionFound' => $sessionFound,
        ]);
    }




    public function userinfo()
    {
        if (Auth::check()) {
            $user = User::find(Auth::user()->id);
            $sessionId = session()->getId();

            return response()->json([
                'username' => $user->username,
                'email' => $user->email,
                'summonerName' => $user->summoner_name,
                'rank' => $user->rank,
                'team_code' => $user->team_code,
                'isLoggedIn' => true,
                'token' => $sessionId,
            ]);
        } else {
            return response()->json(['message' => 'Unauthorized', 'isLoggedIn' => false], 401);
        }
    }
}
