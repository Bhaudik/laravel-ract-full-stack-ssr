<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Feature extends Model
{

    /**
     * Get all of the upvote for the Feature
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function upvote(): HasMany
    {
        return $this->hasMany(Upvote::class);
    }
    public function comment(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
    /**
     * Get the user that owns the Feature
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,);
    }
}
