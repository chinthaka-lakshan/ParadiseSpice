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
        Schema::create('order_return', function (Blueprint $table) {
            $table->id();
            $table->foreignId('shop_id')->constrained();
            $table->foreignId('rep_id')->constrained('users');
            $table->foreignId('driver_id')->nullable()->constrained('users');
            $table->date('return_date');
            $table->date('delivery_date')->nullable();
            $table->string('reason')->nullable();
            $table->decimal('discount', 10, 2)->nullable();
            $table->decimal('discount_rate', 10, 2)->nullable();
            $table->decimal('total', 10, 2);
            $table->string('status')->default('pending');
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
        Schema::dropIfExists('order_return');
    }
};
