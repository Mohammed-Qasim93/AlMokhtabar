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
        return Redirect::route('result', ['id' => $pid]);
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
            return Inertia::render('Report/Print', [
                'report' => Report::where('patientid', request('id'))->first()
            ]);
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
