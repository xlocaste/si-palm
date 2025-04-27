// resources/js/Pages/RealisasiPenyerahan/List.jsx

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function List({ auth, realisasiPenyerahan }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Daftar Realisasi Penyerahan</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <Link href={route('realisasi-penyerahan.create')}>
                            <PrimaryButton className="mb-4 px-4 py-2 text-white rounded">
                                Tambah Realisasi Penyerahan
                            </PrimaryButton>
                        </Link>
                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-200 text-gray-600">
                                <tr>
                                    <th className="px-4 py-2">No. BA</th>
                                    <th className="px-4 py-2">No. Surat Penerbitan Invoice</th>
                                    <th className="px-4 py-2">Kontrak</th>
                                    <th className="px-4 py-2">Tanggal Serah</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {realisasiPenyerahan.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="px-4 py-2">{item.no_ba}</td>
                                        <td className="px-4 py-2">{item.no_surat_penerbitan_invoice}</td>
                                        <td className="px-4 py-2">{item.kontrak ? `Kontrak #${item.kontrak.id}` : '-'}</td>
                                        <td className="px-4 py-2">{item.tanggal_serah}</td>
                                        <td className="px-4 py-2">
                                            <span className={`text-${item.alb ? 'green' : 'red'}-500`}>ALB: {item.alb ? 'Yes' : 'No'}</span><br />
                                            <span className={`text-${item.ka ? 'green' : 'red'}-500`}>KA: {item.ka ? 'Yes' : 'No'}</span><br />
                                            <span className={`text-${item.kk ? 'green' : 'red'}-500`}>KK: {item.kk ? 'Yes' : 'No'}</span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <Link href={route('realisasi-penyerahan.edit', item.id)} className="text-yellow-500">
                                                Edit
                                            </Link>
                                            <span className="mx-2">|</span>
                                            <Link
                                                href={route('realisasi-penyerahan.destroy', item.id)}
                                                method="delete"
                                                as="button"
                                                onClick={(e) => {
                                                    if (!confirm('Yakin ingin menghapus data ini?')) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                className="text-red-400"
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}