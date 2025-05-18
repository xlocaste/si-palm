<?php

namespace App\Http\Requests\Invoice;

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
            'no_invoice'=>['required'],
            'tanggal_bayar'=>['required'],
            'nilai'=>['required'],
            'ppn'=>['required'],
            'terbilang'=>['required'],
            'jumlah'=>['required'],
        ];
    }
}
