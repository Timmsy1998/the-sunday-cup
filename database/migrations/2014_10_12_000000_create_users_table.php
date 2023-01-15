<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('email')->unique();
            $table->unsignedBigInteger('role_id')->after('id')->default(1);
            $table->string('summoner_name')->unique();
            $table->string('rank')->nullable();
            $table->boolean('summoner_verified')->default(false);
            $table->string('team_code')->nullable();
            $table->foreign('team_code')
                ->references('team_code')->on('teams')
                ->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
