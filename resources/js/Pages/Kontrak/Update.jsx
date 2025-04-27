import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Update({ auth, kontrak }) {
    const [values, setValues] = useState({
        no_kontrak: kontrak.no_kontrak || '',
        jenis_kontrak: kontrak.jenis_kontrak || '',
        pembeli: kontrak.pembeli || '',
        mutu: kontrak.mutu || '',
        harga: kontrak.harga || '',
        volume: kontrak.volume || '',
        tanggal_kontrak: kontrak.tanggal_kontrak || '',
        jatuh_tempo: kontrak.jatuh_tempo || '',
        jenis_tempo_penyerahan: kontrak.jenis_tempo_penyerahan || '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(route('kontrak.update', kontrak.id), values, {
            preserveState: true,
            onSuccess: () => {
                alert('Data kontrak berhasil diperbarui!');
            },
            onError: (errors) => {
                alert('Terjadi kesalahan saat memperbarui data kontrak.');
                console.log(errors);
            }
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Edit Kontrak</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>No. Kontrak</label>
                                <input
                                    type="text"
                                    name="no_kontrak"
                                    value={values.no_kontrak}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Jenis Kontrak</label>
                                <select
                                    name="jenis_kontrak"
                                    value={values.jenis_kontrak}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="">-- Pilih Jenis Kontrak --</option>
                                    <option value="CPO">CPO</option>
                                    <option value="PK">PK</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Jenis Tempo Penyerahan</label>
                                <select
                                    name="jenis_tempo_penyerahan"
                                    value={values.jenis_tempo_penyerahan}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                >
                                    <option value="">-- Pilih Jenis Tempo Penyerahan --</option>
                                    <option value="tender">Tender</option>
                                    <option value="bid_offer">Bid Offer</option>
                                </select>
                            </div>
                            <div>
                                <label>Pembeli</label>
                                <input
                                    type="text"
                                    name="pembeli"
                                    value={values.pembeli}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label>Mutu</label>
                                <input
                                    type="text"
                                    name="mutu"
                                    value={values.mutu}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label>Harga</label>
                                <input
                                    type="number"
                                    name="harga"
                                    value={values.harga}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label>Volume</label>
                                <input
                                    type="number"
                                    name="volume"
                                    value={values.volume}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label>Tanggal Kontrak</label>
                                <input
                                    type="date"
                                    name="tanggal_kontrak"
                                    value={values.tanggal_kontrak}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label>Jatuh Tempo</label>
                                <input
                                    type="date"
                                    name="jatuh_tempo"
                                    value={values.jatuh_tempo}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Perbarui
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
