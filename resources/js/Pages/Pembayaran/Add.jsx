import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function Add({ auth }) {
    const [values, setValues] = useState({
        metode: '',
        nama_bank: '',
        cara_pembayaran: '',
        atas_nama: '',
        rek_no: '',
        jatuh_tempo_pembayaran: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('pembayaran.store'), values);
        console.log('Data dikirim:', values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Tambah Pembayaran</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>Metode</label>
                                <input type="text" name="metode" value={values.metode} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>Nama Bank</label>
                                <input type="text" name="nama_bank" value={values.nama_bank} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>Cara Pembayaran</label>
                                <input type="text" name="cara_pembayaran" value={values.cara_pembayaran} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>Atas Nama</label>
                                <input type="text" name="atas_nama" value={values.atas_nama} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>No Rekening</label>
                                <input type="text" name="rek_no" value={values.rek_no} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>Jatuh Tempo Pembayaran</label>
                                <input type="date" name="jatuh_tempo_pembayaran" value={values.jatuh_tempo_pembayaran} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
