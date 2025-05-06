import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPrint } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import DetailView from "@/Components/DetailView";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoIosSearch } from "react-icons/io";

export default function List({ auth, salesOrderCPO, salesOrderPK }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const { filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("salesOrder.index"), { search }, { preserveState: true });
    };

    const openDetailModal = (item, type) => {
        setSelectedItem(item);
        setModalTitle(
            `Detail Sales Order ${type === "cpo" ? "CPO" : "PK"}: ${item.no_sales_order}`
        );
        setModalOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Sales Order
                </h2>
            }
        >
            <Head title="Daftar Sales Order" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <PrimaryButton>
                            <Link href={route("sales-order.create")}>
                                TAMBAH SALES ORDER
                            </Link>
                        </PrimaryButton>
                        <form onSubmit={handleSearch} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari..."
                                className="border px-3 pr-40 py-1 rounded-md text-sm"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
                            >
                                <IoIosSearch />
                            </button>
                        </form>
                    </div>

                    <label className="font-bold text-gray-700">
                        TABEL SALES ORDER CPO
                    </label>

                    <div className="overflow-auto mt-6">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border">No Sales Order</th>
                                    <th className="px-6 py-3 border">Tanggal</th>
                                    <th className="px-6 py-3 border">Tahap</th>
                                    <th className="px-6 py-3 border">Volume</th>
                                    <th className="px-6 py-3 border">Nilai</th>
                                    <th className="px-6 py-3 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesOrderCPO.length > 0 ? (
                                    salesOrderCPO.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 border">{item.no_sales_order}</td>
                                            <td className="px-6 py-4 border">{item.tanggal_sales_order}</td>
                                            <td className="px-6 py-4 border">{item.tahap}</td>
                                            <td className="px-6 py-4 border">{item.volume_sales_order}</td>
                                            <td className="px-6 py-4 border">Rp {parseFloat(item.nilai).toLocaleString()}</td>
                                            <td className="px-6 py-4 border space-x-2">
                                                <button
                                                    onClick={() => openDetailModal(item, "cpo")}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>

                                                <a
                                                    href={route("sales-order.print", item.id)}
                                                    target="_blank"
                                                    className="text-green-600 hover:underline"
                                                >
                                                    <FontAwesomeIcon icon={faPrint} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-400">
                                            Tidak ada data sales order.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
                    <label className="font-bold text-gray-700">
                        TABEL SALES ORDER PK
                    </label>

                    <div className="overflow-auto mt-6">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border">No Sales Order</th>
                                    <th className="px-6 py-3 border">Tanggal</th>
                                    <th className="px-6 py-3 border">Tahap</th>
                                    <th className="px-6 py-3 border">Volume</th>
                                    <th className="px-6 py-3 border">Nilai</th>
                                    <th className="px-6 py-3 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesOrderPK.length > 0 ? (
                                    salesOrderPK.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 border">{item.no_sales_order}</td>
                                            <td className="px-6 py-4 border">{item.tanggal_sales_order}</td>
                                            <td className="px-6 py-4 border">{item.tahap}</td>
                                            <td className="px-6 py-4 border">{item.volume_sales_order}</td>
                                            <td className="px-6 py-4 border">Rp {parseFloat(item.nilai).toLocaleString()}</td>
                                            <td className="px-6 py-4 border space-x-2">
                                                <button
                                                    onClick={() => openDetailModal(item, "pk")}
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>

                                                <a
                                                    href={route("sales-order.print", item.id)}
                                                    target="_blank"
                                                    className="text-green-600 hover:underline"
                                                >
                                                    <FontAwesomeIcon icon={faPrint} />
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-400">
                                            Tidak ada data sales order.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
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
