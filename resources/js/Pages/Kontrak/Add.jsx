import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ValidationErrors } from "@/Components/AlertMessage";
import PrimaryButton from "@/Components/PrimaryButton";

function Input({
    label,
    name,
    type = "text",
    value,
    onChange,
    required = false,
    error = null,
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 200">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 ${
                    error ? "border-red-500" : ""
                }`}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

function Select({
    label,
    name,
    options,
    value,
    onChange,
    required = false,
    error = null,
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 200">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 ${
                    error ? "border-red-500" : ""
                }`}
            >
                <option value="">-- Pilih {label} --</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}
export default function Add({ auth, pembayaran }) {
    const { data, setData, post, processing, errors } = useForm({
        no_kontrak: "",
        jenis_kontrak: "",
        pembeli: "",
        mutu: "",
        harga: "",
        volume: "",
        tanggal_kontrak: "",
        jatuh_tempo: "",
        jenis_tempo_penyerahan: "",
        penjual_dan_pemilik_komoditas: "",
        no_referensi: "",
        komoditi: "",
        jenis_komoditi: "",
        symbol: "",
        packaging: "",
        deskripsi_produk: "",
        produsen: "",
        pelabuhan_muat: "",
        harga_satuan: "",
        ppn: "",
        kondisi_penyerahan: "",
        pembayaran_id: "",
        waktu_penyerahan: "",
        syarat_lain: "",
        dasar_ketentuan: "",
        jumlah_pembayaran: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kontrak.store"));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Kontrak
                </h2>
            }
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="shadow-sm sm:rounded-lg p-6">
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-4">
                                <ValidationErrors errors={errors} />
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center gap-6">
                            <Input
                                label="No Kontrak"
                                name="no_kontrak"
                                value={data.no_kontrak}
                                onChange={handleChange}
                                required
                                error={errors.no_kontrak}
                            />
                            <Select
                                label="Jenis Kontrak"
                                name="jenis_kontrak"
                                options={["CPO", "PK"]}
                                value={data.jenis_kontrak}
                                onChange={handleChange}
                                required
                                error={errors.jenis_kontrak}
                            />
                            <Input
                                label="Pembeli"
                                name="pembeli"
                                value={data.pembeli}
                                onChange={handleChange}
                                required
                                error={errors.pembeli}
                            />
                            <Input
                                label="Mutu"
                                name="mutu"
                                value={data.mutu}
                                onChange={handleChange}
                                required
                                error={errors.mutu}
                            />
                            <Input
                                label="Harga"
                                name="harga"
                                type="number"
                                value={data.harga}
                                onChange={handleChange}
                                required
                                error={errors.harga}
                            />
                            <Input
                                label="Volume (ton)"
                                name="volume"
                                type="number"
                                value={data.volume}
                                onChange={handleChange}
                                required
                                error={errors.volume}
                            />
                            <Input
                                label="Tanggal Kontrak"
                                name="tanggal_kontrak"
                                type="date"
                                value={data.tanggal_kontrak}
                                onChange={handleChange}
                                required
                                error={errors.tanggal_kontrak}
                            />
                            <Input
                                label="Jatuh Tempo"
                                name="jatuh_tempo"
                                type="date"
                                value={data.jatuh_tempo}
                                onChange={handleChange}
                                required
                                error={errors.jatuh_tempo}
                            />
                            <Select
                                label="Jenis Tempo Penyerahan"
                                name="jenis_tempo_penyerahan"
                                options={["tender", "bid_offer"]}
                                value={data.jenis_tempo_penyerahan}
                                onChange={handleChange}
                                required
                                error={errors.jenis_tempo_penyerahan}
                            />

                            <Input
                                label="Penjual & Pemilik Komoditas"
                                name="penjual_dan_pemilik_komoditas"
                                value={data.penjual_dan_pemilik_komoditas}
                                onChange={handleChange}
                                error={errors.penjual_dan_pemilik_komoditas}
                            />
                            <Input
                                label="No Referensi"
                                name="no_referensi"
                                value={data.no_referensi}
                                onChange={handleChange}
                                error={errors.no_referensi}
                            />
                            <Input
                                label="Komoditi"
                                name="komoditi"
                                value={data.komoditi}
                                onChange={handleChange}
                                error={errors.komoditi}
                            />
                            <Input
                                label="Jenis Komoditi"
                                name="jenis_komoditi"
                                value={data.jenis_komoditi}
                                onChange={handleChange}
                                error={errors.jenis_komoditi}
                            />
                            <Input
                                label="Symbol"
                                name="symbol"
                                value={data.symbol}
                                onChange={handleChange}
                                error={errors.symbol}
                            />
                            <Input
                                label="Packaging"
                                name="packaging"
                                value={data.packaging}
                                onChange={handleChange}
                                error={errors.packaging}
                            />
                            <Input
                                label="Deskripsi Produk"
                                name="deskripsi_produk"
                                value={data.deskripsi_produk}
                                onChange={handleChange}
                                error={errors.deskripsi_produk}
                            />
                            <Input
                                label="Produsen"
                                name="produsen"
                                value={data.produsen}
                                onChange={handleChange}
                                error={errors.produsen}
                            />
                            <Input
                                label="Pelabuhan Muat"
                                name="pelabuhan_muat"
                                value={data.pelabuhan_muat}
                                onChange={handleChange}
                                error={errors.pelabuhan_muat}
                            />
                            <Input
                                label="Harga Satuan"
                                name="harga_satuan"
                                type="number"
                                value={data.harga_satuan}
                                onChange={handleChange}
                                error={errors.harga_satuan}
                            />
                            <Input
                                label="PPN (%)"
                                name="ppn"
                                type="number"
                                value={data.ppn}
                                onChange={handleChange}
                                error={errors.ppn}
                            />

                            <Input
                                label="Kondisi Penyerahan"
                                name="kondisi_penyerahan"
                                value={data.kondisi_penyerahan}
                                onChange={handleChange}
                                error={errors.kondisi_penyerahan}
                            />

                            <div>
                                <label className="block text-sm font-medium mb-2">Pembayaran</label>
                                <select
                                    name="pembayaran_id"
                                    value={data.pembayaran_id}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- Pilih Pembayaran --</option>
                                    {pembayaran.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.nama_bank}
                                    </option>
                                    ))}
                                </select>
                                {errors.pembayaran && (
                                    <p className="text-red-500 text-xs mt-1">{errors.pembayaran}</p>
                                )}
                            </div>
                            <Input
                                type="datetime-local"
                                label="Waktu Penyerahan"
                                name="waktu_penyerahan"
                                value={data.waktu_penyerahan}
                                onChange={handleChange}
                                error={errors.waktu_penyerahan}
                            />
                            <Input
                                label="Syarat Lain"
                                name="syarat_lain"
                                value={data.syarat_lain}
                                onChange={handleChange}
                                error={errors.syarat_lain}
                            />
                            <Input
                                label="Dasar Ketentuan"
                                name="dasar_ketentuan"
                                value={data.dasar_ketentuan}
                                onChange={handleChange}
                                error={errors.dasar_ketentuan}
                            />
                            <Input
                                label="Jumlah Pembayaran"
                                name="jumlah_pembayaran"
                                type="number"
                                value={data.jumlah_pembayaran}
                                onChange={handleChange}
                                error={errors.jumlah_pembayaran}
                            />

                            <div className="col-span-2 flex justify-end">
                                <PrimaryButton type="submit" disabled={processing}>
                                    {processing ? "Menyimpan..." : "Simpan Kontrak"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
