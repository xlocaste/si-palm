<?php

namespace App\Http\Controllers;

use App\Http\Requests\RealisasiPenyerahan\StoreRequest;
use App\Http\Requests\RealisasiPenyerahan\UpdateRequest;
use App\Models\Invoice;
use App\Models\Kontrak;
use App\Models\RealisasiPenyerahan;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class RealisasiPenyerahanController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = $request->search;

        $queryCPO = RealisasiPenyerahan::with('kontrak', 'invoice')
            ->whereHas('kontrak', function ($query) {
                $query->where('jenis_kontrak', 'CPO');
            });

        $queryPK = RealisasiPenyerahan::with('kontrak', 'invoice')
            ->whereHas('kontrak', function ($query) {
                $query->where('jenis_kontrak', 'PK');
            });

        if ($searchTerm) {
            $likeSearch = '%' . $searchTerm . '%';

            $queryCPO->where(function ($q) use ($likeSearch) {
                $q->where('no_ba', 'like', $likeSearch)
                ->orWhere('no_surat_penerbitan_invoice', 'like', $likeSearch)
                ->orWhereHas('kontrak', function ($k) use ($likeSearch) {
                    $k->where('no_kontrak', 'like', $likeSearch);
                });
            });

            $queryPK->where(function ($q) use ($likeSearch) {
                $q->where('no_ba', 'like', $likeSearch)
                ->orWhere('no_surat_penerbitan_invoice', 'like', $likeSearch)
                ->orWhereHas('kontrak', function ($k) use ($likeSearch) {
                    $k->where('no_kontrak', 'like', $likeSearch);
                });
            });
        }

        $daftarRealisasiPenyerahanCPO = $queryCPO->get();
        $daftarRealisasiPenyerahanPK = $queryPK->get();

        if ($request->has('export_pdf') && $request->export_pdf === 'true') {
            $pdf = Pdf::loadView('pdf.realisasi_penyerahan_list', [
                'realisasiPenyerahanCPO' => $daftarRealisasiPenyerahanCPO,
                'realisasiPenyerahanPK' => $daftarRealisasiPenyerahanPK,
                'filter' => [
                    'search' => $request->search
                ]
            ]);
            return $pdf->download('daftar_realisasi_penyerahan.pdf');
        }

        return Inertia::render('RealisasiPenyerahan/List', [
            'realisasiPenyerahanCPO' => $daftarRealisasiPenyerahanCPO,
            'realisasiPenyerahanPK' => $daftarRealisasiPenyerahanPK,
            'filters' => [
                'search' => $request->search,
            ],
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
        try {
        $realisasiPenyerahan->delete();

            return Redirect::route('realisasi-penyerahan.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (QueryException $e) {
            return Redirect::route('realisasi-penyerahan.index')
                ->with('error', 'Gagal menghapus: Data sedang digunakan di tabel lain.');
        }
    }

    public function show(RealisasiPenyerahan $realisasiPenyerahan)
    {
        $realisasiPenyerahan->load([
            'kontrak',
            'invoice',
        ]);

        return Inertia::render('RealisasiPenyerahan/Detail', [
            'RealisasiPenyerahan' => $realisasiPenyerahan
        ]);
    }

    public function edit(RealisasiPenyerahan $realisasiPenyerahan)
    {
        return Inertia::render('RealisasiPenyerahan/Update', [
            'realisasiPenyerahan' => $realisasiPenyerahan,
            'kontrak' => Kontrak::all(),
            'invoice' => Invoice::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('RealisasiPenyerahan/Add', [
            'kontrak' => Kontrak::all(),
            'invoice' => Invoice::with('kontrak')->get(),
        ]);
    }

    public function printSingle(RealisasiPenyerahan $realisasiPenyerahan)
    {
        $realisasiPenyerahan->load(['kontrak.pembayaran',
         'invoice',
        'salesOrder',
        'kontrak.salesOrder'
    ]);

        $pdf = Pdf::loadView('pdf.realisasi_penyerahan_single', [
            'realisasiPenyerahan' => $realisasiPenyerahan
        ]);

        return $pdf->stream('realisasi_penyerahan_' . preg_replace('/[\/\\\\]/', '-', $realisasiPenyerahan->no_ba). '.pdf');
    }
}
