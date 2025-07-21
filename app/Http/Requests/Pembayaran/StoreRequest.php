<?php

namespace App\Http\Requests\Pembayaran;

use App\Enums\MetodeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

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
            'metode' => ['nullable', new Enum(MetodeEnum::class)],
            'nama_bank' => 'nullable',
            'cara_pembayaran' => 'nullable',
            'atas_nama' => 'nullable',
            'rek_no' => 'nullable',
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'jatuh_tempo_pembayaran' => 'nullable|date',
            'kontrak_id' => 'nullable|exists:kontrak,id|unique:pembayaran,kontrak_id',
        ];
    }
}
