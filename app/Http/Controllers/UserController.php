<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Api\RiotApi;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function updateRank()
    {

        $users = User::all();
        $api = new RiotApi();
        $responseData = [];
        $soloTier = '';
        $soloRank = '';

        foreach ($users as $user) {
            try {
                // Fetch data from the API using Guzzle and calculate the rank value
                $summonerName = $user->summoner_name;
                $apiData = $api->getSummonerRankInformation($summonerName);

                foreach ($apiData as $data) {
                    if ($data['queueType'] === 'RANKED_SOLO_5x5') {
                        $soloTier = $data['tier'];
                        $soloRank = $data['rank'];
                        break;
                    }
                }

                if(!$apiData) {
                    $rankValue = "Unranked";
                } else {
                    $rankValue = $soloTier . ' ' . $soloRank;
                }

                // Update the user's rank in the database
                $user->rank = $rankValue;
                $user->save();

                $responseData[] = [
                    'user' => $user,
                    'rank_value' => $rankValue,
                    'value_in_db' => $user->rank,
                ];
            } catch (\Exception $e) {
                // Log the error message and continue with the next user
                Log::error($e->getMessage());
                continue;
            }
        }

        // Return a response to the API body
        return response()->json([
            'status' => 'success',
            'data' => $responseData,
        ]);
    }
}
