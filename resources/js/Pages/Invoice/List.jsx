import React, { useState, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, router } from "@inertiajs/react";
import {
    FaEdit,
    FaTrash,
    FaPrint,
    FaSearch,
    FaFilePdf,
    FaEye,
} from "react-icons/fa";
import Modal from "@/Components/Modal";
import DetailView from "@/Components/DetailView";

export default function List({ auth, InvoiceCPO, InvoicePK, filters }) {
    const [search, setSearch] = useState(filters?.search || "");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalTitle, setModalTitle] = useState("");

    const filterAndPaginate = (data) => {
        const filtered = data.filter((item) =>
            item.no_invoice.toLowerCase().includes(search.toLowerCase())
        );
        const start = (currentPage - 1) * itemsPerPage;
        return {
            totalPages: Math.ceil(filtered.length / itemsPerPage),
            paginated: filtered.slice(start, start + itemsPerPage),
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

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(route("invoice.index"), { search });
    };

    const handleExportPDF = (jenis = "all") => {
        router.get(route("invoice.index"), {
            search,
            export_pdf: "true",
            jenis,
        });
    };

    const handlePrint = (id) => {
        window.open(route("invoice.print", id), "_blank");
    };

    const openDetailModal = (item, type) => {
        setSelectedItem(item);
        setModalTitle(
            `Detail Invoice ${type.toUpperCase()}: ${item.no_invoice}`
        );
        setModalOpen(true);
    };

    const TableSection = ({ title, data, totalPages, jenis }) => (
        <div className="mb-12">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 ">
                    {title}
                </h3>
            </div>
            <table className="w-full text-sm text-left bg-white shadow-md rounded">
                <thead className="bg-gray-200 text-gray-600">
                    <tr>
                        <th className="px-4 py-2">No. Invoice</th>
                        <th className="px-4 py-2">Tanggal</th>
                        <th className="px-4 py-2">Volume</th>
                        <th className="px-4 py-2">Nilai</th>
                        <th className="px-4 py-2">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr
                                key={index}
                                className="border-b"
                            >
                                <td className="px-4 py-2">{item.no_invoice}</td>
                                <td className="px-4 py-2">
                                    {item.tanggal_bayar}
                                </td>
                                <td className="px-4 py-2">
                                    {item.kontrak?.volume || "-"}
                                </td>
                                <td className="px-4 py-2">
                                    Rp {parseFloat(item.nilai).toLocaleString()}
                                </td>
                                <td className="px-4 py-2 flex gap-3">
                                    <button
                                        onClick={() =>
                                            openDetailModal(item, jenis)
                                        }
                                        className="text-blue-500 hover:text-blue-600"
                                        title="Detail"
                                    >
                                        <FaEye />
                                    </button>
                                    <Link
                                        href={route("invoice.edit", item.id)}
                                        className="text-yellow-500 hover:text-yellow-600"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </Link>
                                    <Link
                                        href={route("invoice.destroy", item.id)}
                                        method="delete"
                                        as="button"
                                        onClick={(e) => {
                                            if (
                                                !confirm(
                                                    "Yakin ingin menghapus data ini?"
                                                )
                                            ) {
                                                e.preventDefault();
                                            }
                                        }}
                                        className="text-red-500 hover:text-red-600"
                                        title="Hapus"
                                    >
                                        <FaTrash />
                                    </Link>
                                    <button
                                        onClick={() => handlePrint(item.id)}
                                        className="text-blue-500 hover:text-blue-600"
                                        title="Cetak"
                                    >
                                        <FaPrint />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="5"
                                className="text-center py-4 text-gray-500"
                            >
                                Tidak ada data invoice.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`px-3 py-1 border rounded ${
                                i + 1 === currentPage
                                    ? "bg-blue-500 text-white"
                                    : "bg-white"
                            }`}
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
            header={
                <h2 className="font-semibold text-xl text-gray-800  leading-tight">
                    Daftar Invoice
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex gap-2">
                                <PrimaryButton>
                                    <Link href={route("invoice.create")}>
                                        TAMBAH INVOICE
                                    </Link>
                                </PrimaryButton>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className="w-full sm:w-64 flex"
                            >
                                <input
                                    type="text"
                                    placeholder="Cari No. Invoice..."
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="px-3 py-2 border rounded w-full"
                                />
                                <button
                                    type="submit"
                                    className="ml-2 px-3 py-2 bg-blue-500 text-white rounded"
                                >
                                    <FaSearch />
                                </button>
                            </form>
                        </div>

                        <TableSection
                            title="Invoice CPO"
                            data={filteredCPO}
                            totalPages={totalPagesCPO}
                            jenis="cpo"
                        />
                        <TableSection
                            title="Invoice PK"
                            data={filteredPK}
                            totalPages={totalPagesPK}
                            jenis="pk"
                        />
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={modalTitle}
            >
                {selectedItem && <DetailView data={selectedItem} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
