<?php

namespace App\Api;

use GuzzleHttp\Client;

class RiotApi
{
    private $client;
    private $apiKey;
    private $region;
    private $baseUrl;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('RIOT_API_KEY');
        $this->region = env('RIOT_API_REGION', 'euw1');
        $this->baseUrl = "https://{$this->region}.api.riotgames.com";
    }

    public function getSummonerByName($summonerName)
    {
        $url = "{$this->baseUrl}/lol/summoner/v4/summoners/by-name/{$summonerName}";

        $response = $this->client->request('GET', $url, [
            'headers' => [
                'X-Riot-Token' => $this->apiKey
            ]
        ]);

        $data = json_decode($response->getBody(), true);

        return $data;
    }

    public function getSummonerRankInformation($summonerName)
    {
        $summonerdata = $this->getSummonerByName($summonerName);

        $summonerID = $summonerdata['id'];

        $url = "{$this->baseUrl}/lol/league/v4/entries/by-summoner/{$summonerID}";

        $response = $this->client->request('GET', $url, [
            'headers' => [
                'X-Riot-Token' => $this->apiKey
            ]
        ]);

        $data = json_decode($response->getBody(), true);

        return $data;
    }

    public function getMatchListByAccount($accountId)
    {
        $url = "{$this->baseUrl}/lol/match/v4/matchlists/by-account/{$accountId}";

        $response = $this->client->request('GET', $url, [
            'headers' => [
                'X-Riot-Token' => $this->apiKey
            ]
        ]);

        $data = json_decode($response->getBody(), true);

        return $data;
    }

    public function getAllSummonerIcons()
    {
        $url = 'http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/profileicon.json';

        $response = $this->client->request('GET', $url);

        $data = json_decode($response->getBody(), true);

        return $data['data'];
    }

    public function getAvailableSummonerIcons()
    {
        $allIcons = $this->getAllSummonerIcons();

        $availableIcons = array_filter($allIcons, function ($icon) {
            return $icon['id'] >= 0 && $icon['id'] <= 28;
        });

        return $availableIcons;
    }

    public function getRandomSummonerIcon()
    {
        $availableIcons = $this->getAvailableSummonerIcons();

        $randomIndex = array_rand($availableIcons);

        return $availableIcons[$randomIndex];
    }
}
