<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->integer('userId');
            $table->string('packageId');
            $table->string('fullName');
            $table->string('email');
            $table->string('mobile_number');
            $table->string('billingName');
            $table->string('billingAddress');
            $table->string('billingDivision');
            $table->string('billingCity');
            $table->string('billingZip');
            $table->string('card_type');
            $table->string('cardHolder_name');
            $table->string('card_number');
            $table->string('card_expiration_month');
            $table->string('card_expiration_year');
            $table->string('reservation_status');
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
        Schema::dropIfExists('reservations');
    }
}
