<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureListResoursce;
use App\Http\Resources\FeatureResoursce;
use App\Models\Feature;
use App\Models\Upvotes;
use DB;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentuUserId = auth()->id();
        $paginated = Feature::latest()
            ->withCount(['upvotes as upvote_count' => function ($query) {
                $query->select(DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));
            }])
            ->withExists([
                'upvotes as user_has_upvoted' => function ($query) use ($currentuUserId) {
                    $query->where('user_id', $currentuUserId)
                        ->where('upvote', 1);
                },
                'upvotes as user_has_downvoted' => function ($query) use ($currentuUserId) {
                    $query->where('user_id', $currentuUserId)
                        ->where('upvote', 0);
                }
            ])
            ->paginate();

        return Inertia::render("Feature/Index", [
            "features" => FeatureListResoursce::collection($paginated)

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Feature/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);


        $data['user_id'] = auth()->id();


        $feature = Feature::create($data);

        return to_route('feature.index')->with('success', 'Feature Create Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        $feature->upvote_count = Upvotes::where('feature_id', $feature->id)
            ->sum(DB::raw('CASE WHEN upvote = 1 THEN 1 ELSE -1 END'));

        // dd($feature);
        $feature->user_has_upvoted = Upvotes::where('feature_id', $feature->id)
            ->where('user_id', auth()->id())
            ->where('upvote', 1)
            ->exists();

        $feature->user_has_downvoted = Upvotes::where('feature_id', $feature->id)
            ->where('user_id', auth()->id())
            ->where('upvote', 0)
            ->exists();
        return Inertia::render('Feature/Show', [
            'feature' => new FeatureResoursce($feature)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Feature/Edit', [
            'feature' => new FeatureResoursce($feature)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        //
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);
        $feature->update($data);
        return to_route('feature.index')->with('success', 'Feature Update Successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();
        return to_route('feature.index')->with('success', 'Feature deleted Successfully');
    }
}
