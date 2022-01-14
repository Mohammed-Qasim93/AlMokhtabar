<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
