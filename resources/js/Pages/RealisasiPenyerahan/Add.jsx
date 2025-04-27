import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";

export default function Add({ auth, kontrak, invoice }) {
    const [values, setValues] = useState({
        kontrak_id: '',
        invoice_id: '',
        tanggal_serah: '',
        alb: '',
        ka: '',
        kk: '',
        no_ba: '',
        no_surat_penerbitan_invoice: '',
        tanggal_surat_invoice: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("realisasi-penyerahan.store"), values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Tambah Realisasi Penyerahan</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Kontrak */}
                            <div>
                                <label>Pilih Kontrak</label>
                                <select
                                    name="kontrak_id"
                                    value={values.kontrak_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- Pilih Kontrak --</option>
                                    {kontrak.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {`#${k.id} - Harga: Rp${k.harga}, Volume: ${k.volume}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Invoice */}
                            <div>
                                <label>Pilih Invoice</label>
                                <select
                                    name="invoice_id"
                                    value={values.invoice_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- Pilih Invoice --</option>
                                    {invoice.map((inv) => (
                                        <option key={inv.id} value={inv.id}>
                                            {`Invoice #${inv.no_invoice} - Tanggal: ${inv.tanggal_bayar}`}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tanggal Serah */}
                            <div>
                                <label>Tanggal Serah</label>
                                <input
                                    type="date"
                                    name="tanggal_serah"
                                    value={values.tanggal_serah}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* ALB */}
                            <div>
                                <label>ALB (%)</label>
                                <input
                                    type="number"
                                    name="alb"
                                    value={values.alb}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* KA */}
                            <div>
                                <label>KA (%)</label>
                                <input
                                    type="number"
                                    name="ka"
                                    value={values.ka}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* KK */}
                            <div>
                                <label>KK (%)</label>
                                <input
                                    type="number"
                                    name="kk"
                                    value={values.kk}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* No BA */}
                            <div>
                                <label>No. BA</label>
                                <input
                                    type="text"
                                    name="no_ba"
                                    value={values.no_ba}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* No Surat Penerbitan Invoice */}
                            <div>
                                <label>No. Surat Penerbitan Invoice</label>
                                <input
                                    type="text"
                                    name="no_surat_penerbitan_invoice"
                                    value={values.no_surat_penerbitan_invoice}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* Tanggal Surat Invoice */}
                            <div>
                                <label>Tanggal Surat Invoice</label>
                                <input
                                    type="date"
                                    name="tanggal_surat_invoice"
                                    value={values.tanggal_surat_invoice}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
