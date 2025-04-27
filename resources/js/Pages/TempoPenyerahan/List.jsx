import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

export default function List({ auth, Kontrak, jenis_tempo_penyerahan }) {
    const [selectedJenisTempo, setSelectedJenisTempo] = useState(jenis_tempo_penyerahan || '');

    const handleFilterChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedJenisTempo(selectedValue);
        router.get('/tempo-penyerahan', {
            jenis_tempo_penyerahan: selectedValue,
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Tempo Penyerahan</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Filter Jenis Tempo
                            </label>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                value={selectedJenisTempo}
                                onChange={handleFilterChange}
                            >
                                <option value="">-- Semua --</option>
                                <option value="tender">Tender</option>
                                <option value="bid_offer">Bit Offer</option>
                            </select>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-2 text-left">No Kontrak</th>
                                    <th className="px-4 py-2 text-left">Pembeli</th>
                                    <th className="px-4 py-2 text-left">Mutu</th>
                                    <th className="px-4 py-2 text-left">Harga</th>
                                    <th className="px-4 py-2 text-left">Volume</th>
                                    <th className="px-4 py-2 text-left">Tanggal Kontrak</th>
                                    <th className="px-4 py-2 text-left">Jenis Tempo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Kontrak.length > 0 ? (
                                    Kontrak.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">{item.no_kontrak}</td>
                                            <td className="px-4 py-2">{item.pembeli}</td>
                                            <td className="px-4 py-2">{item.mutu}</td>
                                            <td className="px-4 py-2">Rp {parseFloat(item.harga).toLocaleString()}</td>
                                            <td className="px-4 py-2">{item.volume}</td>
                                            <td className="px-4 py-2">{item.tanggal_kontrak}</td>
                                            <td className="px-4 py-2">{item.jenis_tempo_penyerahan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-4 py-4 text-center text-gray-500" colSpan={7}>
                                            Tidak ada data kontrak.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
