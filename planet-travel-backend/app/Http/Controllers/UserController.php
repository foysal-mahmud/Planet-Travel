<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\User;


class UserController extends Controller
{

    public function checkLogin(Request $request) {

        $this->validate($request,[
            'email'=>'required',
            'password'=>'required',
        ]);

         $user= User::where('email', $request->email)->first();

         $username = $user->name;
         $id = $user->id;

         if ($user && Hash::check($request->password, $user->password)){

            if($user->email === "admin@root.com"){
                return response()->json(['username' => $username,'id' => $id, 'status' => 'success', "isLogin" =>"isLogin"]);
            } else {
            return response()->json(['username' => $username,'id' => $id, 'status' => 'success', "isLogin" =>"isUserLogin"]);
            }


         } else {
            return response()->json([ 'status' => 'error', "message" =>"Wrong Credential!! Please Enter correct Credential.."]);
         }
    }

    public function registration(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'name'=>'required',
            'email'=>'required | email | unique:users',
            'password'=>'required | min:8',
        ], [
            // Name error messages
            'name.required' => 'Please give your name',

            // Email error messages
            'email.required' => 'Please give your email address',
            'email.email' => 'Enter valid email',            
            'email.unique' => 'Email already exists',

            //Password error messages
            'password.required' => 'Please enter a valid password',
            'password.min' => 'Password must be 8 character long',
            
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 403,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        User::create(['name'=>$request->name, 'email'=>$request->email, 'password'=>Hash::make($request->password)]);

        return response()->json(['name' => $request->name,'status' => 'success',"message" =>"You are Successfully Registered..."]);
    }

    public function checkUserEmail($emailExist)
    {
        $checkEmail= User::where('email', $emailExist)->first();

        if($checkEmail) {
            return response()->json([ 'status' => 'success']);
        }
    }

    
}
