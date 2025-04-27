import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function List({ kontrakPK, auth }) {
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus data ini?')) {
            router.delete(route('kontrak.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            Daftar Kontrak Inti Sawit
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto text-sm text-left border border-gray-200 dark:border-gray-700">
                                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                    <tr>
                                        <th className="px-4 py-2">No. Kontrak</th>
                                        <th className="px-4 py-2">Pembeli</th>
                                        <th className="px-4 py-2">Mutu</th>
                                        <th className="px-4 py-2">Harga</th>
                                        <th className="px-4 py-2">Volume</th>
                                        <th className="px-4 py-2">Tanggal Kontrak</th>
                                        <th className="px-4 py-2 text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kontrakPK.length > 0 ? (
                                        kontrakPK.map((kontrak) => (
                                            <tr
                                                key={kontrak.id}
                                                className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                            >
                                                <td className="px-4 py-2">{kontrak.no_kontrak}</td>
                                                <td className="px-4 py-2">{kontrak.pembeli}</td>
                                                <td className="px-4 py-2">{kontrak.mutu}</td>
                                                <td className="px-4 py-2">
                                                    Rp {parseFloat(kontrak.harga).toLocaleString()}
                                                </td>
                                                <td className="px-4 py-2">{kontrak.volume}</td>
                                                <td className="px-4 py-2">{kontrak.tanggal_kontrak}</td>
                                                <td className="px-4 py-2 text-center">
                                                    <div className="flex justify-center gap-3">
                                                        <Link
                                                            href={route('kontrak.edit', kontrak.id)}
                                                            className="text-yellow-500 hover:text-yellow-700"
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(kontrak.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>
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
