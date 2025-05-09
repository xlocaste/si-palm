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
        $kontrak = Kontrak::doesntHave('pembayaran')->get();

        return Inertia::render('Pembayaran/Add', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'kontrak' => $kontrak,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'metode' => ['required', new Enum(MetodeEnum::class)],
            'nama_bank' => 'required',
            'cara_pembayaran' => 'required',
            'atas_nama' => 'required',
            'rek_no' => 'required',
            'jatuh_tempo_pembayaran' => 'nullable|date',
            'kontrak_id' => 'required|exists:kontrak,id|unique:pembayaran,kontrak_id',
        ]);

        Pembayaran::create($request->all());

        return redirect()->route('pembayaran.index')->with('success', 'Data pembayaran berhasil disimpan.');
    }
}
