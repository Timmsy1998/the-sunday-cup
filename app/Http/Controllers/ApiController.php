<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Api\RiotApi;

class ApiController extends Controller
{
    public function getSummonerByName(RiotApi $api, $summonerName)
    {
        $result = $api->getSummonerByName($summonerName);

        return response()->json($result);
    }

    public function getSummonerRankInformation(RiotApi $api, $summonerName)
    {
        $result = $api->getSummonerRankInformation($summonerName);

        return response()->json($result);
    }

    public function getMatchListByAccount(RiotApi $api, $accountId)
    {
        $result = $api->getMatchListByAccount($accountId);

        return response()->json($result);
    }

    public function getAllSummonerIcons(RiotApi $api)
    {
        $result = $api->getAllSummonerIcons();

        return response()->json($result);
    }

    public function getAvailableSummonerIcons(RiotApi $api)
    {
        $result = $api->getAvailableSummonerIcons();

        return response()->json($result);
    }

    public function getRandomSummonerIcon(RiotApi $api)
    {
        $result = $api->getRandomSummonerIcon();

        return response()->json($result);
    }
}
