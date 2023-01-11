<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Session;

class SessionController extends Controller
{

    public function check()
    {
        // Code to check for active session in the `sessions` table
        $sessionFound = false;

        // check if a session record exists for the authenticated user
        $session = Session::where('user_id', auth()->id())->first();

        if ($session) {
            $sessionFound = true;
        }
        return response()->json([
            'sessionFound' => $sessionFound,
        ]);
    }
}
