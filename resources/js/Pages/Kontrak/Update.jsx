import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ValidationErrors } from "@/Components/AlertMessage";

export default function Update({ auth, kontrak }) {
    const { data, setData, put, processing, errors } = useForm({
        no_kontrak: kontrak.no_kontrak || "",
        jenis_kontrak: kontrak.jenis_kontrak || "",
        pembeli: kontrak.pembeli || "",
        mutu: kontrak.mutu || "",
        harga: kontrak.harga || "",
        volume: kontrak.volume || "",
        tanggal_kontrak: kontrak.tanggal_kontrak || "",
        jatuh_tempo: kontrak.jatuh_tempo || "",
        jenis_tempo_penyerahan: kontrak.jenis_tempo_penyerahan || "",
        penjual_dan_pemilik_komoditas:
        kontrak.penjual_dan_pemilik_komoditas || "",
        no_referensi: kontrak.no_referensi || "",
        komoditi: kontrak.komoditi || "",
        jenis_komoditi: kontrak.jenis_komoditi || "",
        symbol: kontrak.symbol || "",
        packaging: kontrak.packaging || "",
        deskripsi_produk: kontrak.deskripsi_produk || "",
        produsen: kontrak.produsen || "",
        pelabuhan_muat: kontrak.pelabuhan_muat || "",
        harga_satuan: kontrak.harga_satuan || "",
        ppn: kontrak.ppn || "",
        kondisi_penyerahan: kontrak.kondisi_penyerahan || "",
        pembayaran: kontrak.pembayaran || "",
        metode: kontrak.metode || "",
        nama_bank: kontrak.nama_bank || "",
        cara_pembayaran: kontrak.cara_pembayaran || "",
        atas_nama: kontrak.atas_nama || "",
        rek_no: kontrak.rek_no || "",
        waktu_penyerahan: kontrak.waktu_penyerahan || "",
        syarat_lain: kontrak.syarat_lain || "",
        dasar_ketentuan: kontrak.dasar_ketentuan || "",
        jumlah_pembayaran: kontrak.jumlah_pembayaran || "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("kontrak.update", kontrak.id), {
            preserveState: true,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Kontrak
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-4">
                                <ValidationErrors errors={errors} />
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    No. Kontrak
                                </label>
                                <input
                                    type="text"
                                    name="no_kontrak"
                                    value={data.no_kontrak}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.no_kontrak
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                {errors.no_kontrak && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.no_kontrak}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Jenis Kontrak
                                </label>
                                <select
                                    name="jenis_kontrak"
                                    value={data.jenis_kontrak}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.jenis_kontrak
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                >
                                    <option value="">
                                        -- Pilih Jenis Kontrak --
                                    </option>
                                    <option value="CPO">CPO</option>
                                    <option value="PK">PK</option>
                                </select>
                                {errors.jenis_kontrak && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.jenis_kontrak}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Pembeli
                                </label>
                                <input
                                    type="text"
                                    name="pembeli"
                                    value={data.pembeli}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.pembeli ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.pembeli && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.pembeli}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Mutu
                                </label>
                                <input
                                    type="text"
                                    name="mutu"
                                    value={data.mutu}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.mutu ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.mutu && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.mutu}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Harga
                                </label>
                                <input
                                    type="number"
                                    name="harga"
                                    value={data.harga}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.harga ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.harga && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.harga}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Volume
                                </label>
                                <input
                                    type="number"
                                    name="volume"
                                    value={data.volume}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.volume ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.volume && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.volume}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Tanggal Kontrak
                                </label>
                                <input
                                    type="date"
                                    name="tanggal_kontrak"
                                    value={data.tanggal_kontrak}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.tanggal_kontrak
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                {errors.tanggal_kontrak && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.tanggal_kontrak}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Jatuh Tempo
                                </label>
                                <input
                                    type="date"
                                    name="jatuh_tempo"
                                    value={data.jatuh_tempo}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.jatuh_tempo
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                />
                                {errors.jatuh_tempo && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.jatuh_tempo}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">
                                    Jenis Tempo Penyerahan
                                </label>
                                <select
                                    name="jenis_tempo_penyerahan"
                                    value={data.jenis_tempo_penyerahan}
                                    onChange={handleChange}
                                    className={`w-full border p-2 rounded ${
                                        errors.jenis_tempo_penyerahan
                                            ? "border-red-500"
                                            : ""
                                    }`}
                                    required
                                >
                                    <option value="">
                                        -- Pilih Jenis Tempo Penyerahan --
                                    </option>
                                    <option value="tender">Tender</option>
                                    <option value="bid_offer">Bid Offer</option>
                                </select>
                                {errors.jenis_tempo_penyerahan && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.jenis_tempo_penyerahan}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Perbarui Kontrak"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
