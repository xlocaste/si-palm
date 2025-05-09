<?php

namespace App\Http\Controllers;

use App\Models\Kontrak;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class JatuhTempoController extends Controller
{
    public function index()
    {
        $today = Carbon::today();
        $fifteenDaysLater = Carbon::today()->addDays(15);

        $notifikasi = Kontrak::whereDate('jatuh_tempo', '>=', $today)
            ->whereDate('jatuh_tempo', '<=', $fifteenDaysLater)
            ->get();
        $semuaKontrak = Kontrak::with('pembayaran')->get();

        return Inertia::render('JatuhTempo/List', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'notifikasi' => $notifikasi,
            'kontrak' => $semuaKontrak,
        ]);

    }
}
