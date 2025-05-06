<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesOrder\StoreRequest;
use App\Http\Requests\SalesOrder\UpdateRequest;
use App\Models\Kontrak;
use App\Models\SalesOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Barryvdh\DomPDF\Facade\Pdf;

class SalesOrderController extends Controller
{
    /**
     * Menampilkan semua data sales order.
     */
    public function index(Request $request)
    {
        $query = SalesOrder::with('kontrak');

        // Filter berdasarkan pencarian
        if ($request->has('search') && $request->search) {
            $searchTerm = '%' . $request->search . '%';
            $query->where('no_sales_order', 'like', $searchTerm);
        }

        $daftarSalesOrder = $query->get();

        // Jika request untuk PDF
        if ($request->has('export_pdf') && $request->export_pdf === 'true') {
            $pdf = Pdf::loadView('pdf.sales_order_list', [
                'salesOrders' => $daftarSalesOrder,
                'filter' => [
                    'search' => $request->search
                ]
            ]);
            return $pdf->download('daftar_sales_order.pdf');
        }

        return Inertia::render('SalesOrder/List', [
            'SalesOrder' => $daftarSalesOrder,
            'filters' => [
                'search' => $request->search,
            ],
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

    /**
     * Menampilkan form tambah sales order.
     */
    public function create()
    {
        return Inertia::render('SalesOrder/Add', [
            'auth' => [
                'user' => auth()->user(),
            ],
            'kontrak' => Kontrak::all(),
        ]);
    }

    public function store(StoreRequest $request)
    {
        $kontrak = Kontrak::find($request->kontrak_id);

        $nilai = $kontrak->harga * $request->volume_sales_order;

        $SalesOrder = SalesOrder::create([
            'kontrak_id' => $kontrak->id,
            'nilai' => $nilai,
            'no_sales_order' => $request->no_sales_order,
            'tanggal_sales_order' => $request->tanggal_sales_order,
            'tahap' => $request->tahap,
            'volume_sales_order' => $request->volume_sales_order,
        ]);

        return redirect()->route('sales-order.index');
    }

    public function Update(UpdateRequest $request, SalesOrder $salesOrder)
    {
        $salesOrder->Update([
            'no_sales_order' => $request->no_sales_order,
            'tanggal_sales_order' => $request->tanggal_sales_order,
            'tahap' => $request->tahap,
            'volume_sales_order' => $request->volume_sales_order,
            'nilai' => $request->nilai,
        ]);

        return redirect()->route('sales-order.index');
    }

    public function destroy(SalesOrder $salesOrder)
    {
        $salesOrder->delete();

        return Redirect::route('sales-order.index')->with('message', 'Data berhasil dihapus');
    }

    public function edit(SalesOrder $salesOrder)
    {
        return Inertia::render('SalesOrder/Update', [
            'salesOrder' => $salesOrder
        ]);
    }

    /**
     * Mencetak Sales Order secara individual sebagai PDF
     */
    public function printSingle(SalesOrder $salesOrder)
    {
        $salesOrder->load('kontrak');

        $pdf = Pdf::loadView('pdf.sales_order_single', [
            'salesOrder' => $salesOrder
        ]);

        return $pdf->stream('sales_order_' . $salesOrder->no_sales_order . '.pdf');
    }
}
