import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function List({ auth, notifikasi, kontrak }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Jatuh Tempo
                </h2>
            }
        >
            <Head title="Jatuh Tempo" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    {notifikasi.length > 0 && (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow">
                            <p className="font-bold">Perhatian:</p>
                            <ul className="list-disc list-inside">
                                {(notifikasi || []).map(item => (
                                    <li key={item.id}>
                                        Kontrak <strong>{item.no_kontrak}</strong> akan jatuh tempo pada{" "}
                                        <strong>{item.jatuh_tempo}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="bg-white overflow-auto shadow-sm sm:rounded-lg py-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Semua Kontrak</h3>
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">No</th>
                                    <th className="px-4 py-2 border">No Kontrak</th>
                                    <th className="px-4 py-2 border">Pembeli</th>
                                    <th className="px-4 py-2 border">Tanggal Kontrak</th>
                                    <th className="px-4 py-2 border">Jatuh Tempo</th>
                                    <th className="px-4 py-2 border">Jenis Kontrak</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kontrak.length > 0 ? (
                                    kontrak.map((item, index) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{index + 1}</td>
                                            <td className="px-4 py-2 border">{item.no_kontrak}</td>
                                            <td className="px-4 py-2 border">{item.pembeli}</td>
                                            <td className="px-4 py-2 border">{item.tanggal_kontrak}</td>
                                            <td className="px-4 py-2 border">{item.jatuh_tempo}</td>
                                            <td className="px-4 py-2 border">{item.jenis_kontrak}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-gray-500">
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
