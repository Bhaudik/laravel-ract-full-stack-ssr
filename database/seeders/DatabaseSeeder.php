<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Contracts\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role as SpatieRole;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $userRole = SpatieRole::create(['name' => RolesEnum::User->value]);
        // $userRole = Role::create(['name' => RolesEnum::User->value]);
        $commenterRole = SpatieRole::create(['name' => RolesEnum::Commenter->value]);
        $adminRole = SpatieRole::create(['name' => RolesEnum::Admin->value]); // Fixed typo

        $manageFeaturesPermission = Permission::create(['name' => PermissionsEnum::ManageFeatures->value]);
        $manageUserPermission = Permission::create(['name' => PermissionsEnum::ManageUser->value]);
        $manageCommentsPermission = Permission::create(['name' => PermissionsEnum::ManageCommentes->value]);
        $upvoteDownvotesPermission = Permission::create(['name' => PermissionsEnum::UpvoteDownvotes->value]);

        $userRole->syncPermissions([$upvoteDownvotesPermission]);
        $commenterRole->syncPermissions([$manageCommentsPermission, $upvoteDownvotesPermission]);
        $adminRole->syncPermissions([
            $manageUserPermission,
            $upvoteDownvotesPermission,
            $manageFeaturesPermission,
            $manageCommentsPermission
        ]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'test@example.com',
        ])->assignRole(RolesEnum::User);

        User::factory()->create([
            'name' => 'Commenter User',
            'email' => 'commenter@example.com',
        ])->assignRole(RolesEnum::Commenter);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin); // Fixed typo
    }
}
