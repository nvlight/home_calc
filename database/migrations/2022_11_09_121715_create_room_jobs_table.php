<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_jobs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('room_id');
            $table->string('title', 111)->default('');
            $table->bigInteger('sum')->default(0);
            $table->string('main_info', 222)->default('');

            $table->timestamps();
            $table->foreign('room_id')->references('id')->on('rooms')->onDelete('CASCADE');
        });

        Schema::table('room_jobs', function (Blueprint $table) {
            //$table->foreign('room_id')->references('id')->on('rooms')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('room_jobs');
    }
};
