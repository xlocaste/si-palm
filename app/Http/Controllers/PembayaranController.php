<?php

namespace App\Http\Controllers;

use App\Enums\MetodeEnum;
use App\Http\Requests\Pembayaran\StoreRequest;
use App\Http\Requests\Pembayaran\UpdateRequest;
use App\Models\Pembayaran;
use App\Models\Kontrak;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
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

    public function store(StoreRequest $request)
    {
        $filePath = null;
        if ($request->hasFile('file')) {
            $filePath = $request->file('file')->store('pembayaran', 'public');
        }

        Pembayaran::create([
            'file' => $filePath,
        ]);

        return redirect()->route('pembayaran.index')->with('success', 'Data pembayaran berhasil disimpan.');
    }

    public function edit(Pembayaran $pembayaran)
    {
        $kontrak = Kontrak::doesntHave('pembayaran')->get();

        return Inertia::render('Pembayaran/Update', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'kontrak' => $kontrak,
            'pembayaran' => $pembayaran,
        ]);
    }

    public function update(UpdateRequest $request, Pembayaran $pembayaran)
    {
        $pembayaran->update([
            'metode' => $request->metode,
            'nama_bank' => $request->nama_bank,
            'cara_pembayaran' => $request->cara_pembayaran,
            'atas_nama' => $request->atas_nama,
            'rek_no' => $request->rek_no,
            'jatuh_tempo_pembayaran' => $request->jatuh_tempo_pembayaran,
            'kontrak_id' => $request->kontrak_id,
        ]);

        return redirect()->route('pembayaran.index')->with('success', 'Data pembayaran berhasil disimpan.');
    }

    public function destroy(Pembayaran $pembayaran)
    {
        $pembayaran->delete();

        return Redirect::route('pembayaran.index')->with('message', 'Data berhasil dihapus');
    }
}
