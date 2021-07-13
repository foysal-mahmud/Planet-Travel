<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TourPackage extends Model
{
    //
    protected $fillable = ['packageTitle', 'packagePrice', 'packagePost', 'packageDay', 'tourDate'];
    protected $table = 'tour_packages';

    use SoftDeletes;
    protected $dates = ['deleted_at'];
}
