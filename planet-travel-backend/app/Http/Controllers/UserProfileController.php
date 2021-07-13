<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Hash;


class UserProfileController extends Controller
{
  
    public function getProfile($id)
    {
        $user = DB::select('select * from users where id = ? ', [$id]);

        return response()->json(['value'  => $user, 'status' => 'success']);
    }

    public function changePassword(Request $request, $userId)
    {
        $newPassword = Hash::make($request->password);

        DB::update('update users set password = ? where id = ?', [$newPassword, $userId]);

        return response()->json(['status' => 'success',"message" =>"Password Change Successfully..."]);
    }

    // get count of all Posts, Packages and Members
    public function getCount()
    {
        $countPost = DB::select('select count(*) as totalPost from blog_posts');

        $countPackage = DB::select('select count(*) as totalPackage from tour_packages');

        $countMember = DB::select('select count(*) as totalMember from club_members');

        $countPendingReservation = DB::select('select count(*) as pendingReservation from reservations where reservation_status="Pending"  ');

        $countMessages = DB::select('select count(*) as totalMessage from visitor_messages');

        return response()->json(['countPost'  => $countPost[0]->totalPost, 'countPackage'  => $countPackage[0]->totalPackage, 'countMember'  => $countMember[0]->totalMember, 'countPendingReservation'  => $countPendingReservation[0]->pendingReservation, 'countMessages'  => $countMessages[0]->totalMessage, 'status' => 'success']);
    }

}
