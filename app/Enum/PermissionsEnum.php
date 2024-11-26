<?php

namespace App\Enum;

enum PermissionsEnum: string

{
    case ManageFeatures = 'manage_features';
    case ManageUser = 'manage_user';
    case ManageCommentes = 'manage_comments';
    case UpvoteDownvotes = 'upvote_downvotes';
}
