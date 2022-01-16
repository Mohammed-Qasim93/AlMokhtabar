<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'pname',
        'age',
        'gender',
        'visitdate',
        'resultdate',
        'result',
        'registereddate',
        'authenticateddate',
        'collecteddate',
        'printeddate',
        'branch',
        'branchar',
        'amount',
        'paymentusername',
        'paymentdate',
        'visitnum',
        'clientid',
        'patientid',
        'receiptno',
    ];
}
