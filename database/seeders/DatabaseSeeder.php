<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // default user for testing purposes
        User::firstOrCreate(
            [
                'email' => 'test@example.com',
            ],
            [
                'name' => 'Test User',
                'email_verified_at' => now(),
                'password' => bcrypt('password'),
            ]
        );

        // calls the Seeders
        $this->call([
            UserSeeder::class, // Call the UserSeeder to seed users
            CategorySeeder::class, // Call the CategorySeeder to seed categories
            ProductSeeder::class, // Call the ProductSeeder to seed products
        ]);
    }
}
