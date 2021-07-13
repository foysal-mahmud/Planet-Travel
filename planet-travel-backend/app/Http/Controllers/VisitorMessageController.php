<?php

namespace App\Http\Controllers;

use App\VisitorMessage;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class VisitorMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $visitorMsg = DB::select('select * from visitor_messages order by created_at desc');

        return response()->json([
            'value'  => $visitorMsg,
            'status' => 'success'
            ]);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'visitorEmail'=>'required',
            'visitorMessage'=>'required',
        ]);

        //
        $message = new VisitorMessage;
        $message->visitor_email = $request->visitorEmail;
        $message->visitor_message = $request->visitorMessage;

        $message->save();

        return response()->json(['status' => 'success',"message" =>"Message Send Successfully... Thank You"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\VisitorMessage  $visitorMessage
     * @return \Illuminate\Http\Response
     */
    public function show(VisitorMessage $visitorMessage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\VisitorMessage  $visitorMessage
     * @return \Illuminate\Http\Response
     */
    public function edit(VisitorMessage $visitorMessage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\VisitorMessage  $visitorMessage
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, VisitorMessage $visitorMessage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\VisitorMessage  $visitorMessage
     * @return \Illuminate\Http\Response
     */
    public function destroy(VisitorMessage $visitorMessage)
    {
        //
    }
}
