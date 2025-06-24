<?php

namespace App\Http\Controllers;

use App\Models\Kontrak;
use App\Models\Ttd;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use iio\libmergepdf\Merger;

class LaporanController extends Controller
{
    public function index(Request $request)
    {
        $query = Kontrak::with(['invoices', 'salesOrder', 'realisasiPenyerahan']);

        if ($request->filled('bulan')) {
            $query->whereMonth('tanggal_kontrak', $request->bulan);
        }

        $kontrak = $query->get();

        return Inertia::render('Laporan/List', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'kontrak' => $kontrak,
            'filters' => [
                'bulan' => $request->bulan,
                'tahun' => $request->tahun,
            ],
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

    public function merge($kontrak)
    {
        $kontrak = Kontrak::with(['pembayaran', 'invoices', 'salesOrder', 'realisasiPenyerahan'])->findOrFail($kontrak);

        $ttd = Ttd::latest()->first();

        if ($kontrak->jenis_kontrak === 'CPO') {
            $pdfKontrak = Pdf::loadView('pdf.kontrak_cpo_single', compact('kontrak'))->output();
        } elseif ($kontrak->jenis_kontrak === 'PK') {
            $pdfKontrak = Pdf::loadView('pdf.kontrak_pk_single', compact('kontrak'))->output();
        } else {
            abort(404, 'Jenis kontrak tidak valid');
        }

        $merger = new Merger();
        $merger->addRaw($pdfKontrak);

        foreach ($kontrak->invoices as $invoice) {
            $pdfInvoice = Pdf::loadView('pdf.invoice_detail', compact('invoice', 'ttd'))->output();
            $merger->addRaw($pdfInvoice);
        }

        foreach ($kontrak->salesOrder as $salesOrder) {
            $pdfSalesOrder = Pdf::loadView('pdf.sales_order_single', compact('salesOrder', 'ttd'))->output();
            $merger->addRaw($pdfSalesOrder);
        }

        foreach ($kontrak->realisasiPenyerahan as $realisasiPenyerahan) {
            $pdfRealisasi = Pdf::loadView('pdf.realisasi_penyerahan_single', compact('realisasiPenyerahan', 'ttd'))->output();
            $merger->addRaw($pdfRealisasi);
        }

        $gabungan = $merger->merge();

        $filename = 'laporan_kontrak_' . $kontrak->id . '.pdf';

        return response($gabungan)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . $filename . '"');
    }
}
