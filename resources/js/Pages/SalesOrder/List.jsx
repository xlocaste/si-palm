import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link } from '@inertiajs/react';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function List({ auth, SalesOrder }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                    Daftar Sales Order
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <PrimaryButton className="mb-4">
                            <Link href={route('sales-order.create')}>
                                TAMBAH SALES ORDER
                            </Link>
                        </PrimaryButton>

                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-200 text-gray-600">
                                <tr>
                                    <th className="px-4 py-2">No. Sales Order</th>
                                    <th className="px-4 py-2">Tanggal</th>
                                    <th className="px-4 py-2">Tahap</th>
                                    <th className="px-4 py-2">Volume</th>
                                    <th className="px-4 py-2">nilai</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SalesOrder.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{item.no_sales_order}</td>
                                        <td className="px-4 py-2">{item.tanggal_sales_order}</td>
                                        <td className="px-4 py-2">{item.tahap}</td>
                                        <td className="px-4 py-2">{item.volume_sales_order}</td>
                                        <td className="px-4 py-2">{item.nilai}</td>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex items-center justify-center gap-4">
                                                {/* Edit */}
                                                <Link
                                                    href={route('sales-order.edit', item.id)}
                                                    className="text-yellow-500 hover:text-yellow-600"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </Link>

                                                {/* Hapus */}
                                                <Link
                                                    href={route('sales-order.destroy', item.id)}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-500 hover:text-red-600"
                                                    title="Hapus"
                                                    onClick={(e) => {
                                                        if (!confirm('Yakin ingin menghapus data ini?')) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </Link>
                                            </div>
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
