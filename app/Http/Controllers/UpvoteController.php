<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Upvotes;

use Illuminate\Http\Request;

class UpvoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $data = $request->validate([
            'feature_id' => ['required', 'exists:feature,id'],
            'Upvotes' => ['required', 'boolean']
        ]);

        Upvotes::updateOrCreate(
            ['feature_id' => $data['feature_id'], 'user_id' => auth()->id()],
            ['Upvotes' => $data['Upvotes']]
        );

        return to_route('feature.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Upvotes $Upvotes)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Upvotes $Upvotes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Upvotes $Upvotes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->upvotes()->where('user_id', auth()->id())->delete();

        return back();
    }
}
