import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function List({ kontrakCPO, auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900">Daftar Kontrak Minyak Sawit (CPO)</h2>
                        <div className="mt-6 overflow-x-auto">
                            <table className="min-w-full table-auto text-sm">
                                <thead>
                                    <tr className="border-b bg-gray-100">
                                        <th className="px-4 py-2 text-left">No. Kontrak</th>
                                        <th className="px-4 py-2 text-left">Pembeli</th>
                                        <th className="px-4 py-2 text-left">Mutu</th>
                                        <th className="px-4 py-2 text-left">Harga</th>
                                        <th className="px-4 py-2 text-left">Volume</th>
                                        <th className="px-4 py-2 text-left">Tanggal Kontrak</th>
                                        <th className="px-4 py-2 text-left">Jatuh Tempo</th>
                                        <th className="px-4 py-2 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kontrakCPO.length > 0 ? (
                                        kontrakCPO.map((kontrak) => (
                                            <tr key={kontrak.id} className="border-b hover:bg-gray-50">
                                                <td className="px-4 py-2">{kontrak.no_kontrak}</td>
                                                <td className="px-4 py-2">{kontrak.pembeli}</td>
                                                <td className="px-4 py-2">{kontrak.mutu}</td>
                                                <td className="px-4 py-2">{kontrak.harga}</td>
                                                <td className="px-4 py-2">{kontrak.volume}</td>
                                                <td className="px-4 py-2">{kontrak.tanggal_kontrak}</td>
                                                <td className="px-4 py-2">{kontrak.jatuh_tempo}</td>
                                                <td className="px-4 py-2 text-center">
                                                    <div className="flex justify-center gap-3">
                                                        <Link
                                                            href={route('kontrak.edit', kontrak.id)}
                                                            className="text-yellow-500 hover:text-yellow-700"
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>
                                                        <Link
                                                            href={route('kontrak.destroy', kontrak.id)}
                                                            method="delete"
                                                            as="button"
                                                            onClick={(e) => {
                                                                if (!confirm('Yakin ingin menghapus data ini?')) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center text-gray-500 py-4">
                                                Tidak ada data kontrak.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
