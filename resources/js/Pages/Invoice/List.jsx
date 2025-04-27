import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router } from '@inertiajs/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function List({ auth, InvoiceCPO, InvoicePK }) {
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filterAndPaginate = (data) => {
        const filtered = data.filter(item =>
            item.no_invoice.toLowerCase().includes(search.toLowerCase())
        );
        const start = (currentPage - 1) * itemsPerPage;
        return {
            totalPages: Math.ceil(filtered.length / itemsPerPage),
            paginated: filtered.slice(start, start + itemsPerPage)
        };
    };

    const { totalPages: totalPagesCPO, paginated: filteredCPO } = useMemo(
        () => filterAndPaginate(InvoiceCPO),
        [InvoiceCPO, search, currentPage]
    );

    const { totalPages: totalPagesPK, paginated: filteredPK } = useMemo(
        () => filterAndPaginate(InvoicePK),
        [InvoicePK, search, currentPage]
    );

    const TableSection = ({ title, data, totalPages }) => (
        <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
            <table className="w-full text-sm text-left bg-white dark:bg-gray-900 shadow-md rounded">
                <thead className="bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    <tr>
                        <th className="px-4 py-2">No. Invoice</th>
                        <th className="px-4 py-2">Tanggal</th>
                        <th className="px-4 py-2">Volume</th>
                        <th className="px-4 py-2">Nilai</th>
                        <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index} className="border-b dark:border-gray-700">
                            <td className="px-4 py-2">{item.no_invoice}</td>
                            <td className="px-4 py-2">{item.tanggal_bayar}</td>
                            <td className="px-4 py-2">{item.kontrak?.volume || '-'}</td>
                            <td className="px-4 py-2">Rp {parseFloat(item.nilai).toLocaleString()}</td>
                            <td className="px-4 py-2 flex gap-3">
                                <Link
                                    href={route('invoice.edit', item.id)}
                                    className="text-yellow-500 hover:text-yellow-600"
                                >
                                    <FaEdit />
                                </Link>
                                <Link
                                    href={route('invoice.destroy', item.id)}
                                    method="delete"
                                    as="button"
                                    onClick={(e) => {
                                        if (!confirm('Yakin ingin menghapus data ini?')) {
                                            e.preventDefault();
                                        }
                                    }}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <FaTrash />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 border rounded ${i + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white'}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Daftar Invoice</h2>}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <PrimaryButton>
                                <Link href={route('invoice.create')}>TAMBAH INVOICE</Link>
                            </PrimaryButton>
                            <input
                                type="text"
                                placeholder="Cari No. Invoice..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1); // reset halaman saat search berubah
                                }}
                                className="px-3 py-2 border rounded w-full sm:w-64"
                            />
                        </div>

                        <TableSection title="Invoice CPO" data={filteredCPO} totalPages={totalPagesCPO} />
                        <TableSection title="Invoice PK" data={filteredPK} totalPages={totalPagesPK} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
