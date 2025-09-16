<?php

namespace Database\Seeders;

use App\Models\Etiquette;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EtiquetteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $etiquettes = [
            [
                'name' => 'My Events',
                'color' => 'emerald',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Marketing Team',
                'color' => 'orange',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Interviews',
                'color' => 'violet',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'Events Planning',
                'color' => 'blue',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'Holidays',
                'color' => 'rose',
                'is_active' => true,
                'sort_order' => 5,
            ],
        ];

        foreach ($etiquettes as $etiquette) {
            Etiquette::create($etiquette);
        }
    }
}
