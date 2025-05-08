import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Add({ auth, pembayaran }) {
    const [values, setValues] = useState({
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
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("kontrak.store"), values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Kontrak</h2>}
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center gap-6">
                        <div>
                            <label>No Kontrak</label>
                            <input type="text" name="no_kontrak" value={values.no_kontrak} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Jenis Kontrak</label>
                            <select name="jenis_kontrak" value={values.jenis_kontrak} onChange={handleChange} required className="w-full border p-2 rounded">
                                <option value="">-- Pilih --</option>
                                <option value="CPO">CPO</option>
                                <option value="PK">PK</option>
                            </select>
                        </div>
                        <div>
                            <label>Pembeli</label>
                            <input type="text" name="pembeli" value={values.pembeli} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Mutu</label>
                            <input type="text" name="mutu" value={values.mutu} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Harga</label>
                            <input type="number" name="harga" value={values.harga} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Volume</label>
                            <input type="number" name="volume" value={values.volume} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Tanggal Kontrak</label>
                            <input type="date" name="tanggal_kontrak" value={values.tanggal_kontrak} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Jatuh Tempo</label>
                            <input type="date" name="jatuh_tempo" value={values.jatuh_tempo} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Jenis Tempo Penyerahan</label>
                            <select name="jenis_tempo_penyerahan" value={values.jenis_tempo_penyerahan} onChange={handleChange} required className="w-full border p-2 rounded">
                                <option value="">-- Pilih --</option>
                                <option value="tender">Tender</option>
                                <option value="bid_offer">Bid Offer</option>
                            </select>
                        </div>
                        <div>
                            <label>Penjual & Pemilik Komoditas</label>
                            <input type="text" name="penjual_dan_pemilik_komoditas" value={values.penjual_dan_pemilik_komoditas} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>No Referensi</label>
                            <input type="text" name="no_referensi" value={values.no_referensi} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Komoditi</label>
                            <input type="text" name="komoditi" value={values.komoditi} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Jenis Komoditi</label>
                            <input type="text" name="jenis_komoditi" value={values.jenis_komoditi} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Symbol</label>
                            <input type="text" name="symbol" value={values.symbol} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Packaging</label>
                            <input type="text" name="packaging" value={values.packaging} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Deskripsi Produk</label>
                            <input type="text" name="deskripsi_produk" value={values.deskripsi_produk} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Produsen</label>
                            <input type="text" name="produsen" value={values.produsen} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Pelabuhan Muat</label>
                            <input type="text" name="pelabuhan_muat" value={values.pelabuhan_muat} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Harga Satuan</label>
                            <input type="number" name="harga_satuan" value={values.harga_satuan} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>PPN (%)</label>
                            <input type="number" name="ppn" value={values.ppn} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Kondisi Penyerahan</label>
                            <input type="text" name="kondisi_penyerahan" value={values.kondisi_penyerahan} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Pembayaran</label>
                            <select name="pembayaran_id" value={values.pembayaran_id} onChange={handleChange} required className="w-full border p-2 rounded">
                                <option value="">-- Pilih Pembayaran --</option>
                                {pembayaran.map((item) => (
                                    <option key={item.id} value={item.id}>{item.nama_bank}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Waktu Penyerahan</label>
                            <input type="datetime-local" name="waktu_penyerahan" value={values.waktu_penyerahan} onChange={handleChange} className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Syarat Lain</label>
                            <input type="text" name="syarat_lain" value={values.syarat_lain} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Dasar Ketentuan</label>
                            <input type="text" name="dasar_ketentuan" value={values.dasar_ketentuan} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>
                        <div>
                            <label>Jumlah Pembayaran</label>
                            <input type="number" name="jumlah_pembayaran" value={values.jumlah_pembayaran} onChange={handleChange} required className="w-full border p-2 rounded" />
                        </div>

                        <div className="col-span-2 flex justify-end">
                            <PrimaryButton type="submit">Simpan Kontrak</PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
