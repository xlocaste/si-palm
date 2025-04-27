import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

export default function List({ auth, kontrakPK, kontrakCPO }) {
    return (
        <AuthenticatedLayout user={auth.user} header={
            <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Daftar Kontrak</h2>
        }>
            <div className="py-12 space-y-12">

                {/* Tabel CPO */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <label className="font-bold text-gray-700 dark:text-white">TABEL MINYAK SAWIT (CPO)</label>

                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-300">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                    <tr>
                                        <th className="px-6 py-3">No Kontrak</th>
                                        <th className="px-6 py-3">Pembeli</th>
                                        <th className="px-6 py-3">Volume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kontrakCPO.length > 0 ? (
                                        kontrakCPO.map((item, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4">{item.no_kontrak}</td>
                                                <td className="px-6 py-4">{item.pembeli}</td>
                                                <td className="px-6 py-4">{item.volume}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-gray-400">
                                                Tidak ada data kontrak.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Tombol Detail CPO di bawah tabel */}
                        <div className="text-right mt-4">
                            <Link href={route('kontrak-cpo.index')} className="text-black-500 hover:underline inline-flex items-center gap-1">
                                <FontAwesomeIcon icon={faEye} /> Detail CPO
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Tabel PK */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <label className="font-bold text-gray-700 dark:text-white">TABEL INTI SAWIT (KERNEL / PK)</label>

                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-300">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-300">
                                    <tr>
                                        <th className="px-6 py-3">No Kontrak</th>
                                        <th className="px-6 py-3">Pembeli</th>
                                        <th className="px-6 py-3">Volume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kontrakPK.length > 0 ? (
                                        kontrakPK.map((item, index) => (
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <td className="px-6 py-4">{item.no_kontrak}</td>
                                                <td className="px-6 py-4">{item.pembeli}</td>
                                                <td className="px-6 py-4">{item.volume}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-gray-400">
                                                Tidak ada data kontrak.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Tombol Detail PK di bawah tabel */}
                        <div className="text-right mt-4">
                            <Link href={route('kontrak-pk.index')} className="text-black-500 hover:underline inline-flex items-center gap-1">
                                <FontAwesomeIcon icon={faEye} /> Detail PK
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
