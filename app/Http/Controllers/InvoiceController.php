<?php

namespace App\Http\Controllers;

use App\Http\Requests\Invoice\UpdateRequest;
use App\Models\Invoice;
use App\Models\Kontrak;
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
            ->whereHas('kontrak', function ($query) {
                $query->where('jenis_kontrak', 'CPO');
            });

        $queryInvoicePK = Invoice::with('kontrak')
            ->whereHas('kontrak', function ($query) {
                $query->where('jenis_kontrak', 'PK');
            });

        if ($request->has('search') && $request->search) {
            $searchTerm = '%' . $request->search . '%';
            $queryInvoiceCPO->where('no_invoice', 'like', $searchTerm);
            $queryInvoicePK->where('no_invoice', 'like', $searchTerm);
        }

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
        $invoice->delete();

        return Redirect::route('invoice.index')->with('message', 'Data berhasil dihapus');
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

        $pdf = Pdf::loadView('pdf.invoice_detail', compact('invoice'));
        return $pdf->stream("invoice_" . preg_replace('/[\/\\\\]/', '-', $invoice->no_invoice).".pdf");
    }
}
