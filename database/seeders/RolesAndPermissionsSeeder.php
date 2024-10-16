<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        Permission::findOrCreate('manage blogs');
        Permission::findOrCreate('manage users');

        // Create roles and assign existing permissions
        $adminRole = Role::findOrCreate('admin');
        $adminRole->givePermissionTo(['manage blogs', 'manage users']);

        $moderatorRole = Role::findOrCreate('moderator');
        $moderatorRole->givePermissionTo('manage blogs');

        $userRole = Role::findOrCreate('user');
        // Users have no special permissions by default
    }
}
