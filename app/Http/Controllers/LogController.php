<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class LogController extends Controller
{
    public function apilog($data)
    {
        $log = new Logger('API');
        $log->pushHandler(new StreamHandler(storage_path('logs/API.log'), Logger::DEBUG));

        $dataString = json_encode($data);
        // add a log record with the var_dump output
        $log->debug($dataString);
    }
}
