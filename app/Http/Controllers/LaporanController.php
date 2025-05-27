<?php

namespace App\Http\Controllers;

use App\Models\Kontrak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LaporanController extends Controller
{
    public function index()
    {
        $kontrak = Kontrak::with(['invoices', 'salesOrder', 'realisasiPenyerahan'])->get();

        return Inertia::render('Laporan/List', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'kontrak' => $kontrak,
        ]);
    }

    public function show(Kontrak $kontrak)
    {
        $kontrak->load([
            'invoices',
            'salesOrder',
            'realisasiPenyerahan',
        ]);

        return Inertia::render('Laporan/Detail', [
            'Kontrak' => $kontrak,
        ]);
    }
}
