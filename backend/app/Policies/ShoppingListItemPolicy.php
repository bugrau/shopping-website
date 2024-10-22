<?php

namespace App\Policies;

use App\Models\ShoppingListItem;
use App\Models\User;

class ShoppingListItemPolicy
{
    public function update(User $user, ShoppingListItem $item)
    {
        return $user->id === $item->user_id;
    }

    public function delete(User $user, ShoppingListItem $item)
    {
        return $user->id === $item->user_id;
    }
}
