<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        //
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@codingoblin.com',
                'password' => 'password',
                'role' => 'admin',
            ],
            [
                'name' => 'John',
                'email' => 'john@codingoblin.com',
                'password' => 'password2',
                'role' => 'user',
            ]
        ];

        foreach ($users as $user) {
            $created_user = User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => bcrypt($user['password']),
            ]);

            $created_user->assignRole($user['role']);
        }
    }

}