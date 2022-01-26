<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Mpdf\Mpdf;
use Mpdf\QrCode\QrCode;
use Mpdf\QrCode\Output;
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
            'result' => 'required|string',
            'branch' => 'required|string',
            'branchar' => 'required|string',
            'amount' => 'required|numeric',
            'paymentusername' => 'required|string',
            's1date' => 'required|date',
            's2date' => 'required|date',
            'customer' => 'required|string',
        ]);

        $pid = $this->randomNum(Report::pluck('patientid'), 100000000, 999999999);

        Report::create([
            'pname' => $request->pname,
            'age' => $request->age,
            'gender' => $request->gender,
            'result' => $request->result,
            'branch' => $request->branch,
            'branchar' => $request->branchar,
            'amount' => $request->amount,
            'paymentusername' => $request->paymentusername,
            's1date' => $request->s1date,
            's2date' => $request->s2date,
            'customer' => $request->customer,
            'visitnum' => $this->randomNum(Report::pluck('visitnum'), 1000000000, 99999999999),
            'clientid' => $this->randomNum(Report::pluck('clientid'), 10000, 99999),
            'patientid' => $pid,
            'receiptno' => $this->randomNum(Report::pluck('receiptno'), 10000, 99999),
        ]);
        // return Redirect::route('print', ['id' => $pid]);
        return Redirect::route('index')->with('success', ['icon' => 'success' ,'title' => 'Successful', 'message' => 'Add Successflly done']);
    }

    public function edit($id){
        return Inertia::render('Report/Edit', [
            'report' => Report::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id){
        $report = Report::findOrFail($id);

        if(($report->pname != $request->pname) || ($report->age != $request->age) || ($report->gender != $request->gender)
            || ($report->result != $request->result) || ($report->branch != $request->branch) || ($report->branchar != $request->branchar)
            || ($report->amount != $request->amount) || ($report->paymentusername != $request->paymentusername) 
            || ($report->s1date != $request->s1date) || ($report->s2date != $request->s2date) || ($report->customer != $request->customer)){

            if(($report->pname != $request->pname)){
                $request->validate([
                    'pname' => 'required|string'
                ]);
            }
            if(($report->age != $request->age)){
                $request->validate([
                    'age' => 'required|numeric',
                ]);
            }
            if(($report->gender != $request->gender)){
                $request->validate([
                    'gender' => 'required|string'
                ]);
            }
            if(($report->result != $request->result)){
                $request->validate([
                    'result' => 'required|string'
                ]);
            }
            if(($report->branch != $request->branch)){
                $request->validate([
                    'branch' => 'required|string'
                ]);
            }
            if(($report->branchar != $request->branchar)){
                $request->validate([
                    'branchar' => 'required|string'
                ]);
            }
            if(($report->amount != $request->amount)){
                $request->validate([
                    'amount' => 'required|numeric',
                ]);
            }
            if(($report->paymentusername != $request->paymentusername)){
                $request->validate([
                    'paymentusername' => 'required|string',
                ]);
            }
            if(($report->s1date != $request->s1date)){
                $request->validate([
                    's1date' => 'required|date',
                ]);
            }
            if(($report->s2date != $request->s2date)){
                $request->validate([
                    's2date' => 'required|date',
                ]);
            }
            if(($report->customer != $request->customer)){
                $request->validate([
                    'customer' => 'required|string',
                ]);
            }

            $report->update([
                'pname' => $request->pname,
                'age' => $request->age,
                'gender' => $request->gender,
                'result' => $request->result,
                'branch' => $request->branch, 
                'branchar' => $request->branchar,
                'amount' => $request->amount,
                'paymentusername' => $request->paymentusername,
                's1date' => $request->s1date,
                's2date' => $request->s2date,
                'customer' => $request->customer,
            ]);
            return Redirect::route('index')->with('success', ['icon' => 'success' ,'title' => 'Successful', 'message' => 'Edit Successflly done']);
        }
        return Redirect::route('index');
    }

    public function result(){
        if(request('id')){
            $report = Report::where('patientid', request('id'))->first();
            if($report){
                return Inertia::render('Report/Result', [
                    'report' => $report
                ]);
            }else{
                return abort(404);
            }        
        }else{
            return abort(404);
        }
    }

    public function print(){
        $report = Report::where('patientid', request('id'))->first();
        if($report){
            $gender = $report->gender == 0 ? "Female" : "Male";
            $result = $report->result == 0 ? "Negative" : "Positive";
            $url = 'almokhtabar22.000webhostapp.com/result?id=' . $report->patientid;
            $page1 = '
            <style>
                body{
                    background: url("images/page_1.jpg");
                    background-image-resize: 6;
                    direction: rtl;
                    font-size: 14px;
                    text-align: center;
                }
                .bg{
                    background-color: #333;
                    height: 120px;
                    width: 120px;
                    padding: 6 0 6 0 ;
                    border-radius: 10px;
                    text-align: center;
                    position: absolute;
                    bottom: 170;
                    left: 40;
                }
                .barcode {
                    padding: 1.5mm;
                    color: #000000;
                }
                .scanme{
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 10px;
                }
                .pname{
                    position: absolute;
                    top: 182;
                    left: 20;
                    width: 308;
                    height: 104;
                    font-weight: bold;
                    text-align: center
                }
                .branchar{
                    position: absolute;
                    top: 18;
                    left: 28;
                    width: 120;
                    text-align: right;
                    font-weight: bold;
                }
                .regdate{
                    position: absolute;
                    top: 166;
                    left: 445;
                    width: 120;
                    font-size: 12;
                    text-align: left;
                }
                .coldate{
                    position: absolute;
                    top: 166;
                    left: 636;
                    width: 120;
                    font-size: 12;
                    text-align: left;
                }
                .printdate{
                    position: absolute;
                    top: 206;
                    left: 636;
                    width: 120;
                    font-size: 12;
                    text-align: left;
                }
                .authdate{
                    position: absolute;
                    top: 206;
                    left: 445;
                    width: 120;
                    font-size: 12;
                    text-align: left;
                }
                .clientid{
                    position: absolute;
                    top: 274;
                    left: 574;
                    width: 205;
                    text-align: center;
                }
                .gender{
                    position: absolute;
                    top: 301;
                    left: 283;
                    width: 46;
                    font-size: 12;
                    text-align: center;
                }
                .age{
                    position: absolute;
                    top: 298;
                    left: 185;
                    width: 35;
                    text-align: center;
                }
                .visitnum{
                    position: absolute;
                    top: 298;
                    left: 20;
                    width: 150;
                    text-align: center;
                }
                .result{
                    position: absolute;
                    top: 423;
                    left: 470;
                    width: 110;
                    text-align: left;
                }
                .result2{
                    position: absolute;
                    top: 423;
                    left: 280;
                    width: 110;
                    text-align: left;
                }
            </style>
            <body>
                <div class="bg">
                    <span class="scanme">Scan Me</span>
                    <barcode code="' . $url . '" class="barcode" type="QR" size="1.3" error="M" disableborder="1" />
                </div>
                <h3 class="pname">'. $report->pname .'</h2>
                <p class="branchar">'. $report->branchar .'</p>
                <p class="regdate">'. $report->s2date .'</p>
                <p class="coldate">'. $report->s2date .'</p>
                <p class="authdate">'. $report->s1date .'</p>
                <p class="printdate">'. $report->s1date .'</p>
                <p class="clientid">'. $report->clientid .'</p>
                <p class="gender">'. $gender .'</p>
                <p class="age">'. $report->age .'</p>
                <p class="visitnum">'. $report->visitnum .'</p>
                <p class="result">'. $result .'</p>
                <p class="result2">'. $result .'</p>
            </body>
            ';
            $page2 = '
            <style>
                body{
                    background: url("images/page_2.jpg");
                    background-image-resize: 6;
                    direction: rtl;
                    font-size: 14px;
                    text-align: center;
                }
                .pname{
                    position: absolute;
                    top: 100;
                    left: 20;
                    width: 244;
                    height: 39;
                    text-align: center;
                    font-weight: 200;
                }
                .visitnum{
                    position: absolute;
                    top: 177;
                    left: 22;
                    width: 93;
                    text-align: center;
                    font-weight: 200;
                }
                .age{
                    position: absolute;
                    top: 177;
                    left: 125;
                    width: 22;
                    text-align: center;
                    font-weight: 200;
                }
                .patientid{
                    position: absolute;
                    top: 177;
                    left: 187;
                    width: 78;
                    text-align: center;
                    font-weight: 200;
                }
                .visitdate{
                    position: absolute;
                    top: 83;
                    left: 342;
                    width: 108;
                    font-size: 12;
                }
                .paymentdate{
                    position: absolute;
                    top: 83;
                    left: 540;
                    width: 108;
                    font-size: 12;
                }
                .resultdate{
                    position: absolute;
                    top: 105;
                    left: 360;
                    width: 90;
                    font-size: 12;
                }
                .receipt{
                    position: absolute;
                    top: 105;
                    left: 540;
                    width: 108;
                    font-size: 12;
                }
                .branch{
                    position: absolute;
                    top: 105;
                    left: 650;
                    width: 130;
                    font-size: 12;
                }
                .customer{
                    position: absolute;
                    top: 160;
                    left: 580;
                    width: 200;
                    text-align: center;
                    font-size: 12;
                }
                .tamount{
                    position: absolute;
                    top: 274;
                    left: 620;
                    width: 70;
                    text-align: right;
                    font-size: 12;
                }
                .famount{
                    position: absolute;
                    top: 318;
                    left: 620;
                    width: 70;
                    text-align: right;
                    font-size: 12;
                }
                .ramount{
                    position: absolute;
                    top: 337;
                    left: 620;
                    width: 70;
                    text-align: right;
                    font-size: 12;
                }
                .vamount{
                    position: absolute;
                    top: 243;
                    left: 520;
                    width: 70;
                    text-align: center;
                    font-size: 12;
                }
                .camount{
                    position: absolute;
                    top: 270;
                    left: 260;
                    width: 110;
                    font-weight: bold;
                    font-size: 12;
                    text-align: left;
                }
                .username{
                    position: absolute;
                    top: 290;
                    left: 260;
                    width: 190;
                    font-size: 12;
                    text-align: left;
                }
                .paydate{
                    position: absolute;
                    top: 310;
                    left: 260;
                    width: 190;
                    font-size: 12;
                    text-align: left;
                }
                .amountdiv{
                    display:flex;
                    font-weight:bold;
                    text-align: right;
                    position: absolute;
                    top: 360;
                    left: 56;
                    width: 165;
                }
                
            </style>
            <body>
                <h5 class="pname">'. $report->pname .'</h2>
                <h5 class="visitnum">'. $report->visitnum .'</h2>
                <h5 class="age">'. $report->age .'</h2>
                <h5 class="patientid">'. $report->patientid .'</h2>
                <p class="visitdate">'. Carbon::parse($report->s2date)->format('d M Y') .'</p>
                <p class="paymentdate">'. Carbon::parse($report->s2date)->format('d M Y') .'</p>
                <p class="resultdate">'. Carbon::parse($report->s1date)->format('d M Y') .'</p>
                <p class="receipt">'. $report->receiptno .'</p>
                <p class="branch">'. $report->branch .'</p>
                <p class="customer">'. $report->customer .'</p>
                <p class="tamount">'. $report->amount .'</p>
                <p class="famount">'. $report->amount .'</p>
                <p class="ramount">'. $report->amount .'</p>
                <p class="vamount">'. $report->amount .'</p>
                <p class="vamount">'. $report->amount .'</p>
                <p class="camount">'. $report->amount .'</p>
                <p class="username">'. $report->paymentusername .'</p>
                <p class="paydate">'. Carbon::parse($report->s2date)->format('d/m/Y') .'</p>
                <div class="amountdiv">
                    <span>'. $report->amount .'</span>
                    <span>جنيهاً</span>
                </div>
            </body>
            ';

            $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);
            $mpdf->autoScriptToLang = true;
            $mpdf->autoLangToFont = true;
            $mpdf->WriteHTML($page1);
            $mpdf->AddPage();
            $mpdf->WriteHTML($page2);
            $mpdf->Output($report->pname . ' - ' . now() . '.pdf', 'D');
        }else{
            return abort(404);
        }
            
        // if(request('id')){
        //     $report = Report::where('patientid', request('id'))->first();
        //     if($report){
        //         return Inertia::render('Report/Print', [
        //             'report' => $report
        //         ]);
        //     }else{
        //         return abort(404);
        //     }  
        // }else{
        //     return abort(404);
        // }
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
