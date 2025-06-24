<?php

namespace App\Http\Requests\Ttd;

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
            'sevp' => ['required', 'string', 'max:255'],
            'ksbl' => ['required', 'string', 'max:255'],
            'kbpt' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'sevp.required' => 'Nama SEVP wajib diisi.',
            'ksbl.required' => 'Nama KSBL wajib diisi.',
            'kbpt.required' => 'Nama KBPT wajib diisi.',
        ];
    }
}
