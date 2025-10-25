<?php

namespace Database\Seeders\RBAC;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Admin Role
        Role::firstOrCreate(['name' => 'admin']);

        //Professor Role
        Role::firstOrCreate(['name' => 'professor']);
    }
}
