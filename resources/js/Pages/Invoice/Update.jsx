import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

export default function Update({ auth, invoice }) {
    const [values, setValues] = useState({
        no_invoice: invoice.no_invoice || '',
        tanggal_bayar: invoice.tanggal_bayar || '',
        volume_bayar: invoice.volume_bayar || '',
        nilai: invoice.nilai || '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route('invoice.update', invoice.id), values, {
            onSuccess: () => alert('Invoice berhasil diperbarui!'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Invoice</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">No. Invoice</label>
                                <input
                                    type="text"
                                    name="no_invoice"
                                    value={values.no_invoice}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Tanggal Bayar</label>
                                <input
                                    type="date"
                                    name="tanggal_bayar"
                                    value={values.tanggal_bayar}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Volume Bayar (ton)</label>
                                <input
                                    type="number"
                                    name="volume_bayar"
                                    value={values.volume_bayar}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Nilai</label>
                                <input
                                    type="number"
                                    name="nilai"
                                    value={values.nilai}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
