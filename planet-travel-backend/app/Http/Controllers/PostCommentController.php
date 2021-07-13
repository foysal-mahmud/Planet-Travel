<?php

namespace App\Http\Controllers;

use App\PostComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostCommentController extends Controller
{
    public function storeComment(Request $request)
    {
        DB::insert('insert into post_comments ( post_id, comment_username, comment_content) values ( ?, ?, ?)', [ $request->post_id, $request->comment_username, $request->comment_content]);
        

        // $postComment = new PostComment;
        // $postComment->post_id = $request->post_id;
        // $postComment->comment_username = $request->comment_username;
        // $postComment->comment_content = $request->comment_content;
      
        // $postComment->save();
        $comment_data = DB::select('select * from post_comments where post_id = ? order by comment_date DESC', [$request->post_id]);

        return response()->json(['value'  => $comment_data, 'status' => 'success',"message" =>"Comment Added ..."]);
    }

    public function getComment($id)
    {
        $comment_data = DB::select('select * from post_comments where post_id = ? order by comment_date DESC', [$id]);

        return response()->json(['value'  => $comment_data, 'status' => 'success']);
    }
}
