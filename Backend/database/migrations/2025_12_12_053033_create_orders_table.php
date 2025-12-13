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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->date('order_date')->required();
            $table->foreignId('shop_id')->constrained('shops')->onDelete('cascade');
            $table->foreignId('rep_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('driver_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('vehicle_id')->nullable()->constrained('vehicles')->onDelete('cascade');
            $table->decimal('discount_rate', 10, 2)->nullable();
            $table->string('discount')->nullable();
            $table->string('total_amount')->required();
            $table->string('status')->default('pending');
            $table->date('delivery_date')->nullable();
            $table->string('payment_status')->default('unpaid');
            $table->string('cheque_number')->nullable();
            $table->string('bank_name')->nullable();



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
        Schema::dropIfExists('orders');
    }
};
