import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";

export default function Update({ auth, realisasiPenyerahan, kontrak, invoice }) {
    const [values, setValues] = useState({
        kontrak_id: realisasiPenyerahan.kontrak_id || '',
        invoice_id: realisasiPenyerahan.invoice_id || '',
        tanggal_serah: realisasiPenyerahan.tanggal_serah || '',
        alb: realisasiPenyerahan.alb || '',
        ka: realisasiPenyerahan.ka || '',
        kk: realisasiPenyerahan.kk || '',
        no_ba: realisasiPenyerahan.no_ba || '',
        no_surat_penerbitan_invoice: realisasiPenyerahan.no_surat_penerbitan_invoice || '',
        tanggal_surat_invoice: realisasiPenyerahan.tanggal_surat_invoice || '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route("realisasi-penyerahan.update", realisasiPenyerahan.id), values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Update Realisasi Penyerahan</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>KONTRAK</label>
                                <select name="kontrak_id" value={values.kontrak_id} onChange={handleChange} className="w-full border p-2 rounded">
                                    <option value="">-- Pilih Kontrak --</option>
                                    {kontrak.map(k => (
                                        <option key={k.id} value={k.id}>
                                            #{k.id} - {k.no_kontrak}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>INVOICE</label>
                                <select name="invoice_id" value={values.invoice_id} onChange={handleChange} className="w-full border p-2 rounded">
                                    <option value="">-- Pilih Invoice --</option>
                                    {invoice.map(i => (
                                        <option key={i.id} value={i.id}>
                                            #{i.id} - {i.no_invoice}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Tanggal Serah</label>
                                <input type="date" name="tanggal_serah" value={values.tanggal_serah} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label>ALB (%)</label>
                                    <input type="number" step="0.01" name="alb" value={values.alb} onChange={handleChange} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label>KA (%)</label>
                                    <input type="number" step="0.01" name="ka" value={values.ka} onChange={handleChange} className="w-full border p-2 rounded" />
                                </div>
                                <div>
                                    <label>KK (%)</label>
                                    <input type="number" step="0.01" name="kk" value={values.kk} onChange={handleChange} className="w-full border p-2 rounded" />
                                </div>
                            </div>

                            <div>
                                <label>No. BA</label>
                                <input type="text" name="no_ba" value={values.no_ba} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>

                            <div>
                                <label>No. Surat Penerbitan Invoice</label>
                                <input type="text" name="no_surat_penerbitan_invoice" value={values.no_surat_penerbitan_invoice} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>

                            <div>
                                <label>Tanggal Surat Invoice</label>
                                <input type="date" name="tanggal_surat_invoice" value={values.tanggal_surat_invoice} onChange={handleChange} className="w-full border p-2 rounded" />
                            </div>

                            <div className="text-right">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
