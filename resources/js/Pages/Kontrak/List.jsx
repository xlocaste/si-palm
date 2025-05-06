import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import DetailView from "@/Components/DetailView";

export default function List({ auth, kontrakPK, kontrakCPO }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalTitle, setModalTitle] = useState("");

    const openDetailModal = (item, type) => {
        setSelectedItem(item);
        setModalTitle(
            `Detail Kontrak ${
                type === "cpo" ? "Minyak Sawit (CPO)" : "Inti Sawit (PK)"
            }: ${item.no_kontrak}`
        );
        setModalOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Daftar Kontrak
                </h2>
            }
        >
            <Head title="Daftar Kontrak" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <label className="font-bold text-gray-700 ">
                            TABEL MINYAK SAWIT (CPO)
                        </label>

                        <div className="overflow-auto mt-6">
                            <table className="min-w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 border">No Kontrak</th>
                                        <th className="px-6 py-3 border">Pembeli</th>
                                        <th className="px-6 py-3 border">Volume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kontrakCPO.length > 0 ? (
                                        kontrakCPO.map((item, index) => (
                                            <tr key={index} className="bg-white border-b -800 hover:bg-gray-50 -gray-600">
                                                <td className="px-6 py-4 border">{item.no_kontrak}</td>
                                                <td className="px-6 py-4 border">{item.pembeli}</td>
                                                <td className="px-6 py-4 border">{item.volume}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-gray-400">
                                                Tidak ada data kontrak.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-right mt-4">
                            <Link
                                href={route("kontrak-cpo.index")}
                                className="text-black-500 hover:underline inline-flex items-center gap-1"
                            >
                                <FontAwesomeIcon icon={faEye} /> Detail CPO
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
                    <div className="bg-white -800 overflow-hidden shadow-sm sm:rounded-lg">
                        <label className="font-bold text-gray-700 ">
                            TABEL INTI SAWIT (KERNEL / PK)
                        </label>

                        <div className="overflow-x-auto mt-6">
                            <table className="min-w-full text-sm text-left text-gray-500">
                                <thead className="text-xs text-gray-700 bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-3 border">No Kontrak</th>
                                        <th className="px-6 py-3 border">Pembeli</th>
                                        <th className="px-6 py-3 border">Volume</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {kontrakPK.length > 0 ? (
                                        kontrakPK.map((item, index) => (
                                            <tr key={index} className="bg-white border-b -800 -700 hover:bg-gray-50 -gray-600">
                                                <td className="px-6 py-4 border">{item.no_kontrak}</td>
                                                <td className="px-6 py-4 border">{item.pembeli}</td>
                                                <td className="px-6 py-4 border">{item.volume}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center py-4 text-gray-400">
                                                Tidak ada data kontrak.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-right mt-4">
                            <Link
                                href={route("kontrak-pk.index")}
                                className="text-black-500 hover:underline inline-flex items-center gap-1"
                            >
                                <FontAwesomeIcon icon={faEye} /> Detail PK
                            </Link>
                        </div>
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
