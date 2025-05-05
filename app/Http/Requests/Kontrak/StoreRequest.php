<?php

namespace App\Http\Requests\Kontrak;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'no_kontrak' => ['required'],
            'penjual_dan_pemilik_komoditas' => ['required'],
            'no_referensi' => ['required'],
            'komoditi' => ['required'],
            'jenis_komoditi' => ['required'],
            'symbol' => ['required'],
            'packaging' => ['required'],
            'deskripsi_produk' => ['required'],
            'produsen' => ['required'],
            'pelabuhan_muat' => ['required'],
            'harga_satuan' => ['required', 'numeric'],
            'ppn' => ['required'],
            'kondisi_penyerahan' => ['required'],
            'pembayaran' => ['required'],
            'metode' => ['required'],
            'nama_bank' => ['required'],
            'cara_pembayaran' => ['required'],
            'atas_nama' => ['required'],
            'rek_no' => ['required'],
            'waktu_penyerahan' => ['nullable', 'date'],
            'syarat_lain' => ['required'],
            'dasar_ketentuan' => ['required'],
            'jumlah_pembayaran' => ['required'],
            'pembeli' => ['required'],
            'mutu' => ['required', 'numeric'],
            'harga' => ['required', 'numeric'],
            'volume' => ['required', 'numeric'],
            'tanggal_kontrak' => ['required', 'date'],
            'jatuh_tempo' => ['required', 'date'],
            'jenis_tempo_penyerahan' => ['required', 'in:bid_offer,tender'],
            'jenis_kontrak' => ['required', 'in:CPO,PK'],
        ];
    }
}
