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
            'referencerange' => 'required|string',
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

        Report::create($request->all());
        return Redirect::back()->with('success', ['icon' => 'success' ,'title' => 'نجاح العملية', 'message' => 'تمت العملية بنجاح']);
    }

    public function print(){
        $report = Report::latest()->first();
        $html = '
        <style>
            body{
                background: url("page_1.jpg");
                background-image-resize: 6;
                direction: rtl;
                font-size: 16px;
            }
            .x{
                text-align: center;
                padding-top: 100px;
            }
            .lead{
                line-height: 20px;
                font-weight:: 70px;
                font-size: 20px
            }
            .textsize{
                font-size: 20px
            }
            .posDel{
                position: absolute;
                top: 1100px;
                left: 75px;
                font-size: 18px
            }
            .posRes{
                position: absolute;
                top: 1100px;
                left: 655px;
                font-size: 18px
            }
            .dataDel{
                position: absolute;
                top: 1130px;
                left: 70px;
                font-size: 22px;
                width: 100px
            }
            .dataRes{
                position: absolute;
                top: 1130px;
                left: 650px;
                font-size: 22px;
                width: 100px
            }
        </style>
        <body>
            <p>الجيزة</p>
        </body>
        ';
        $mpdf = new \Mpdf\Mpdf(['format' => 'Legal']);
        $mpdf->autoScriptToLang = true;
        $mpdf->autoLangToFont = true;
        $mpdf->WriteHTML($html);

        $mpdf->Output('nn.pdf', 'I');
    }
}
