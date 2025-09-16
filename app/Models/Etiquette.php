<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Etiquette extends Model
{
    use HasUlids;

    protected $fillable = [
        'name',
        'color',
        'is_active',
        'sort_order'
    ];
    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];
    protected $hidden = [
        'created_at',
        'updated_at'
    ];


    /**
     * Get all of the events for the Etiquette
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function events(): HasMany
    {
       // TODO: Define relationship if needed
    }
}
