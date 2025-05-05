import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, router } from "@inertiajs/react";
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilePdf,
    faPrint,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import DetailView from "@/Components/DetailView";

export default function List({ auth, SalesOrder, filters }) {
    const [values, setValues] = useState({
        search: filters?.search || "",
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleChange = (e) => {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(route("sales-order.index"), values);
    };

    const handleExportPDF = () => {
        router.get(route("sales-order.index"), {
            ...values,
            export_pdf: "true",
        });
    };

    const handlePrint = (id) => {
        window.open(route("sales-order.print", id), "_blank");
    };

    const openDetailModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

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
                        <div className="flex justify-between items-center mb-6">
                            <PrimaryButton>
                                <Link href={route("sales-order.create")}>
                                    TAMBAH SALES ORDER
                                </Link>
                            </PrimaryButton>
                            <button
                                onClick={handleExportPDF}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                            >
                                <FontAwesomeIcon
                                    icon={faFilePdf}
                                    className="mr-2"
                                />
                                Export PDF
                            </button>
                        </div>

                        <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="search"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                                        >
                                            Pencarian
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="search"
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                                placeholder="No. Sales Order..."
                                                value={values.search}
                                                onChange={handleChange}
                                            />
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                                <FontAwesomeIcon
                                                    icon={faSearch}
                                                    className="text-gray-400"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-end">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                        >
                                            Filter
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-200 text-gray-600">
                                <tr>
                                    <th className="px-4 py-2">
                                        No. Sales Order
                                    </th>
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
                                        <td className="px-4 py-2">
                                            {item.no_sales_order}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.tanggal_sales_order}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.tahap}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.volume_sales_order}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.nilai}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            <div className="flex items-center justify-center gap-4">
                                                {/* Detail */}
                                                <button
                                                    onClick={() =>
                                                        openDetailModal(item)
                                                    }
                                                    className="text-blue-500 hover:text-blue-600"
                                                    title="Detail"
                                                >
                                                    <EyeIcon className="h-5 w-5" />
                                                </button>

                                                {/* Edit */}
                                                <Link
                                                    href={route(
                                                        "sales-order.edit",
                                                        item.id
                                                    )}
                                                    className="text-yellow-500 hover:text-yellow-600"
                                                    title="Edit"
                                                >
                                                    <PencilSquareIcon className="h-5 w-5" />
                                                </Link>

                                                {/* Hapus */}
                                                <Link
                                                    href={route(
                                                        "sales-order.destroy",
                                                        item.id
                                                    )}
                                                    method="delete"
                                                    as="button"
                                                    className="text-red-500 hover:text-red-600"
                                                    title="Hapus"
                                                    onClick={(e) => {
                                                        if (
                                                            !confirm(
                                                                "Yakin ingin menghapus data ini?"
                                                            )
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </Link>

                                                {/* Cetak */}
                                                <button
                                                    onClick={() =>
                                                        handlePrint(item.id)
                                                    }
                                                    className="text-blue-500 hover:text-blue-600"
                                                    title="Cetak"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPrint}
                                                        className="h-4 w-4"
                                                    />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`Detail Sales Order: ${
                    selectedItem?.no_sales_order || ""
                }`}
            >
                {selectedItem && <DetailView data={selectedItem} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
