// resources/js/Pages/RealisasiPenyerahan/List.jsx

import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit,faTrash,faSearch,faFilePdf,faPrint,faEye,} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import DetailView from "@/Components/DetailView";

export default function List({ auth, realisasiPenyerahan, filters }) {
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
        router.get(route("realisasi-penyerahan.index"), values);
    };

    const handleExportPDF = () => {
        router.get(route("realisasi-penyerahan.index"), {
            ...values,
            export_pdf: "true",
        });
    };

    const handlePrint = (id) => {
        window.open(route("realisasi-penyerahan.print", id), "_blank");
    };

    const openDetailModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Realisasi Penyerahan
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <Link href={route("realisasi-penyerahan.create")}>
                                <PrimaryButton className="px-4 py-2 text-white rounded">
                                    Tambah Realisasi Penyerahan
                                </PrimaryButton>
                            </Link>
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

                        <div className="mb-6 bg-gray-50-700 p-4 rounded-lg">
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="search"
                                            className="block text-sm font-medium text-gray-700-300 mb-1"
                                        >
                                            Pencarian
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="search"
                                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50-800-600"
                                                placeholder="No. BA, No. Surat Penerbitan Invoice..."
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

                        <table className="min-w-full text-sm text-left">
                            <thead className="bg-gray-200 text-gray-600">
                                <tr>
                                    <th className="px-4 py-2">No. BA</th>
                                    <th className="px-4 py-2">
                                        No. Surat Penerbitan Invoice
                                    </th>
                                    <th className="px-4 py-2">Kontrak</th>
                                    <th className="px-4 py-2">Tanggal Serah</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {realisasiPenyerahan.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="px-4 py-2">
                                            {item.no_ba}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.no_surat_penerbitan_invoice}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.kontrak
                                                ? `Kontrak #${item.kontrak.id}`
                                                : "-"}
                                        </td>
                                        <td className="px-4 py-2">
                                            {item.tanggal_serah}
                                        </td>
                                        <td className="px-4 py-2">
                                            <span
                                                className={`text-${
                                                    item.alb ? "green" : "red"
                                                }-500`}
                                            >
                                                ALB: {item.alb ? "Yes" : "No"}
                                            </span>
                                            <br />
                                            <span
                                                className={`text-${
                                                    item.ka ? "green" : "red"
                                                }-500`}
                                            >
                                                KA: {item.ka ? "Yes" : "No"}
                                            </span>
                                            <br />
                                            <span
                                                className={`text-${
                                                    item.kk ? "green" : "red"
                                                }-500`}
                                            >
                                                KK: {item.kk ? "Yes" : "No"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() =>
                                                        openDetailModal(item)
                                                    }
                                                    className="text-blue-500 hover:text-blue-600"
                                                    title="Detail"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                    />
                                                </button>
                                                <Link
                                                    href={route(
                                                        "realisasi-penyerahan.edit",
                                                        item.id
                                                    )}
                                                    className="text-yellow-500"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEdit}
                                                    />
                                                </Link>
                                                <Link
                                                    href={route(
                                                        "realisasi-penyerahan.destroy",
                                                        item.id
                                                    )}
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
                                                    className="text-red-400"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faTrash}
                                                    />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handlePrint(item.id)
                                                    }
                                                    className="text-blue-500 hover:text-blue-600"
                                                    title="Cetak"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPrint}
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
                title={`Detail Realisasi Penyerahan: ${
                    selectedItem?.no_ba || ""
                }`}
            >
                {selectedItem && <DetailView data={selectedItem} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
