<?php

namespace App\Http\Requests\Kontrak;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'no_kontrak'=>['required'],
            'pembeli'=>['required'],
            'mutu'=>['required'],
            'harga'=>['required'],
            'volume'=>['required'],
            'tanggal_kontrak'=>['required'],
            'jenis_tempo_penyerahan'=>['required', 'in:bid_offer,tender'],
            'jenis_kontrak'=>['required', 'in:CPO,PK'],
        ];
    }
}
