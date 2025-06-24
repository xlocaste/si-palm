<?php

namespace App\Http\Controllers;

use App\Http\Requests\Invoice\UpdateRequest;
use App\Models\Invoice;
use App\Models\Kontrak;
use App\Models\Ttd;
use Illuminate\Database\QueryException;
use Inertia\Inertia;
use App\Http\Requests\Invoice\StoreRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        $queryInvoiceCPO = Invoice::with('kontrak')
            ->whereHas('kontrak', function ($query) use ($request) {
                $query->where('jenis_kontrak', 'CPO');

                if ($request->has('search') && $request->search) {
                    $searchTerm = '%' . $request->search . '%';
                    $query->where('no_kontrak', 'like', $searchTerm);
                }
            });

        $queryInvoicePK = Invoice::with('kontrak')
            ->whereHas('kontrak', function ($query) use ($request) {
                $query->where('jenis_kontrak', 'PK');

                if ($request->has('search') && $request->search) {
                    $searchTerm = '%' . $request->search . '%';
                    $query->where('no_kontrak', 'like', $searchTerm);
                }
            });

        $daftarInvoiceCPO = $queryInvoiceCPO->get();
        $daftarInvoicePK = $queryInvoicePK->get();

        if ($request->has('export_pdf') && $request->export_pdf === 'true') {
            $jenis = $request->jenis ?? 'all';

            $pdf = Pdf::loadView('pdf.invoice_list', [
                'invoiceCPO' => $jenis == 'pk' ? [] : $daftarInvoiceCPO,
                'invoicePK' => $jenis == 'cpo' ? [] : $daftarInvoicePK,
                'filter' => [
                    'search' => $request->search,
                    'jenis' => $jenis,
                ]
            ]);
            return $pdf->download('daftar_invoice.pdf');
        }

        return Inertia::render('Invoice/List', [
            'InvoiceCPO' => $daftarInvoiceCPO,
            'InvoicePK' => $daftarInvoicePK,
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
        $kontrak = Kontrak::find($request->kontrak_id);

        $nilai = $kontrak->harga * $kontrak->volume;

        $ppn = ($kontrak->ppn / 100) * $nilai;

        $jumlah = $nilai + $ppn;

        Invoice::create([
            'kontrak_id' => $kontrak->id,
            'nilai' => $nilai,
            'ppn' => $ppn,
            'jumlah' => $jumlah,
            'terbilang' => $request->terbilang,
            'no_invoice' => $request->no_invoice,
            'tanggal_bayar' => $request->tanggal_bayar,
        ]);

        return redirect()->route('invoice.index');
    }

    public function Update(UpdateRequest $request, Invoice $invoice)
    {
        $invoice->Update([
            'no_invoice' => $request->no_invoice,
            'tanggal_bayar' => $request->tanggal_bayar,
            'nilai' => $request->nilai,
        ]);

        return redirect()->route('invoice.index');
    }

    public function destroy(Invoice $invoice)
    {
        try {
            $invoice->delete();
            return Redirect::route('invoice.index')->with('success', 'Invoice berhasil dihapus.');
        } catch (\Illuminate\Database\QueryException $e) {
            if ($e->getCode() == 23000) {
                return Redirect::back()->with('error', 'Gagal menghapus. Invoice sedang digunakan pada data lain.');
            }

            return Redirect::back()->with('error', 'Terjadi kesalahan saat menghapus invoice.');
        }
    }

    public function show(Invoice $invoice)
    {
        $invoice->load([
            'kontrak',
        ]);

        return Inertia::render('Invoice/Detail', [
            'Invoice' => $invoice
        ]);
    }

    public function create()
    {
        $kontrak = Kontrak::all();

        return Inertia::render('Invoice/Add', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'kontrak' => $kontrak,
        ]);
    }

    public function edit(Invoice $invoice)
    {
        return Inertia::render('$invoice/Update', [
            'invoice' => $invoice
        ]);
    }

    public function print($invoice)
    {
        $invoice = Invoice::with('kontrak')->findOrFail($invoice);
        $ttd = Ttd::latest()->first();

        $pdf = Pdf::loadView('pdf.invoice_detail', compact('invoice', 'ttd'));
        return $pdf->stream("invoice_" . preg_replace('/[\/\\\\]/', '-', $invoice->no_invoice).".pdf");
    }
}
