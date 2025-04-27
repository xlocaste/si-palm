import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Add({ auth }) {
    const [values, setValues] = useState({
        no_kontrak: '',
        pembeli: '',
        mutu: '',
        harga: '',
        volume: '',
        tanggal_kontrak: '',
        jatuh_tempo: '',
        jenis_tempo_penyerahan: '',
    });

    const handleChange = (e) => {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('kontrak.store'), values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Tambah Kontrak</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">No Kontrak</label>
                                <input type="text" name="no_kontrak" value={values.no_kontrak} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Jenis Kontrak</label>
                                <select
                                    name="jenis_kontrak"
                                    value={values.jenis_kontrak}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                    required
                                >
                                    <option value="">-- Pilih Jenis Kontrak --</option>
                                    <option value="CPO">CPO</option>
                                    <option value="PK">PK</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Pembeli</label>
                                <input type="text" name="pembeli" value={values.pembeli} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Mutu</label>
                                <input type="text" name="mutu" value={values.mutu} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Harga</label>
                                <input type="number" name="harga" value={values.harga} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Volume (ton)</label>
                                <input type="number" name="volume" value={values.volume} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Tanggal Kontrak</label>
                                <input type="date" name="tanggal_kontrak" value={values.tanggal_kontrak} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Jatuh Tempo</label>
                                <input type="date" name="jatuh_tempo" value={values.jatuh_tempo} onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" required />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Jenis Tempo Penyerahan</label>
                                <select
                                    name="jenis_tempo_penyerahan"
                                    value={values.jenis_tempo_penyerahan}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                                    required
                                >
                                    <option value="">-- Pilih Jenis Tempo --</option>
                                    <option value="tender">Tender</option>
                                    <option value="bid_offer">Bit Offer</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded">
                                    Simpan Kontrak
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
