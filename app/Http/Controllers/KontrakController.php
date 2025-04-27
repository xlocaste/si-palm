<?php

namespace App\Http\Controllers;

use App\Http\Requests\Kontrak\StoreRequest;
use App\Http\Requests\Kontrak\UpdateRequest;
use App\Models\Kontrak;
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
        $kontrakCPO = Kontrak::where('jenis_kontrak', 'CPO')->get();
        
        return Inertia::render('Detail/CPO/List', [
            'kontrakCPO' => $kontrakCPO,
            'auth' => [
                'user' => Auth::user(),
            ],
        ]);
    }
    
    public function showPK()
    {
        $kontrakPK = Kontrak::where('jenis_kontrak', 'PK')->get();
        
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
        $kontrak = Kontrak::create([
            'no_kontrak'=>$request->no_kontrak,
            'jenis_kontrak'=>$request->jenis_kontrak,
            'pembeli'=>$request->pembeli,
            'mutu'=>$request->mutu,
            'harga'=>$request->harga,
            'volume'=>$request->volume,
            'tanggal_kontrak'=>$request->tanggal_kontrak,
            'jatuh_tempo'=>$request->jatuh_tempo,
            'jenis_tempo_penyerahan'=>$request->jenis_tempo_penyerahan,
        ]);

        return redirect()->route('kontrak.index');
    }

    public function Update(UpdateRequest $request, Kontrak $kontrak)
    {
        $kontrak->Update([
            'no_kontrak'=>$request->no_kontrak,
            'jenis_kontrak'=>$request->jenis_kontrak,
            'pembeli'=>$request->pembeli,
            'mutu'=>$request->mutu,
            'harga'=>$request->harga,
            'volume'=>$request->volume,
            'tanggal_kontrak'=>$request->tanggal_kontrak,
            'jatuh_tempo'=>$request->jatuh_tempo,
            'jenis_tempo_penyerahan'=>$request->jenis_tempo_penyerahan,
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
        return Inertia::render('Kontrak/Add');
    }
}
