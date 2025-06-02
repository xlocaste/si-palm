<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BukuController extends Controller
{
    public function index()
    {
        $daftarBuku = Buku::all();

         return Inertia::render('Buku/List', [
            'buku' =>$daftarBuku 
        ]);


    }
}
