<?php

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UpvoteController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

















Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::middleware([
        'verified',
        sprintf(
            'role:%s|%s|%s|',
            RolesEnum::User->value,
            RolesEnum::Admin->value,
            RolesEnum::Commenter->value
        )
    ])->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render(component: 'Dashboard');
        })->name('dashboard');

        Route::resource('feature',  FeatureController::class)
            ->except(['index', 'show'])
            ->middleware('can:' . \App\Enum\PermissionsEnum::ManageFeatures->value);

        Route::get('Feature/Index', [FeatureController::class, 'index'])->name('feature.index');
        Route::get('Feature/{feature}', [FeatureController::class, 'show'])->name('feature.show');

        Route::post('/feature/{feature}/upvote', [UpvoteController::class, 'store'])->name('upvote.store')
            // ->middleware('can:'. \App\Enum\PermissionsEnum::UpvoteDownvotes->value);
        ;
        Route::delete('upvote/feature/{feature}', [UpvoteController::class, 'destroy'])->name('upvote.feature.destroy');

        Route::post('/feature/{feature}/comments', [CommentController::class, 'store'])->name('comment.store')->middleware('can:' . \App\Enum\PermissionsEnum::ManageCommentes->value);

        Route::delete('/delete/comment/{comment}', [CommentController::class, 'destroy'])->name('feature.comment.destroy')->middleware('can:' . \App\Enum\PermissionsEnum::ManageCommentes->value);

        Route::middleware(['verified', 'role:' . \App\Enum\RolesEnum::Admin->value])->group(
            function () {
                Route::get('User/Index', [UserController::class, 'index'])
                    ->name('user.index');
                Route::get('User/{user}/Edit', [UserController::class, 'edit'])
                    ->name('user.edit');
                Route::put('User/{user}', [UserController::class, 'update'])
                    ->name('users.update');
            }
        );
    });
});

require __DIR__ . '/auth.php';
