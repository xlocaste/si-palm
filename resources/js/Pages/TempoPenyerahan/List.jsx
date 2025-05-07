import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, usePage } from "@inertiajs/react";
import { IoIosSearch } from "react-icons/io";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/Modal";
import DetailView from "@/Components/DetailView";
import PrimaryButton from "@/Components/PrimaryButton";

export default function List({ auth, kontrakCPO, kontrakPK, jenis_tempo_penyerahan }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [search, setSearch] = useState(jenis_tempo_penyerahan || "");
    const [selectedJenisTempo, setSelectedJenisTempo] = useState(jenis_tempo_penyerahan || '');

    const handleFilterChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedJenisTempo(selectedValue);
        router.get('/tempo-penyerahan', {
            jenis_tempo_penyerahan: selectedValue,
        }, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("tempo-penyerahan.index"), { jenis_tempo_penyerahan: search }, { preserveState: true });
    };

    const openDetailModal = (item, type) => {
        setSelectedItem(item);
        setModalTitle(`Detail Kontrak ${type.toUpperCase()}: ${item.no_kontrak || "-"}`);
        setModalOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tempo Penyerahan</h2>}
        >
            <Head title="Tempo Penyerahan" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-end mb-6 gap-4">
                        {/* <form onSubmit={handleSearch} className="w-1/2 flex items-center gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari..."
                                className="border px-3 pr-40 py-2 rounded-md text-sm"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-3 rounded-md text-sm"
                            >
                                <IoIosSearch />
                            </button>
                        </form> */}
                    </div>

                    <div className="flex items-end justify-between ">
                        <label className="font-bold text-gray-700">TABEL KONTRAK CPO</label>
                        <div className="w-1/3">
                            <p className="text-sm text-gray-700 mb-2">Filter Jenis Tempo</p>
                            <select
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                                value={selectedJenisTempo}
                                onChange={handleFilterChange}
                            >
                                <option value="">Semua</option>
                                <option value="tender">Tender</option>
                                <option value="bid_offer">Bit Offer</option>
                            </select>
                        </div>
                    </div>
                    <div className="overflow-auto mt-6">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border">No Kontrak</th>
                                    <th className="px-6 py-3 border">Pembeli</th>
                                    <th className="px-6 py-3 border">Mutu</th>
                                    <th className="px-6 py-3 border">Harga</th>
                                    <th className="px-6 py-3 border">Volume</th>
                                    <th className="px-6 py-3 border">Tanggal Kontrak</th>
                                    <th className="px-6 py-3 border">Jenis Tempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kontrakCPO.length > 0 ? (
                                    kontrakCPO.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 border">{item.no_kontrak}</td>
                                            <td className="px-6 py-4 border">{item.pembeli}</td>
                                            <td className="px-6 py-4 border">{item.mutu}</td>
                                            <td className="px-6 py-4 border">Rp {parseFloat(item.harga).toLocaleString()}</td>
                                            <td className="px-6 py-4 border">{item.volume}</td>
                                            <td className="px-6 py-4 border">{item.tanggal_kontrak}</td>
                                            <td className="px-6 py-4 border">{item.jenis_tempo_penyerahan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-400">
                                            Tidak ada data kontrak.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6 mt-6">
                    <label className="font-bold text-gray-700">TABEL KONTRAK PK</label>
                    <div className="overflow-auto mt-6">
                        <table className="min-w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 border">No Kontrak</th>
                                    <th className="px-6 py-3 border">Pembeli</th>
                                    <th className="px-6 py-3 border">Mutu</th>
                                    <th className="px-6 py-3 border">Harga</th>
                                    <th className="px-6 py-3 border">Volume</th>
                                    <th className="px-6 py-3 border">Tanggal Kontrak</th>
                                    <th className="px-6 py-3 border">Jenis Tempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {kontrakPK.length > 0 ? (
                                    kontrakPK.map((item, index) => (
                                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 border">{item.no_kontrak}</td>
                                            <td className="px-6 py-4 border">{item.pembeli}</td>
                                            <td className="px-6 py-4 border">{item.mutu}</td>
                                            <td className="px-6 py-4 border">Rp {parseFloat(item.harga).toLocaleString()}</td>
                                            <td className="px-6 py-4 border">{item.volume}</td>
                                            <td className="px-6 py-4 border">{item.tanggal_kontrak}</td>
                                            <td className="px-6 py-4 border">{item.jenis_tempo_penyerahan}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-400">
                                            Tidak ada data kontrak.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
                {selectedItem && <DetailView data={selectedItem} />}
            </Modal>
        </AuthenticatedLayout>
    );
}
