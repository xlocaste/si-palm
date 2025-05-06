import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

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

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Invoice</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>No. Invoice</label>
                                <input type="text" name="no_invoice" value={values.no_invoice} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>Tanggal Bayar</label>
                                <input type="date" name="tanggal_bayar" value={values.tanggal_bayar} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>Pilih Kontrak</label>
                                <select name="kontrak_id" value={values.kontrak_id} onChange={handleChange} required className="w-full border p-2 rounded">
                                    <option value="">-- Pilih Kontrak --</option>
                                    {kontrak.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {`${k.jenis_kontrak} - No.Kontrak:${k.no_kontrak} - Harga: Rp${k.harga}, Volume: ${k.volume}`}
                                        </option>
                                    ))}
                                </select>
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
                            <div className="text-right">
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
