<?php

namespace App\Http\Controllers;

use App\Http\Requests\RealisasiPenyerahan\StoreRequest;
use App\Http\Requests\RealisasiPenyerahan\UpdateRequest;
use App\Models\Invoice;
use App\Models\Kontrak;
use App\Models\RealisasiPenyerahan;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class RealisasiPenyerahanController extends Controller
{
    public function index()
    {
        $daftarRealisasiPenyerahan = RealisasiPenyerahan::with('kontrak', 'invoice')->get();

        return Inertia::render('RealisasiPenyerahan/List', [
            'realisasiPenyerahan' => $daftarRealisasiPenyerahan,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        RealisasiPenyerahan::create([
            'kontrak_id' => $request->kontrak_id,
            'invoice_id' => $request->invoice_id,
            'tanggal_serah' => $request->tanggal_serah,
            'alb' => $request->alb,
            'ka' => $request->ka,
            'kk' => $request->kk,
            'no_ba' => $request->no_ba,
            'no_surat_penerbitan_invoice' => $request->no_surat_penerbitan_invoice,
            'tanggal_surat_invoice' => $request->tanggal_surat_invoice,
        ]);

        return redirect()->route('realisasi-penyerahan.index');
    }

    public function update(UpdateRequest $request, RealisasiPenyerahan $realisasiPenyerahan)
    {
        $realisasiPenyerahan->update([
            'kontrak_id' => $request->kontrak_id,
            'invoice_id' => $request->invoice_id,
            'tanggal_serah' => $request->tanggal_serah,
            'alb' => $request->alb,
            'ka' => $request->ka,
            'kk' => $request->kk,
            'no_ba' => $request->no_ba,
            'no_surat_penerbitan_invoice' => $request->no_surat_penerbitan_invoice,
            'tanggal_surat_invoice' => $request->tanggal_surat_invoice,
        ]);

        return redirect()->route('realisasi-penyerahan.index');
    }

    public function destroy(RealisasiPenyerahan $realisasiPenyerahan)
    {
        $realisasiPenyerahan->delete();

        return Redirect::route('realisasi-penyerahan.index')->with('message', 'Data berhasil dihapus');
    }

    public function edit(RealisasiPenyerahan $realisasiPenyerahan)
    {
        return Inertia::render('RealisasiPenyerahan/Update', [
            'realisasiPenyerahan'=> $realisasiPenyerahan,
            'kontrak' => Kontrak::all(),
            'invoice' => Invoice::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('RealisasiPenyerahan/Add', [
            'kontrak' => Kontrak::all(),
            'invoice' => Invoice::all(),
        ]);
    }
}
