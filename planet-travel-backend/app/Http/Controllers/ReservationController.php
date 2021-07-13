<?php

namespace App\Http\Controllers;

use App\Reservation;
use App\TourPackage;
use Illuminate\Http\Request;
use App\Mail\ReservationStatusMail;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{

    public function makeReservation(Request $request, $userId)
    {
        $reservation = new Reservation();
        $reservation->userId = $userId;
        $reservation->packageId = $request->packageId;
        $reservation->fullName = $request->fullName;
        $reservation->email = $request->email;
        $reservation->mobile_number = $request->mobile_number;

        $reservation->billingName = $request->billingName;
        $reservation->billingAddress = $request->billingAddress;
        $reservation->billingDivision = $request->billingDivision;
        $reservation->billingCity = $request->billingCity;
        $reservation->billingZip = $request->billingZip;

        $reservation->card_type = $request->card_type;
        $reservation->cardHolder_name = $request->cardHolder_name;
        $reservation->card_number = $request->card_number;
        $reservation->card_expiration_month = $request->card_expiration_month;
        $reservation->card_expiration_year = $request->card_expiration_year;
        $reservation->reservation_status = "Pending";

        $reservation->save();

        return response()->json(['status' => 'success',"message" =>"Reservation Successful...Please wait for Approval... Also "]);
    }

    public function getReservationData()
    {
        //
        $reservationData = Reservation::orderBy('created_at', 'DESC')->get();
        
        return response()->json([
            'value'  => $reservationData,
            'status' => 'success'
            ]);
    }

    public function changeUserReservationStatus($inputStatus, $userId, $packageId)
    {
        Reservation::where('userId', $userId) -> where('packageId', $packageId) ->update(['reservation_status'=>$inputStatus]);

        $reservationData = Reservation::orderBy('created_at', 'DESC')->get();

        $userReservation = Reservation::where('userId', $userId) -> where('packageId', $packageId) ->get();

        $userEmail = $userReservation[0]->email;

        $package = TourPackage::find($packageId);

        $detailsReservation=[
            "reservation_status" => $userReservation[0] -> reservation_status,
            "userId" => $userReservation[0] -> userId,
            "packageId" =>  $userReservation[0] -> packageId,
            "fullName" => $userReservation[0] -> fullName,
            "email" => $userReservation[0] -> email,
            "mobile_number" =>$userReservation[0] -> mobile_number,
            "billingName" =>$userReservation[0] -> billingName,
            "billingAddress" =>  $userReservation[0] -> billingAddress,
            "billingDivision" =>  $userReservation[0] -> billingDivision,
            "billingCity" =>  $userReservation[0] -> billingCity,
            "billingZip" =>  $userReservation[0] -> billingZip,
            "card_type" =>  $userReservation[0] -> card_type,
            "cardHolder_name" =>  $userReservation[0] -> cardHolder_name,
            "card_number" =>  $userReservation[0] -> card_number,
            "card_expiration_month" =>  $userReservation[0] -> card_expiration_month,
            "card_expiration_year" =>  $userReservation[0] -> card_expiration_year,
            "packageTitle" => $package -> packageTitle,
            "tourDate" => $package -> tourDate,

        ];

       Mail::to($userEmail)->send(new ReservationStatusMail($detailsReservation));
        
        return response()->json([
            'value'  => $reservationData,
            'status' => 'success'
            ]);
    }

    
}
