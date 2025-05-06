import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, router } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faTrash,
    faSearch,
    faFilePdf,
    faPrint,
    faEye,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import DetailView from "@/Components/DetailView";

export default function List({ kontrakPK, filters, auth }) {
    const [values, setValues] = useState({
        search: filters?.search || "",
        date_from: filters?.date_from || "",
        date_to: filters?.date_to || "",
        harga_from: filters?.harga_from || "",
        harga_to: filters?.harga_to || "",
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
        router.get(route("kontrak-pk.index"), values);
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data ini?")) {
            router.delete(route("kontrak.destroy", id));
        }
    };

    const handleExportPDF = () => {
        router.get(route("kontrak-pk.index"), {
            ...values,
            export_pdf: "true",
        });
    };

    const handlePrint = (id) => {
        window.open(route("kontrak-pk.print", id), "_blank");
    };

    const handleReset = () => {
        setValues({
            search: "",
            date_from: "",
            date_to: "",
            harga_from: "",
            harga_to: "",
        });

        router.get(route("kontrak-pk.index"), {
            search: "",
            date_from: "",
            date_to: "",
            harga_from: "",
            harga_to: "",
        });
    };

    const openDetailModal = (kontrak) => {
        setSelectedItem(kontrak);
        setModalOpen(true);
    };

    function formatTanggalJamMenit(datetime) {
        const date = new Date(datetime);
        const tanggal = date.toLocaleDateString('id-ID');
        const jamMenit = date.toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        return `${tanggal} ${jamMenit}`;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Kontrak PK
                </h2>
            }
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900 ">
                            Daftar Kontrak Inti Sawit (PK)
                        </h2>
                    </div>

                    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                    <label
                                        htmlFor="search"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Pencarian
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="search"
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 -800 -600 "
                                            placeholder="Cari..."
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

                                <div>
                                    <label
                                        htmlFor="date_from"
                                        className="block text-sm font-medium text-gray-700 -300 mb-1"
                                    >
                                        Tanggal Dari
                                    </label>
                                    <input
                                        type="date"
                                        id="date_from"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 -800 -600 "
                                        value={values.date_from}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="date_to"
                                        className="block text-sm font-medium text-gray-700 -300 mb-1"
                                    >
                                        Tanggal Sampai
                                    </label>
                                    <input
                                        type="date"
                                        id="date_to"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 -800 -600 "
                                        value={values.date_to}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="harga_from"
                                        className="block text-sm font-medium text-gray-700 -300 mb-1"
                                    >
                                        Harga Dari
                                    </label>
                                    <input
                                        type="number"
                                        id="harga_from"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 -800 -600 "
                                        placeholder="Minimal"
                                        value={values.harga_from}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="harga_to"
                                        className="block text-sm font-medium text-gray-700 -300 mb-1"
                                    >
                                        Harga Sampai
                                    </label>
                                    <input
                                        type="number"
                                        id="harga_to"
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 -800 -600 "
                                        placeholder="Maksimal"
                                        value={values.harga_to}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Filter
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto text-sm text-left border border-gray-200 -700">
                            <thead className="bg-gray-100 -700 text-gray-700 -200">
                                <tr>
                                    <th className="px-4 py-2">
                                        No. Kontrak
                                    </th>
                                    <th className="px-4 py-2">Pembeli</th>
                                    <th className="px-4 py-2">Mutu</th>
                                    <th className="px-4 py-2">Harga</th>
                                    <th className="px-4 py-2">Volume</th>
                                    <th className="px-4 py-2">Tanggal Kontrak</th>
                                    <th className="px-4 py-2">Jatuh Tempo</th>
                                    <th className="px-4 py-2 text-center">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {kontrakPK.length > 0 ? (
                                    kontrakPK.map((kontrak) => (
                                        <tr
                                            key={kontrak.id}
                                            className="border-b -700 hover:bg-gray-50 -gray-700 transition"
                                        >
                                            <td className="px-4 py-2">
                                                {kontrak.no_kontrak}
                                            </td>
                                            <td className="px-4 py-2">
                                                {kontrak.pembeli}
                                            </td>
                                            <td className="px-4 py-2">
                                                {kontrak.mutu}
                                            </td>
                                            <td className="px-4 py-2">
                                                Rp{" "}
                                                {parseFloat(
                                                    kontrak.harga
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2">
                                                {kontrak.volume}
                                            </td>
                                            <td className="px-4 py-2">
                                                {formatTanggalJamMenit(kontrak.tanggal_kontrak)}
                                            </td>
                                            <td className="px-4 py-2">
                                                {formatTanggalJamMenit(kontrak.jatuh_tempo)}
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <div className="flex justify-center gap-3">
                                                    <button
                                                        onClick={() =>
                                                            openDetailModal(
                                                                kontrak
                                                            )
                                                        }
                                                        className="text-blue-500 hover:text-blue-700"
                                                        title="Detail"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                        />
                                                    </button>
                                                    <Link
                                                        href={route(
                                                            "kontrak.edit",
                                                            kontrak.id
                                                        )}
                                                        className="text-yellow-500 hover:text-yellow-700"
                                                        title="Edit"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faEdit}
                                                        />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                kontrak.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700"
                                                        title="Hapus"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handlePrint(
                                                                kontrak.id
                                                            )
                                                        }
                                                        className="text-blue-500 hover:text-blue-700"
                                                        title="Cetak"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faPrint}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="text-center text-gray-500 py-4"
                                        >
                                            Tidak ada data kontrak.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={`Detail Kontrak PK: ${selectedItem?.no_kontrak || ""}`}
            >
                {selectedItem && <DetailView data={selectedItem} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
