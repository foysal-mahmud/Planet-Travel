<?php

namespace App\Http\Controllers;

use App\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    
    public function index()
    {
        //
        $posts = BlogPost::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'value'  => $posts,
            'status' => 'success',
            'message' => 'Post Listed Successfully !!'
            ]);
    }

   
    public function store(Request $request)
    {
        //

        $post = new BlogPost;
        $post->title = $request->title;
        $post->Content = $request->content;
        $post->post_image_path =  $request->file('file')->store('post_images');

        $post->save();

        return response()->json(['status' => 'success',"message" =>"Post Listed Successfully !!"]);
    }

    
    public function edit($id)
    {
        //
        $post = BlogPost::find($id);
        return response()->json(['value'  => $post,'status' => 'success']);
    }

  
    public function update(Request $request, $id)
    {
        //
        BlogPost::where('id', $id) -> update(['title'=>$request->title, 'content'=>$request->content, 'created_at'=> now()]);

        return response()->json(['value'=> $id,'status' => 'success', "updateMessage" =>"Update Successfully!!!!!!!!"]);

    }

    public function destroy($id)
    {
        //
        $post = BlogPost::find($id);
        $post->delete();
        BlogPost::withTrashed()->where('id', $id)->forceDelete();

        $posts = BlogPost::orderBy('created_at', 'DESC')->get();

        return response()->json(['value'  => $posts, 'status' => 'success', "message" =>"Post Deleted Permanently !!"]);
    }


    public function trash($id)
    {
        BlogPost::find($id)->delete();
        $posts = BlogPost::orderBy('created_at', 'DESC')->get();

        return response()->json([ 'value'  => $posts, 'status' => 'success', "trashMessage" =>"Moved to Trash!!!!"]);
    }

    public function readTrash()
    {
        $posts = BlogPost::orderBy('deleted_at', 'DESC')->onlyTrashed()->get();

        return response()->json([
            'value'  => $posts,
            'status' => 'success'
            ]);
    }

    public function restore($id)
    {
        BlogPost::withTrashed()->where('id', $id)->restore();
        $posts = BlogPost::onlyTrashed()->get();

        return response()->json(['value'  => $posts, 'status' => 'success', "restoreMessage" =>"Restore Your Post!!!!!"]);
    }

    public function deletePermanently($id)
    {
        BlogPost::withTrashed()->where('id', $id)->forceDelete();
        $posts = BlogPost::onlyTrashed()->get();

        return response()->json(['value'  => $posts, 'status' => 'success', "deleteMessage" =>"Delete Permanently from Trash!!!!!!"]);
    }

    public function detailsPost($id)
    {

        $postDetails = BlogPost::find($id);

        return response()->json(['value'  => $postDetails,'status' => 'success']);
    }
}
