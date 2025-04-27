<?php

namespace App\Http\Requests\RealisasiPenyerahan;

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
            'kontrak_id' => ['required', 'exists:kontrak,id'],
            'invoice_id' => ['required', 'exists:invoice,id'],
            'tanggal_serah' => ['required', 'date'],
            'alb' => ['nullable', 'numeric', 'between:0,100'],
            'ka' => ['nullable', 'numeric', 'between:0,100'],
            'kk' => ['nullable', 'numeric', 'between:0,100'],
            'no_ba' => ['nullable', 'string'],
            'no_surat_penerbitan_invoice' => ['nullable', 'string'],
            'tanggal_surat_invoice' => ['nullable', 'date'],
        ];
    }
}
