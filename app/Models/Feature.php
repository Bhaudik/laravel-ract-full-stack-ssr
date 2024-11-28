<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Feature extends Model
{

    use HasFactory;

    protected $fillable = [
        "name",
        "description",
        "user_id",
    ];
    /**
     * Get all of the upvote for the Feature
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function upvotes(): HasMany
    {
        return $this->hasMany(Upvotes::class);
    }
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class)->latest();
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
