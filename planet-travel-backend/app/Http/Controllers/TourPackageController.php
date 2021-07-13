<?php

namespace App\Http\Controllers;

use App\TourPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TourPackageController extends Controller
{
   

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $image_path =  $request->file('file')->store('post_images');

        DB::insert('insert into tour_packages ( packagePost, packageTitle, packagePrice , packageDay, tourDate , image_path) values ( ?, ?, ?, ?, ?, ?)', [ $request->packagePost, $request->packageTitle, $request->packagePrice, $request->packageDay, $request->tourDate, $image_path]);

        return response()->json(['status' => 'success',"message" =>"Tour Package Listed Successfully !!"]);
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TourPackage  $tourPackage
     * @return \Illuminate\Http\Response
     */
    public function readPackage()
    {

        // $package = DB::select('select * from tour_packages');
        $package = TourPackage::orderBy('created_at', 'ASC')->get();

        return response()->json([
            'value'  => $package,
            'status' => 'success'
            ]);

    }
  
    public function edit($id)
    {
        //
        $package = TourPackage::find($id);
        return response()->json(['value'  => $package,'status' => 'success']);
    }

  
    public function update(Request $request, $id)
    {
        //
        TourPackage::where('id', $id) -> update(['packageTitle'=>$request->packageTitle, 'packagePrice'=>$request->packagePrice, 'packagePost'=>$request->packagePost, 'packageDay'=>$request->packageDay, 'tourDate'=>$request->tourDate]);

        return response()->json(['status' => 'success', "updateMessage" =>"Update Package Successfully!!!!!!!!"]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TourPackage  $tourPackage
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $package = TourPackage::find($id);
        $package->delete();
        TourPackage::withTrashed()->where('id', $id)->forceDelete();

        $package = TourPackage::orderBy('created_at', 'DESC')->get();

        return response()->json(['value'  => $package, 'status' => 'success', "message" =>"Package Deleted Permanently !!"]);
    }

    
    public function trash($id)
    {
        TourPackage::find($id)->delete();

        $allPackage = TourPackage::orderBy('created_at', 'DESC')->get();

        return response()->json([ 'value'  => $allPackage, 'status' => 'success', "trashPackageMessage" =>"Moved to Trash!!!!"]);
    }

    public function readPackageTrash()
    {
        $package = TourPackage::orderBy('deleted_at', 'DESC')->onlyTrashed()->get();

        return response()->json([
            'value'  => $package,
            'status' => 'success'
            ]);
    }

    public function packageRestore($id)
    {
        TourPackage::withTrashed()->where('id', $id)->restore();
        $package = TourPackage::onlyTrashed()->get();

        return response()->json(['value'  => $package, 'status' => 'success', "restoreMessage" =>"Restore Your Package!!!!!"]);
    }

    public function deletePackagePermanently($id)
    {
        TourPackage::withTrashed()->where('id', $id)->forceDelete();
        $package = TourPackage::onlyTrashed()->get();

        return response()->json(['value'  => $package, 'status' => 'success', "deleteMessage" =>"Delete Package Permanently from Trash!!!!!!"]);
    }
}
