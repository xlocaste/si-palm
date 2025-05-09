import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Add({ auth, kontrak }) {
    console.log(kontrak)
    const [values, setValues] = useState({
        metode: '',
        nama_bank: '',
        cara_pembayaran: '',
        atas_nama: '',
        rek_no: '',
        jatuh_tempo_pembayaran: '',
        kontrak_id: '',
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Pembayaran</h2>}
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center gap-6">
                            <div>
                                <label>Metode</label>
                                <select
                                    name="metode"
                                    value={values.metode}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">Pilih Metode</option>
                                    <option value="Tunai">Tunai</option>
                                    <option value="Transfer">Transfer</option>
                                    <option value="Debit">Debit</option>
                                    <option value="Kredit">Kredit</option>
                                    <option value="E-Wallet">E-Wallet</option>
                                </select>
                            </div>
                            <div>
                                <label>Kontrak</label>
                                <select
                                    name="kontrak_id"
                                    value={values.kontrak_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- Pilih Kontrak --</option>
                                    {kontrak.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.no_kontrak}
                                        </option>
                                    ))}
                                </select>
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
