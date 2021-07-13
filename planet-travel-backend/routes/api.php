<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// ------- Authentication ----------------
//Login 
Route::post('/login','UserController@checkLogin');

// registration
Route::post('/registration', 'UserController@registration');

// check User Email
Route::get('/checkEmail/{emailExist}', 'UserController@checkUserEmail');


// -------------- User Profile ---------------------

// Password Change
Route::post('/user/changePassword/{userId}', 'UserProfileController@changePassword');

// Profile
Route::get('/user/profile/{id}', 'UserProfileController@getProfile');

// Count All post, packages, members and reservation pending
Route::get('/getCount', 'UserProfileController@getCount');



// ========== Travelling Stories ==================

// Read all Post
Route::get('/read', 'BlogPostController@index');

// create Post
Route::post('/admin/create', 'BlogPostController@store');

//update post
Route::get('/admin/edit/{id}', 'BlogPostController@edit');
Route::post('/admin/update/{id}', 'BlogPostController@update');

//delete Post
Route::get('/admin/delete/{id}', 'BlogPostController@destroy');

 //Moved to Trash
Route::get('/admin/trash/{id}', 'BlogPostController@trash');

 //Display from Trash
Route::get('/admin/readTrash', 'BlogPostController@readTrash')->name('trashPage');
 
 //Restore items from Trash
Route::get('/admin/restore/{id}', 'BlogPostController@restore');
 
 // Delete Permanently from Trash
Route::get('/admin/deletePermanently/{id}', 'BlogPostController@deletePermanently');

 // Post Details 
Route::get('/post/details/{id}', 'BlogPostController@detailsPost');

 //comment of a post
Route::get('/post/getComment/{id}', 'PostCommentController@getComment');
Route::post('/post/storeComment', 'PostCommentController@storeComment');

// ---------- Visitors Message -------------
Route::get('/visitorMessage/read', 'VisitorMessageController@index');
Route::post('/visitorMessage', 'VisitorMessageController@store');


// ---------- Package ADMIN -------------------
// AddPackage
Route::post('/admin/addPackage', 'TourPackageController@store');

// Read Package
Route::get('/admin/readPackage', 'TourPackageController@readPackage');

//update package
Route::get('/admin/editPackage/{id}', 'TourPackageController@edit');
Route::post('/admin/updatePackage/{id}', 'TourPackageController@update');

//delete Package
Route::get('/packageAdmin/delete/{id}', 'TourPackageController@destroy');

 //Moved to Trash
Route::get('/packageAdmin/trash/{id}', 'TourPackageController@trash');

 //Display from Trash - Package
 Route::get('/admin/readPackageTrash', 'TourPackageController@readPackageTrash');
 
 //Restore items from Trash
Route::get('/admin/packageRestore/{id}', 'TourPackageController@packageRestore');
 
 // Delete Permanently from Trash
Route::get('/admin/packageDeletePermanently/{id}', 'TourPackageController@deletePackagePermanently');


 // ============== Our Club Member ============

 // create
Route::post('/se/insert', 'ClubMemberController@insertUser');

// Read
Route::get('/se/read', 'ClubMemberController@readUser')->name('show');

// update
Route::get('/se/edit/{id}', 'ClubMemberController@editUser');
Route::post('/se/update/{id}', 'ClubMemberController@updateUser');

// Delete
Route::get('/se/delete/{id}', 'ClubMemberController@deleteUser');

// Details info
Route::get('/se/details/{id}', 'ClubMemberController@detailsUser');



// ================= Reservation ===============

// Make a Reservation
Route::post('/user/reservation/{userId}', 'ReservationController@makeReservation');

// Get Reservation Data
Route::get('/package/reservation', 'ReservationController@getReservationData');

// ADMIN - Change User Reservation Status 
Route::post('/admin/reservationStatus/{inputStatus}/{userId}/{packageId}', 'ReservationController@changeUserReservationStatus');


// ================= Search Member by their name ==============

// Search User
Route::get('/searchUser/{searchItem}', 'ClubMemberController@searchUser');