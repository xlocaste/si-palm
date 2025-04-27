<?php

namespace App\Http\Controllers;

use App\Http\Requests\Invoice\UpdateRequest;
use App\Models\Invoice;
use App\Models\Kontrak;
use Inertia\Inertia;
use App\Http\Requests\Invoice\StoreRequest;
use Redirect;

class InvoiceController extends Controller
{
    public function index()
    {
        $daftarInvoiceCPO = Invoice::with('kontrak')
        ->whereHas('kontrak', function ($query) {
            $query->where('jenis_kontrak', 'CPO');
        })
        ->get();
        $daftarInvoicePK = Invoice::with('kontrak')
        ->whereHas('kontrak', function ($query) {
            $query->where('jenis_kontrak', 'PK');
        })
        ->get();

        return Inertia::render('Invoice/List', [
            'InvoiceCPO' => $daftarInvoiceCPO,
            'InvoicePK' => $daftarInvoicePK,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    
    public function store(StoreRequest $request)
    {
        $kontrak = Kontrak::find($request->kontrak_id);

        $nilai = $kontrak->harga * $kontrak->volume;
        
        Invoice::create([
            'kontrak_id' => $kontrak->id,
            'nilai' => $nilai,
            'no_invoice'    => $request->no_invoice,
            'tanggal_bayar' => $request->tanggal_bayar,
        ]);
        
        return redirect()->route('invoice.index');
    }
    
    public function Update(UpdateRequest $request, Invoice $invoice)
    {
        $invoice->Update([
            'no_invoice'    => $request->no_invoice,
            'tanggal_bayar' => $request->tanggal_bayar,
            'nilai'         => $request->nilai,
        ]);
        
        return redirect()->route('invoice.index');
    }
    
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return Redirect::route('invoice.index')->with('message', 'Data berhasil dihapus');
    }
    
    public function create()
    {
        return Inertia::render('Invoice/Add', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'kontrak' => Kontrak::all(),
        ]);
    }
    public function edit(Invoice $invoice)
    {
        return Inertia::render('$invoice/Update', [
            'invoice'=> $invoice
        ]);
    }

    

}
