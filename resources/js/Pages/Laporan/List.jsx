import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
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
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">Kontrak</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">Invoice</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">Sales Order</th>
                                <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase border">Realisasi Penyerahan</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {kontrak.length > 0 ? (
                                kontrak.map((item) => {
                                    const kontrakPrintRoute = item.jenis_kontrak === 'CPO'
                                        ? route('kontrak-cpo.print', item.id)
                                        : item.jenis_kontrak === 'PK'
                                            ? route('kontrak-pk.print', item.id)
                                            : null;

                                    return (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-2 border">{item.no_kontrak}</td>

                                            <td className="px-4 py-2 border text-center">
                                                {kontrakPrintRoute ? (
                                                    <button
                                                        onClick={() => router.get(kontrakPrintRoute)}
                                                        className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                                                    >
                                                        <FaPrint />
                                                        <span>Print</span>
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">-</span>
                                                )}
                                            </td>

                                            <td className="px-4 py-2 border text-center">
                                                {item.invoices.length > 0 ? (
                                                    <button
                                                        onClick={() => router.get(route('invoice.print', item.invoices[0].id))}
                                                        className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                                                    >
                                                        <FaPrint />
                                                        <span>Print</span>
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">-</span>
                                                )}
                                            </td>

                                            <td className="px-4 py-2 border text-center">
                                                {item.sales_order.length > 0 ? (
                                                    <button
                                                        onClick={() => router.get(route('sales-order.print', item.sales_order[0].id))}
                                                        className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                                                    >
                                                        <FaPrint />
                                                        <span>Print</span>
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">-</span>
                                                )}
                                            </td>

                                            <td className="px-4 py-2 border text-center">
                                                {item.realisasi_penyerahan.length > 0 ? (
                                                    <button
                                                    onClick={() => router.get(route('realisasi-penyerahan.print', item.realisasi_penyerahan[0].id))}
                                                    className="inline-flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
                                                    >
                                                    <FaPrint />
                                                    <span>Print</span>
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">-</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-4 py-4 text-center text-gray-500">
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
