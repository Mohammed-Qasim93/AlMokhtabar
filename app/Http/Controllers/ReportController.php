<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    
    public function index(){
        return Inertia::render('Report/Index', [
            'report' => Report::paginate(20)
        ]);
    }

    public function create(){
        return Inertia::render('Report/Create');
    }

    public function store(Request $request){
        
        $request->validate([
            'pname' => 'required|string',
            'age' => 'required|numeric',
            'gender' => 'required|string',
            'visitdate' => 'required|date',
            'resultdate' => 'required|date',
            'result' => 'required|string',
            'registereddate' => 'required|date',
            'authenticateddate' => 'required|date',
            'collecteddate' => 'required|date',
            'printeddate' => 'required|date',
            'branch' => 'required|string',
            'branchar' => 'required|string',
            'amount' => 'required|numeric',
            'paymentusername' => 'required|string',
            'paymentuserdate' => 'required|date',
        ]);

        Report::create([
            'pname' => $request->pname,
            'age' => $request->age,
            'gender' => $request->gender,
            'visitdate' => $request->visitdate,
            'resultdate' => $request->resultdate,
            'result' => $request->result,
            'registereddate' => $request->registereddate,
            'authenticateddate' => $request->authenticateddate,
            'collecteddate' => $request->collecteddate,
            'printeddate' => $request->printeddate,
            'branch' => $request->branch,
            'branchar' => $request->branchar,
            'amount' => $request->amount,
            'paymentusername' => $request->paymentusername,
            'paymentuserdate' => $request->paymentuserdate,
            'visitnum' => $this->randomNum(Report::pluck('visitnum'), 10000000000, 99999999999),
            'clientid' => $this->randomNum(Report::pluck('clientid'), 100000, 99999),
            'patientid' => $this->randomNum(Report::pluck('patientid'), 1000000000, 999999999),
            'receiptno' => $this->randomNum(Report::pluck('receiptno'), 100000, 99999),
        ]);
        return Redirect::back()->with('success', ['icon' => 'success' ,'title' => 'Successful', 'message' => 'Added Successfully']);
    }

    public function print(){
        $report = Report::latest()->first();
        $page1 = '
        <style>
            body{
                background: url("page_1.jpg");
                background-image-resize: 6;
                font-size: 13px;
            }
            .branchar{
                position: absolute;
                top: 5px;
                left: 40px;
                width: 100px;
                text-align: right;
                font-weight: bold
            }
            .pname{
                position: absolute;
                top: 155px;
                left: 30px;
                width: 290px;
                height: 48px;
                font-size: 20px;
                font-weight: bold
            }
            .registered{
                position: absolute;
                top: 140px;
                left: 410px;
                width: 155px;
            }
            .authintecated{
                position: absolute;
                top: 175px;
                left: 430px;
                width: 140px;
            }
            .printed{
                position: absolute;
                top: 140px;
                right: 45px;
                width: 140px;
            }
            .collected{
                position: absolute;
                top: 175px;
                right: 50px;
                width: 145px;
            }
            .clientid{
                position: absolute;
                top: 245px;
                right: 45px;
                width: 200px;
                text-align: center;
            }
            .gender{
                position: absolute;
                top: 245px;
                left: 262px;
                width: 60px;
                text-align: center;
            }
            .age{
                position: absolute;
                top: 245px;
                left: 178px;
                width: 30px;
                text-align: center;
            }
            .visitnum{
                position: absolute;
                top: 245px;
                left: 25px;
                width: 143px;
                text-align: center;
            }
            .result{
                position: absolute;
                top: 365px;
                left: 268px;
                width: 143px;
                font-weight: bold;
            }
            .referencerange{
                position: absolute;
                top: 365px;
                left: 498px;
                width: 143px;
                font-weight: bold
            }
            
        </style>
        <body>
            <p dir="rtl" class="branchar">بغداد الجديدة</p>
            <p class="pname">Mohammed Kifah Jumaah Kareem</p>
            <p class="registered">27-11-2021 09:16:03</p>
            <p class="authintecated">27-11-2021 09:16:03</p>
            <p class="collected">27-11-2021 09:16:03</p>
            <p class="printed">27-11-2021 09:16:03</p>
            <p class="clientid">47019</p>
            <p class="gender">Female</p>
            <p class="age">56</p>
            <p class="visitnum">33321509370</p>
            <p class="result">Negative</p>
            <p class="referencerange">Negative</p>
        </body>
        ';
        $page2 = '
        <style>
            body{
                background: url("page_2.jpg");
                background-image-resize: 6;
                font-size: 13px;
            }
            .pname{
                position: absolute;
                top: 112px;
                left: 30px;
                width: 257px;
                height: 42px;
                font-size: 16px;
                font-weight: bold;
            }
            .visitdate{
                position: absolute;
                top: 95px;
                left: 363px;
                width: 90px;
            }
            .paymentdate{
                position: absolute;
                top: 95px;
                left: 547px;
                width: 90px;
            }
            .resultdate{
                position: absolute;
                top: 117px;
                left: 372px;
                width: 80px;
            }
            .receiptno{
                position: absolute;
                top: 117px;
                left: 530px;
                width: 120px;
                text-align: center;
            }
            .branch{
                position: absolute;
                top: 117px;
                left: 660px;
                width: 120px;
                height: 38px;
                text-align: center;
            }
            .visitnum{
                position: absolute;
                top: 193px;
                left: 30px;
                width: 110px;
                text-align: center;
            }
            .age{
                position: absolute;
                top: 193px;
                left: 150px;
                width: 25px;
                text-align: center;
            }
            .patientid{
                position: absolute;
                top: 193px;
                left: 214px;
                width: 75px;
                text-align: center;
            }
            .pricevalue{
                position: absolute;
                top: 265px;
                right: 203px;
                width: 110px;
                text-align: center;
            }
            .totalamount{
                position: absolute;
                top: 293px;
                right: 78px;
                width: 100px;
                text-align: right;
                font-size: 18px;
            }
            .finalamount{
                position: absolute;
                top: 344px;
                right: 78px;
                width: 100px;
                text-align: right;
                font-size: 18px;
            }
            .totalreceived{
                position: absolute;
                top: 402px;
                right: 78px;
                width: 100px;
                text-align: right;
                font-size: 18px;
            }
            .currentamount{
                position: absolute;
                top: 293px;
                right: 455px;
                width: 125px;
                font-size: 17px;
            }
            .paymentusername{
                position: absolute;
                top: 323px;
                right: 350px;
                width: 260px;
            }
            .paymentdatetime{
                position: absolute;
                top: 347px;
                right: 350px;
                width: 260px;
            }
            .money{
                position: absolute;
                top: 430px;
                left: 66px;
                width: 150px;
                font-size: 18px;
                font-weight: bold;
                text-align: right;
            }
        </style>
        <body>
            <p class="pname">Mohammed Kifah Jumaah Kareem</p>
            <p class="visitdate">27 Nov 2021</p>
            <p class="paymentdate">27 Nov 2021</p>
            <p class="resultdate">27 Nov 2021</p>
            <p class="receiptno">10633</p>
            <p class="branch">Baghdad</p>
            <p class="visitnum">33321509370</p>
            <p class="age">70</p>
            <p class="patientid">212595887</p>
            <p class="pricevalue">100000</p>
            <p class="totalamount">100000</p>
            <p class="finalamount">100000</p>
            <p class="totalreceived">100000</p>
            <p class="currentamount">100000</p>
            <p class="paymentusername">Mohammed Kifah Jumaah Kareem</p>
            <p class="paymentdatetime">Mohammed Kifah Jumaah Kareem</p>
            <div class="money">
                <span dir="rtl"> 1000 جنيهآ</span>
            </div>
        </body>
        ';

        $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);
        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;
        $mpdf->WriteHTML($page1);
        $mpdf->AddPage();
        $mpdf->WriteHTML($page2);
        $mpdf->Output('nn.pdf', 'I');
    }

    public function randomNum($old, $from, $to){
        $rand = mt_rand($from, $to);
        foreach($old as $num){
            if($num == $rand){
                return $this->randomNum($old, $from, $to);
            }
        }
        return $rand;
    }
}
