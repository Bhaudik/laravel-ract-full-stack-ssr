<?php

namespace App\Enum;

enum RolesEnum: string
{
//

    case User = 'user';
    case Commenter = 'commenter';
    case Admin = 'admin';


    public static function lables()
    {
        return [
            self::Admin->value => 'Admin',
            self::Commenter->value => 'Commenter',
            self::User->value => 'User',
        ];
    }

    public function lable()
    {
        return match ($this) {
            self::Admin => 'Admin',
            self::Commenter->value => 'Commenter',
            self::User->value => 'User',
        };
    }
}
