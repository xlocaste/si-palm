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
    
    public function showCPO()
    {
        $kontrakCPO = Kontrak::where('jenis_kontrak', 'CPO')
                        ->get();
        
        return Inertia::render('Detail/CPO/List', [
            'kontrakCPO' => $kontrakCPO,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function showPK()
    {
        $kontrakPK = Kontrak::where('jenis_kontrak', 'PK')
                        ->get();
        
        return Inertia::render('Detail/PK/List', [
            'kontrakPK' => $kontrakPK,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
    
    public function tempoPenyerahan(Request $request)
    {
        $jenis = $request->jenis_tempo_penyerahan;

        $query = Kontrak::query();

        if (!empty($jenis)) {
            $query->where('jenis_tempo_penyerahan', $jenis);
        }

        $kontrak = $query->get();

        return Inertia::render('TempoPenyerahan/List', [
            'Kontrak' => $kontrak,
            'jenis_tempo_penyerahan' => $jenis,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }

    public function store(StoreRequest $request)
    {
        // Menambahkan field baru saat menyimpan kontrak
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

    public function destroy(Kontrak $kontrak)
    {
        $kontrak->delete();

        return Redirect::route('kontrak.index')->with('message', 'Data berhasil dihapus');
    }

    public function edit(Kontrak $Kontrak)
    {
        return Inertia::render('Kontrak/Update', [
            'kontrak'=> $Kontrak
        ]);
    }

    public function create()
    {
        $pembayaran = Pembayaran::all();

        return Inertia::render('Kontrak/Add', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'pembayaran' => $pembayaran,
        ]);
    }
}
