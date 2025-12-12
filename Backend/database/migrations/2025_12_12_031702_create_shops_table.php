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
        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string('shop_name')->required();
            $table->string('owner_name');
            $table->date('owner_dob');
            $table->string('contact_number')->required();
            $table->string('address')->required();
            $table->string('map_location')->nullable();
            $table->string('credit_limit')->default(0);
            $table->string('credit_balance')->default(0);
            $table->string('return_balance')->default(0);
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
        Schema::dropIfExists('shops');
    }
};
