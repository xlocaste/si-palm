<?php

namespace App\Http\Controllers;

use App\Http\Requests\Kontrak\StoreRequest;
use App\Http\Requests\Kontrak\UpdateRequest;
use App\Models\Kontrak;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class KontrakController extends Controller
{
    public function index()
    {
        $kontrakCPO = Kontrak::where('jenis_kontrak', 'CPO')->get();
        $kontrakPK = Kontrak::where('jenis_kontrak', 'PK')->get();

        return Inertia::render('Kontrak/List', [
            'kontrakCPO' => $kontrakCPO,
            'kontrakPK' => $kontrakPK,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function showCPO(Request $request)
    {
        $query = Kontrak::where('jenis_kontrak', 'CPO');

        if ($request->has('search') && $request->search) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('no_kontrak', 'like', $searchTerm)
                    ->orWhere('pembeli', 'like', $searchTerm)
                    ->orWhere('mutu', 'like', $searchTerm);
            });
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('tanggal_kontrak', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('tanggal_kontrak', '<=', $request->date_to);
        }

        if ($request->has('harga_from') && $request->harga_from) {
            $query->where('harga', '>=', $request->harga_from);
        }

        if ($request->has('harga_to') && $request->harga_to) {
            $query->where('harga', '<=', $request->harga_to);
        }

        $kontrakCPO = $query->get();

        if ($request->has('export_pdf') && $request->export_pdf === 'true') {
            $pdf = Pdf::loadView('pdf.kontrak_cpo', [
                'kontrakCPO' => $kontrakCPO,
                'filter' => [
                    'search' => $request->search,
                    'date_from' => $request->date_from,
                    'date_to' => $request->date_to,
                    'harga_from' => $request->harga_from,
                    'harga_to' => $request->harga_to,
                ]
            ]);
            return $pdf->download('kontrak_cpo.pdf');
        }
        return Inertia::render('Detail/CPO/List', [
            'kontrakCPO' => $kontrakCPO,
            'filters' => [
                'search' => $request->search,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
                'harga_from' => $request->harga_from,
                'harga_to' => $request->harga_to,
            ],
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function showPK(Request $request)
    {
        $query = Kontrak::where('jenis_kontrak', 'PK');

        if ($request->has('search') && $request->search) {
            $searchTerm = '%' . $request->search . '%';
            $query->where(function ($q) use ($searchTerm) {
                $q->where('no_kontrak', 'like', $searchTerm)
                    ->orWhere('pembeli', 'like', $searchTerm)
                    ->orWhere('mutu', 'like', $searchTerm);
            });
        }

        if ($request->has('date_from') && $request->date_from) {
            $query->whereDate('tanggal_kontrak', '>=', $request->date_from);
        }

        if ($request->has('date_to') && $request->date_to) {
            $query->whereDate('tanggal_kontrak', '<=', $request->date_to);
        }

        if ($request->has('harga_from') && $request->harga_from) {
            $query->where('harga', '>=', $request->harga_from);
        }

        if ($request->has('harga_to') && $request->harga_to) {
            $query->where('harga', '<=', $request->harga_to);
        }

        $kontrakPK = $query->get();

        if ($request->has('export_pdf') && $request->export_pdf === 'true') {
            $pdf = Pdf::loadView('pdf.kontrak_pk', [
                'kontrakPK' => $kontrakPK,
                'filter' => [
                    'search' => $request->search,
                    'date_from' => $request->date_from,
                    'date_to' => $request->date_to,
                    'harga_from' => $request->harga_from,
                    'harga_to' => $request->harga_to,
                ]
            ]);
            return $pdf->download('kontrak_pk.pdf');
        }

        return Inertia::render('Detail/PK/List', [
            'kontrakPK' => $kontrakPK,
            'filters' => [
                'search' => $request->search,
                'date_from' => $request->date_from,
                'date_to' => $request->date_to,
                'harga_from' => $request->harga_from,
                'harga_to' => $request->harga_to,
            ],
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function tempoPenyerahan(Request $request)
    {
        $jenis = $request->jenis_tempo_penyerahan;

        $queryCPO = Kontrak::where('jenis_kontrak', 'CPO');
        $queryPK = Kontrak::where('jenis_kontrak', 'PK');

        if (!empty($jenis)) {
            $queryCPO->where('jenis_tempo_penyerahan', $jenis);
            $queryPK->where('jenis_tempo_penyerahan', $jenis);
        }

        $kontrakCPO = $queryCPO->get();
        $kontrakPK = $queryPK->get();

        return Inertia::render('TempoPenyerahan/List', [
            'kontrakCPO' => $kontrakCPO,
            'kontrakPK' => $kontrakPK,
            'jenis_tempo_penyerahan' => $jenis,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }


    public function store(StoreRequest $request)
    {
        $kontrak = Kontrak::create([
            'no_kontrak' => $request->no_kontrak,
            'penjual_dan_pemilik_komoditas' => $request->penjual_dan_pemilik_komoditas,
            'no_referensi' => $request->no_referensi,
            'komoditi' => $request->komoditi,
            'jenis_komoditi' => $request->jenis_komoditi,
            'symbol' => $request->symbol,
            'packaging' => $request->packaging,
            'deskripsi_produk' => $request->deskripsi_produk,
            'produsen' => $request->produsen,
            'pelabuhan_muat' => $request->pelabuhan_muat,
            'harga_satuan' => $request->harga_satuan,
            'ppn' => $request->ppn,
            'kondisi_penyerahan' => $request->kondisi_penyerahan,
            'pembayaran_id' => $request->pembayaran_id,
            'waktu_penyerahan' => $request->waktu_penyerahan,
            'syarat_lain' => $request->syarat_lain,
            'dasar_ketentuan' => $request->dasar_ketentuan,
            'jumlah_pembayaran' => $request->jumlah_pembayaran,
            'pembeli' => $request->pembeli,
            'mutu' => $request->mutu,
            'harga' => $request->harga,
            'volume' => $request->volume,
            'tanggal_kontrak' => $request->tanggal_kontrak,
            'jatuh_tempo' => $request->jatuh_tempo,
            'jenis_tempo_penyerahan' => $request->jenis_tempo_penyerahan,
            'jenis_kontrak' => $request->jenis_kontrak,
        ]);

        return redirect()->route('kontrak.index');
    }

    public function Update(UpdateRequest $request, Kontrak $kontrak)
    {
        $kontrak->update([
            'no_kontrak' => $request->no_kontrak,
            'penjual_dan_penjual_komoditas' => $request->penjual_dan_penjual_komoditas,
            'no_referensi' => $request->no_referensi,
            'komoditi' => $request->komoditi,
            'jenis_komoditi' => $request->jenis_komoditi,
            'symbol' => $request->symbol,
            'packaging' => $request->packaging,
            'deskripsi_produk' => $request->deskripsi_produk,
            'produsen' => $request->produsen,
            'pelabuhan_muat' => $request->pelabuhan_muat,
            'harga_satuan' => $request->harga_satuan,
            'ppn' => $request->ppn,
            'kondisi_penyerahan' => $request->kondisi_penyerahan,
            'pembayaran' => $request->pembayaran,
            'metode' => $request->metode,
            'nama_bank' => $request->nama_bank,
            'cara_pembayaran' => $request->cara_pembayaran,
            'atas_nama' => $request->atas_nama,
            'rek_no' => $request->rek_no,
            'waktu_penyerahan' => $request->waktu_penyerahan,
            'syarat_lain' => $request->syarat_lain,
            'dasar_ketentuan' => $request->dasar_ketentuan,
            'jumlah_pembayaran' => $request->jumlah_pembayaran,
            'pembeli' => $request->pembeli,
            'mutu' => $request->mutu,
            'harga' => $request->harga,
            'volume' => $request->volume,
            'tanggal_kontrak' => $request->tanggal_kontrak,
            'jatuh_tempo' => $request->jatuh_tempo,
            'jenis_tempo_penyerahan' => $request->jenis_tempo_penyerahan,
            'jenis_kontrak' => $request->jenis_kontrak,
        ]);

        return redirect()->route('kontrak.index');
    }

    public function destroy(Kontrak $kontrak)
    {
        $kontrak->delete();

        return Redirect::route('kontrak.index')->with('message', 'Data berhasil dihapus');
    }

    public function edit(Kontrak $Kontrak)
    {
        return Inertia::render('Kontrak/Update', [
            'kontrak' => $Kontrak
        ]);
    }

    public function create()
    {
        $pembayaran = Pembayaran::doesntHave('kontrak')->get();

        return Inertia::render('Kontrak/Add', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'pembayaran' => $pembayaran,
        ]);
    }

    public function printSingleCPO(Kontrak $kontrak)
    {
        if ($kontrak->jenis_kontrak !== 'CPO') {
            return redirect()->back()->with('error', 'Kontrak bukan tipe CPO');
        }

        $kontrak = Kontrak::with('pembayaran')->find($kontrak->id);

        $pdf = Pdf::loadView('pdf.kontrak_cpo_single', [
            'kontrak' => $kontrak
        ]);

        return $pdf->stream('kontrak_cpo_' . preg_replace('/[\/\\\\]/', '-', $kontrak->no_kontrak) . '.pdf');

    }

    public function printSinglePK(Kontrak $kontrak)
    {
        if ($kontrak->jenis_kontrak !== 'PK') {
            return redirect()->back()->with('error', 'Kontrak bukan tipe PK');
        }

        $kontrak = Kontrak::with('pembayaran')->find($kontrak->id);

        $pdf = Pdf::loadView('pdf.kontrak_pk_single', [
            'kontrak' => $kontrak
        ]);

        return $pdf->stream('kontrak_pk_' . preg_replace('/[\/\\\\]/', '-', $kontrak->no_kontrak) . '.pdf');
    }
}
