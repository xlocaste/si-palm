<?php

namespace App\Http\Controllers;

use App\Enums\MetodeEnum;
use App\Models\Pembayaran;
use App\Models\Kontrak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    public function index()
    {
        $pembayaran = Pembayaran::with('kontrak')->get();

        return Inertia::render('Pembayaran/List', [
            'Pembayaran' => $pembayaran,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Pembayaran/Add');
    }

    public function store(Request $request)
    {
        $request->validate([
            'metode' => ['required', new Enum(MetodeEnum::class)],
            'nama_bank' => 'nullable',
            'cara_pembayaran' => 'required',
            'atas_nama' => 'required',
            'rek_no' => 'required',
            'jatuh_tempo_pembayaran' => 'nullable|date',
            'kontrak_id' => 'nullable|exists:kontrak,id',
        ]);

        Pembayaran::create($request->all());

        return redirect()->route('pembayaran.index')->with('success', 'Data pembayaran berhasil disimpan.');
    }
}
