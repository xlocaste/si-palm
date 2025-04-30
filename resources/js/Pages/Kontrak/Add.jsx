import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

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
    });

    const handleChange = (e) => {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('kontrak.store'), values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Tambah Kontrak</h2>}
        >
            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">

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

                            <div className="flex justify-end">
                                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded">
                                    Simpan Kontrak
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
