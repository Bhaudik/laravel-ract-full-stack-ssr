<?php

namespace App\Http\Controllers;

use App\Enum\RolesEnum;
use App\Http\Resources\AuthUserResoursce;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd(AuthUserResoursce::collection(User::all())->collection->toArray());
        return Inertia::render("User/Index", [
            'users' => AuthUserResoursce::collection(User::all())->collection->toArray(),
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', [
            'users' => new AuthUserResoursce($user),
            'roles' => Role::all(),
            'roleLable' => RolesEnum::lables()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'roles' => ['required', 'array']
        ]);

        $user->syncRoles($data['roles']);

        // dd($data);

        return back()->with('success','Reles updated successfully.');
    }
}
