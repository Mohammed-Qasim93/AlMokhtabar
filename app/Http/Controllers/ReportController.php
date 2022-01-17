<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ReportController extends Controller
{
    
    public function index(){
        return Inertia::render('Report/Index', [
            'report' => Report::orderBy('created_at', 'desc')->paginate(20)
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
            'paymentdate' => 'required|date',
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
            'paymentdate' => $request->paymentdate,
            'visitnum' => $this->randomNum(Report::pluck('visitnum'), 1000000000, 99999999999),
            'clientid' => $this->randomNum(Report::pluck('clientid'), 10000, 99999),
            'patientid' => $this->randomNum(Report::pluck('patientid'), 100000000, 999999999),
            'receiptno' => $this->randomNum(Report::pluck('receiptno'), 10000, 99999),
        ]);
        return Redirect::route('index');
    }

    public function edit($id){
        return Inertia::render('Report/Show', [
            'report' => Report::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id){

    }

    public function print(){
        if(request('print') == 'pdf'){
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
                <p dir="rtl" class="branchar">' . $report->branchar . '</p>
                <p class="pname">' . $report->pname . '</p>
                <p class="registered">' . Carbon::parse($report->registerationdate)->format('Y-m-d H:m:s') . '</p>
                <p class="authintecated">' . Carbon::parse($report->authenticateddate)->format('Y-m-d H:m:s') . '</p>
                <p class="collected">' . Carbon::parse($report->collecteddate)->format('Y-m-d H:m:s') . '</p>
                <p class="printed">' . Carbon::parse($report->printeddate)->format('Y-m-d H:m:s') . '</p>
                <p class="clientid">' . $report->clientid . '</p>
                <p class="gender">' . $report->gender . '</p>
                <p class="age">' . $report->age . '</p>
                <p class="visitnum">' . $report->visitnum . '</p>
                <p class="result">' . $report->result . '</p>
                <p class="referencerange">' . $report->result . '</p>
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
                <p class="pname">' . $report->pname . '</p>
                <p class="visitdate">' . Carbon::parse($report->visitdate)->format('Y-M-d') . '</p>
                <p class="paymentdate">' . Carbon::parse($report->paymentuserdate)->format('Y-m-d') . '</p>
                <p class="resultdate">' . Carbon::parse($report->resultdate)->format('Y-M-d') . '</p>
                <p class="receiptno">' . $report->receiptno . '</p>
                <p class="branch">' . $report->branch . '</p>
                <p class="visitnum">' . $report->visitnum . '</p>
                <p class="age">' . $report->age . '</p>
                <p class="patientid">' . $report->pateintid . '</p>
                <p class="pricevalue">' . $report->amount . '</p>
                <p class="totalamount">' . $report->amount . '</p>
                <p class="finalamount">' . $report->amount . '</p>
                <p class="totalreceived">' . $report->amount . '</p>
                <p class="currentamount">' . $report->amount . '</p>
                <p class="paymentusername">' . $report->paymentusername  . '</p>
                <p class="paymentdatetime">' . Carbon::parse($report->paymentuserdate)->format('Y-m-d H:m:s A') . '</p>
                <div class="money">
                    <span dir="rtl"> ' . $report->amount . ' جنيهآ</span>
                </div>
            </body>
            ';

            $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);
            $mpdf->autoScriptToLang = true;
            $mpdf->autoLangToFont = true;
            $mpdf->WriteHTML($page1);
            $mpdf->AddPage();
            $mpdf->WriteHTML($page2);
            $mpdf->Output($report->pname, 'D');
        }else{
            return abort(404);
        }
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
