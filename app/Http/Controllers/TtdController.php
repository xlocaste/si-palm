<?php

namespace App\Http\Controllers;

use App\Http\Requests\Ttd\UpdateRequest;
use App\Models\Ttd;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TtdController extends Controller
{
    public function index()
    {
        $ttd = Ttd::latest()->first();

        return Inertia::render('Ttd/List', [
            'auth' => [
                'user' => Auth::user(),
            ],
            'ttd' => $ttd,
        ]);
    }

    public function update(UpdateRequest $request, Ttd $ttd)
    {
        $ttd->update([
            'sevp' => $request->sevp,
            'ksbl' => $request->ksbl,
            'kbpt' => $request->kbpt,
        ]);

        return redirect()->back()->with('message', 'Data tanda tangan berhasil diperbarui.');
    }
}
