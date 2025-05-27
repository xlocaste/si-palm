import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Head, Link, router } from '@inertiajs/react';
import { FaPrint } from 'react-icons/fa';

export default function List({ auth, kontrak }) {
    console.log(kontrak)
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Laporan Kontrak
                </h2>
            }
        >
            <Head title="Laporan" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <table className="min-w-full divide-y divide-gray-200 border">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">No Kontrak</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">No Invoice</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">No Sales Order</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">Realisasi Penyerahan</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {kontrak.length > 0 ? (
                                kontrak.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border text-center">{item.no_kontrak}</td>
                                        <td className="px-4 py-2 border text-center">{item.invoices[0].no_invoice}</td>
                                        <td className="px-4 py-2 border text-center">{item.sales_order[0].no_sales_order}</td>
                                        <td className="px-4 py-2 border text-center">{item.sales_order[0].id}</td>
                                        <td className="px-4 py-2 border text-center">
                                            <Link
                                                href={route(
                                                    "laporan.show",
                                                    item.id
                                                )}
                                                className="text-blue-500 hover:text-blue-700"
                                                title="Detail"
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEye}
                                                />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                                        Tidak ada data kontrak.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
