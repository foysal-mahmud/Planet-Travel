<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogPost extends Model
{
    //
    protected $fillable = ['title', 'content'];
    protected $table = 'blog_posts';

    use SoftDeletes;
    protected $dates = ['deleted_at'];
}
