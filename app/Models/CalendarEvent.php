<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

class CalendarEvent extends Model
{
    use HasUlids;
    protected $fillable = [
        'title',
        'description',
        'start',
        'end',
        'allDay',
        'color',
        'label',
        'location'
    ];

    protected $casts = [
        'start' => 'datetime',
        'end' => 'datetime',
        'allDay' => 'boolean',
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];
}
