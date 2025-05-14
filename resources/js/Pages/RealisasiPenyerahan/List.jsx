import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPrint } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import DetailView from "@/Components/DetailView";
import PrimaryButton from "@/Components/PrimaryButton";
import { IoIosSearch } from "react-icons/io";

export default function List({ auth, realisasiPenyerahanCPO, realisasiPenyerahanPK }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const { filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("realisasiPenyerahan.index"), { search }, { preserveState: true });
    };

    const openDetailModal = (item, type) => {
        setSelectedItem(item);
        setModalTitle(
            `Detail Realisasi Penyerahan ${type === "cpo" ? "CPO" : "PK"}: ${item.no_ba}`
        );
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
            <Head title="Daftar Realisasi Penyerahan" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <PrimaryButton>
                            <Link href={route("realisasi-penyerahan.create")}>
                                TAMBAH REALISASI PENYERAHAN
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
                        TABEL REALISASI PENYERAHAN CPO
                    </label>

                    <div className="overflow-auto mt-6">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border">No BA</th>
                                    <th className="px-6 py-3 border">No Surat Penerbitan Invoice</th>
                                    <th className="px-6 py-3 border">Kontrak</th>
                                    <th className="px-6 py-3 border">Tanggal Serah</th>
                                    <th className="px-6 py-3 border">Status</th>
                                    <th className="px-6 py-3 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {realisasiPenyerahanCPO.length > 0 ? (
                                    realisasiPenyerahanCPO.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 border">{item.no_ba}</td>
                                            <td className="px-6 py-4 border">{item.no_surat_penerbitan_invoice}</td>
                                            <td className="px-6 py-4 border">{item.kontrak.id}</td>
                                            <td className="px-6 py-4 border">{item.tanggal_serah}</td>
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
                                            <td className="px-6 py-4 border space-x-2">
                                                <Link
                                                    href={route(
                                                        "realisasi-penyerahan.show",
                                                        item.id
                                                    )}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="Detail"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                    />
                                                </Link>

                                                <a
                                                    href={route("realisasi-penyerahan.print", item.id)}
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
                                            Tidak ada data CPO.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
                    <label className="font-bold text-gray-700">
                        TABEL REALISASI PENYERAHAN PK
                    </label>

                    <div className="overflow-auto mt-6">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border">No BA</th>
                                    <th className="px-6 py-3 border">No Surat Penerbitan Invoice</th>
                                    <th className="px-6 py-3 border">Kontrak</th>
                                    <th className="px-6 py-3 border">Tanggal Serah</th>
                                    <th className="px-6 py-3 border">Status</th>
                                    <th className="px-6 py-3 border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {realisasiPenyerahanPK.length > 0 ? (
                                    realisasiPenyerahanPK.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 border">{item.no_ba}</td>
                                            <td className="px-6 py-4 border">{item.no_surat_penerbitan_invoice}</td>
                                            <td className="px-6 py-4 border">{item.kontrak.id}</td>
                                            <td className="px-6 py-4 border">{item.tanggal_serah}</td>
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
                                            <td className="px-6 py-4 border space-x-2">
                                                <Link
                                                    href={route(
                                                        "realisasi-penyerahan.show",
                                                        item.id
                                                    )}
                                                    className="text-blue-500 hover:text-blue-700"
                                                    title="Detail"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faEye}
                                                    />
                                                </Link>

                                                <a
                                                    href={route("realisasi-penyerahan.print", item.id)}
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
                                            Tidak ada data PK.
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
