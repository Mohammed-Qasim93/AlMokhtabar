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
        'result',
        'branch',
        'branchar',
        'amount',
        'paymentusername',
        'visitnum',
        'clientid',
        'patientid',
        'receiptno',
        'customer',
        's1date',
        's2date',
    ];
}
