import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import Select from 'react-select';
import PrimaryButton from "@/Components/PrimaryButton";

export default function Add({ auth, kontrak }) {
    const [values, setValues] = useState({
        no_invoice: '',
        tanggal_bayar: '',
        kontrak_id: '',
        nilai: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'kontrak_id') {
            const selected = kontrak.find(k => k.id == value);
            const nilai = selected ? selected.harga * selected.volume : '';
            setValues({ ...values, kontrak_id: parseInt(value), nilai });
        } else {
            setValues({ ...values, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('invoice.store'), values);
        console.log('Kirim data:', values);
    };

    const options = kontrak.map((k) => ({
        value: k.id,
        label: `${k.jenis_kontrak} - ${k.no_kontrak} - Harga: Rp${k.harga}, Volume: ${k.volume}`,
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Invoice</h2>}
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center gap-6">
                            <div>
                                <label>No. Invoice</label>
                                <input type="text" name="no_invoice" value={values.no_invoice} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>Tanggal Bayar</label>
                                <input type="date" name="tanggal_bayar" value={values.tanggal_bayar} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Pilih Kontrak</label>
                                <Select
                                    name="kontrak_id"
                                    options={options}
                                    value={options.find((opt) => opt.value === values.kontrak_id)}
                                    onChange={(selectedOption) => {
                                        const selected = kontrak.find(k => k.id === selectedOption?.value);
                                        const nilai = selected ? Number(selected.harga) * Number(selected.volume) : '';
                                        setValues({
                                            ...values,
                                            kontrak_id: selectedOption ? selectedOption.value : '',
                                            nilai,
                                        });
                                    }}
                                    isClearable
                                    placeholder="-- Pilih Kontrak --"
                                    className="text-sm"
                                />
                            </div>
                            <div>
                                <label>Nilai (Rp)</label>
                                <input
                                    type="number"
                                    name="nilai"
                                    value={values.nilai}
                                    readOnly
                                    className="w-full border p-2 rounded bg-gray-100"
                                />
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <PrimaryButton type="submit">Simpan</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
