<?php

namespace App\Http\Requests\Pembayaran;

use App\Enums\MetodeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

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
            'metode' => ['required', new Enum(MetodeEnum::class)],
            'nama_bank' => 'required',
            'cara_pembayaran' => 'required',
            'atas_nama' => 'required',
            'rek_no' => 'required',
            'file' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'jatuh_tempo_pembayaran' => 'required|date',
            'kontrak_id' => 'required|exists:kontrak,id|unique:pembayaran,kontrak_id',
        ];
    }
}
