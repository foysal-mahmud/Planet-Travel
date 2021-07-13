<?php

namespace App\Http\Controllers;

use App\ClubMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClubMemberController extends Controller
{
    public function insertUser(Request $request)
    {
        $this->validate($request,[
            'name'=>'required',
            'email'=>'required',
        ]);

        // $image_path =  $req->store('public');

        DB::insert('insert into club_members ( name, email, member_id , address, division , city, mobile_number ) values ( ?, ?, ?, ?, ?, ?, ?)', [ $request->name, $request->email, $request->member_id, $request->address, $request->division, $request->city, $request->mobile_number]);
        
        return response()->json(['status' => 'success',"message" =>"Welcome to our Club!!!!"]);
    }

    public function readUser()
    {

        $users = DB::select('select * from club_members');

        return response()->json([
            'value'  => $users,
            'status' => 'success'
            ]);

    }

    function editUser($id)
    {        
        $user_data = ClubMember::find($id);
        // $user_data  = DB::select('select * from bjit_se where id =?',[$id]);
        // return view('editUserForm',['user_data'=>$user_data]);
        return response()->json(['value'  => $user_data,'status' => 'success']);
    }

    function updateUser(Request $request, $id)
    {
        DB::update('update club_members set name = ?, email = ?, member_id = ?, address = ?, division = ?, city = ?, mobile_number = ? where id = ?', [$request->name, $request->email, $request->member_id, $request->address, $request->division, $request->city, $request->mobile_number, $id]);

        return response()->json(['value'=> $id,'status' => 'success', "updateMessage" =>"Update info Successfully!!!!!!!!"]);
    }

    public function deleteUser($id)
    {

        DB::delete('delete from club_members where id = ?', [$id]);
        $users = DB::select('select * from club_members');

        // return redirect()->route('show')->with('delete','Delete Software Engineer Successfully');
        return response()->json(['value'  => $users, 'status' => 'success', "message" =>"Delete Club Member Successfully !!"]);
    }

    public function detailsUser($id)
    {

        $userArr = DB::select('select * from club_members where id = ?', [$id]);

        // return view('detailsUserPage', ['user'=>$user]);
        return response()->json(['value'  => $userArr,'status' => 'success']);
    }

    public function searchUser($searchItem)
    {
        $searchData= ClubMember::query()->where('name', 'LIKE', "%{$searchItem}%")->get();

        if($searchData) {
            return response()->json([ 'status' => 'success', 'value'  => $searchData]);
        }

    }
   
}
