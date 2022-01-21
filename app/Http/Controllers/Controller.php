<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Validation\Rules;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function index(){
        return Inertia::render('User/Index', [
            'user' => User::all()
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('User/Edit', [
            'user' => User::findOrFail($id)
        ]);
    }

    public function delete($id){
        $user = User::findOrFail($id);
        $user->delete();
        return Redirect::route('user.index')->with('success', ['icon' => 'success' ,'title' => 'Successful', 'message' => 'Delete Successflly done']);
    }

    public function update(Request $request, $id){
        $user = User::findOrFail($id);

        if(($request->name !== $user->name) || ($request->email !== $user->email) || ($request->password !== $user->password) || ($request->isAdmin !== $user->isAdmin)){
            if($request->name !== $user->name){
                $request->validate([
                    'name' => 'required|unique:users,name'
                ]);
            }
            if($request->email !== $user->email){
                $request->validate([
                    'email' => 'required|unique:users,email|email'
                ]);
            }
            if($request->password !== $user->password && $request->password !== null){
                $request->validate([
                    'password' => ['required', 'confirmed', Rules\Password::min(8)]
                ]);
            }
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
                'isAdmin' => $request->isAdmin,
                'password' => !isset($request->password) ? $user->password : Hash::make($request->password),
            ]);
            return Redirect::route('user.index')->with('success', ['icon' => 'success' ,'title' => 'Successful', 'message' => 'Edit Successflly done']);
        }else{
            return Redirect::route('user.index');
        }


        if($request->password !== $user->password && $request->password !== null){
            $request->validate([
                'password' => ['required', 'confirmed', Rules\Password::min(8)]
            ]);
        }
    }
}
