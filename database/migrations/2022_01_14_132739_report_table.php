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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('patientid');  // تلقائي 212595887
            $table->string('pname');  // اسم المريض
            $table->integer('age');
            $table->string('gender');
            $table->bigInteger('visitnum');  // تلقائي 33321509370
            $table->string('result'); // نتيجة التحليل
            $table->bigInteger('clientid'); // تلقائي 47019
            $table->bigInteger('receiptno'); // تلقائي 1 0633
            $table->dateTime('s1date');
            $table->dateTime('s2date');
            $table->string('branch');
            $table->string('branchar');
            $table->bigInteger('amount');
            $table->string('paymentusername');
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
