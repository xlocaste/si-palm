import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ValidationErrors } from "@/Components/AlertMessage";

// Komponen input reusable
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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

// Komponen select reusable
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
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

<<<<<<< HEAD
// Komponen input reusable
function Input({ label, name, type = 'text', value, onChange, required = false }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            />
        </div>
    );
}

// Komponen select reusable
function Select({ label, name, options, value, onChange, required = false }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
            >
                <option value="">-- Pilih {label} --</option>
                {options.map(opt => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default function Add({ auth, pembayaran }) {
    const [values, setValues] = useState({
        no_kontrak: '',
        jenis_kontrak: '',
        pembeli: '',
        mutu: '',
        harga: '',
        volume: '',
        tanggal_kontrak: '',
        jatuh_tempo: '',
        jenis_tempo_penyerahan: '',
        penjual_dan_pemilik_komoditas: '',
        no_referensi: '',
        komoditi: '',
        jenis_komoditi: '',
        symbol: '',
        packaging: '',
        deskripsi_produk: '',
        produsen: '',
        pelabuhan_muat: '',
        harga_satuan: '',
        ppn: '',
        kondisi_penyerahan: '',
        pembayaran_id: '',
        waktu_penyerahan: '',
        syarat_lain: '',
        dasar_ketentuan: '',
        jumlah_pembayaran: '',
=======
export default function Add({ auth }) {
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
        pembayaran: "",
        metode: "",
        nama_bank: "",
        cara_pembayaran: "",
        atas_nama: "",
        rek_no: "",
        waktu_penyerahan: "",
        syarat_lain: "",
        dasar_ketentuan: "",
        jumlah_pembayaran: "",
>>>>>>> fitur_terbaru
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
                <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                    Tambah Kontrak
                </h2>
            }
        >
            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Tampilkan error validasi jika ada */}
                        {Object.keys(errors).length > 0 && (
                            <div className="mb-4">
                                <ValidationErrors errors={errors} />
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
<<<<<<< HEAD

                            {/* Kontrak Info */}
                            <Input label="No Kontrak" name="no_kontrak" value={values.no_kontrak} onChange={handleChange} required />
                            <Select label="Jenis Kontrak" name="jenis_kontrak" options={['CPO', 'PK']} value={values.jenis_kontrak} onChange={handleChange} required />
                            <Input label="Pembeli" name="pembeli" value={values.pembeli} onChange={handleChange} required />
                            <Input label="Mutu" name="mutu" type="number" value={values.mutu} onChange={handleChange} required />
                            <Input label="Harga" name="harga" type="number" value={values.harga} onChange={handleChange} required />
                            <Input label="Volume (ton)" name="volume" type="number" value={values.volume} onChange={handleChange} required />
                            <Input label="Tanggal Kontrak" name="tanggal_kontrak" type="date" value={values.tanggal_kontrak} onChange={handleChange} required />
                            <Input label="Jatuh Tempo" name="jatuh_tempo" type="date" value={values.jatuh_tempo} onChange={handleChange} required />
                            <Select label="Jenis Tempo Penyerahan" name="jenis_tempo_penyerahan" options={['tender', 'bid_offer']} value={values.jenis_tempo_penyerahan} onChange={handleChange} required />

                            {/* Produk Info */}
                            <Input label="Penjual & Pemilik Komoditas" name="penjual_dan_pemilik_komoditas" value={values.penjual_dan_pemilik_komoditas} onChange={handleChange} />
                            <Input label="No Referensi" name="no_referensi" value={values.no_referensi} onChange={handleChange} />
                            <Input label="Komoditi" name="komoditi" value={values.komoditi} onChange={handleChange} />
                            <Input label="Jenis Komoditi" name="jenis_komoditi" value={values.jenis_komoditi} onChange={handleChange} />
                            <Input label="Symbol" name="symbol" value={values.symbol} onChange={handleChange} />
                            <Input label="Packaging" name="packaging" value={values.packaging} onChange={handleChange} />
                            <Input label="Deskripsi Produk" name="deskripsi_produk" value={values.deskripsi_produk} onChange={handleChange} />
                            <Input label="Produsen" name="produsen" value={values.produsen} onChange={handleChange} />
                            <Input label="Pelabuhan Muat" name="pelabuhan_muat" value={values.pelabuhan_muat} onChange={handleChange} />
                            <Input label="Harga Satuan" name="harga_satuan" type="number" value={values.harga_satuan} onChange={handleChange} />
                            <Input label="PPN (%)" name="ppn" type="number" value={values.ppn} onChange={handleChange} />

                            {/* Pembayaran Info */}
                            <Input label="Kondisi Penyerahan" name="kondisi_penyerahan" value={values.kondisi_penyerahan} onChange={handleChange} />
                            <div>
                                <label htmlFor="pembayaran_id" className="block text-sm font-medium text-gray-700 dark:text-white">Pembayaran</label>
                                <select
                                    name="pembayaran_id"
                                    id="pembayaran_id"
                                    value={values.pembayaran_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- Pilih Pembayaran --</option>
                                    {pembayaran.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {`#${p.id} - ${p.metode} - ${p.nama_bank}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <Input label="Waktu Penyerahan" name="waktu_penyerahan" value={values.waktu_penyerahan} onChange={handleChange} />
                            <Input label="Syarat Lain" name="syarat_lain" value={values.syarat_lain} onChange={handleChange} />
                            <Input label="Dasar Ketentuan" name="dasar_ketentuan" value={values.dasar_ketentuan} onChange={handleChange} />
                            <Input label="Jumlah Pembayaran" name="jumlah_pembayaran" type="number" value={values.jumlah_pembayaran} onChange={handleChange} />
=======
                            {/* Kontrak Info */}
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

                            {/* Produk Info */}
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

                            {/* Pembayaran Info */}
                            <Input
                                label="Kondisi Penyerahan"
                                name="kondisi_penyerahan"
                                value={data.kondisi_penyerahan}
                                onChange={handleChange}
                                error={errors.kondisi_penyerahan}
                            />
                            <Input
                                label="Pembayaran"
                                name="pembayaran"
                                value={data.pembayaran}
                                onChange={handleChange}
                                error={errors.pembayaran}
                            />
                            <Input
                                label="Metode"
                                name="metode"
                                value={data.metode}
                                onChange={handleChange}
                                error={errors.metode}
                            />
                            <Input
                                label="Nama Bank"
                                name="nama_bank"
                                value={data.nama_bank}
                                onChange={handleChange}
                                error={errors.nama_bank}
                            />
                            <Input
                                label="Cara Pembayaran"
                                name="cara_pembayaran"
                                value={data.cara_pembayaran}
                                onChange={handleChange}
                                error={errors.cara_pembayaran}
                            />
                            <Input
                                label="Atas Nama"
                                name="atas_nama"
                                value={data.atas_nama}
                                onChange={handleChange}
                                error={errors.atas_nama}
                            />
                            <Input
                                label="No Rekening"
                                name="rek_no"
                                value={data.rek_no}
                                onChange={handleChange}
                                error={errors.rek_no}
                            />
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
>>>>>>> fitur_terbaru

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
                                    disabled={processing}
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Kontrak"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
