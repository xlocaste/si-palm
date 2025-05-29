<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalesOrder\StoreRequest;
use App\Http\Requests\SalesOrder\UpdateRequest;
use App\Models\Kontrak;
use App\Models\SalesOrder;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Barryvdh\DomPDF\Facade\Pdf;

class SalesOrderController extends Controller
{
    public function index(Request $request)
    {
        $searchTerm = $request->search;

        $salesOrderCPO = SalesOrder::whereHas('kontrak', function ($query) {
                $query->where('jenis_kontrak', 'CPO');
            })
            ->with('kontrak')
            ->when($searchTerm, function ($query, $searchTerm) {
                $query->where('no_sales_order', 'like', '%' . $searchTerm . '%');
            })
            ->get();

        $salesOrderPK = SalesOrder::whereHas('kontrak', function ($query) {
                $query->where('jenis_kontrak', 'PK');
            })
            ->with('kontrak')
            ->when($searchTerm, function ($query, $searchTerm) {
                $query->where('no_sales_order', 'like', '%' . $searchTerm . '%');
            })
            ->get();

        if ($request->has('export_pdf') && $request->export_pdf === 'true') {
            $pdf = Pdf::loadView('pdf.sales_order_by_kontrak', [
                'salesOrderCPO' => $salesOrderCPO,
                'salesOrderPK' => $salesOrderPK,
                'filter' => [
                    'search' => $searchTerm,
                ]
            ]);
            return $pdf->download('daftar_sales_order_by_kontrak.pdf');
        }

        return Inertia::render('SalesOrder/List', [
            'salesOrderCPO' => $salesOrderCPO,
            'salesOrderPK' => $salesOrderPK,
            'filters' => [
                'search' => $searchTerm,
            ],
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }

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
        try {
            $salesOrder->delete();

            return Redirect::route('sales-order.index')
                ->with('success', 'Data Sales Order berhasil dihapus');
        } catch (QueryException $e) {
            if ($e->getCode() === '23000') {
                return Redirect::route('sales-order.index')
                    ->with('error', 'Gagal menghapus: Data sedang digunakan di tabel lain.');
            }

            return Redirect::route('sales-order.index')
                ->with('error', 'Terjadi kesalahan saat menghapus data.');
        }
    }

    public function show(SalesOrder $salesOrder)
    {
        $salesOrder->load([
            'kontrak',
        ]);

        return Inertia::render('SalesOrder/Detail', [
            'SalesOrder' => $salesOrder
        ]);
    }


    public function edit(SalesOrder $salesOrder)
    {
        return Inertia::render('SalesOrder/Update', [
            'salesOrder' => $salesOrder
        ]);
    }

    public function printSingle(SalesOrder $salesOrder)
    {
        $salesOrder->load('kontrak.pembayaran');

        $pdf = Pdf::loadView('pdf.sales_order_single', [
            'salesOrder' => $salesOrder
        ]);

        return $pdf->stream('sales_order_' . preg_replace('/[\/\\\\]/', '-',  $salesOrder->no_sales_order ). '.pdf');
    }
}
