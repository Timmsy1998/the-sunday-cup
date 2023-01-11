<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;

class Scheduler extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'scheduledjobs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'A command that runs jobs on a schedule is a command that is designed to execute a specific task or set of tasks at predetermined intervals. This can be useful for tasks that need to be performed regularly, such as fetching data from an external API, sending email notifications, or cleaning up old data.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $client = new Client();
        $client->patch('https://sunday-cup.com/api/summoner/rank-update');
    }
}
