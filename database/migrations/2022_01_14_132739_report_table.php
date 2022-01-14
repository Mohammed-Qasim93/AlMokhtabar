<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ReportTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('report', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('patientid');  // تلقائي 212595887
            $table->string('pname');  // اسم المريض
            $table->integer('age');
            $table->string('gender');
            $table->bigInteger('visitnum');  // تلقائي 33321509370
            $table->dateTime('visitdate');
            $table->dateTime('resultdate');
            $table->string('result'); // نتيجة التحليل
            $table->string('referencerange'); // نتيجة التحليل
            $table->bigInteger('clientid'); // تلقائي 47019
            $table->bigInteger('receiptno'); // تلقائي 10633
            $table->dateTime('registereddate');
            $table->dateTime('authenticateddate');
            $table->dateTime('collecteddate');
            $table->dateTime('printeddate');
            $table->string('branch');
            $table->bigInteger('amount');
            $table->string('paymentusername');
            $table->dateTime('paymentdate');
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
        Schema::dropIfExists('report');
    }
}
