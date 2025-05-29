import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import Select from 'react-select';

export default function Add({ auth, kontrak, invoice }) {
    console.log(invoice)
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

    const options = kontrak.map((k) => ({
        value: k.id,
        label: `${k.jenis_kontrak} - ${k.no_kontrak} - Harga: Rp${k.harga}, Volume: ${k.volume}`,
    }));

    const invoiceOptions = invoice.map((inv) => ({
        value: inv.id,
        label: `Invoice #${inv.no_invoice} - No Kontrak ${inv.kontrak.no_kontrak} -  Tanggal: ${inv.tanggal_bayar}`,
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Realisasi Penyerahan</h2>}
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center gap-6">
                            <div>
                                <label className="block mb-1 font-medium">Pilih Kontrak</label>
                                <Select
                                    name="kontrak_id"
                                    options={options}
                                    value={options.find((opt) => opt.value === values.kontrak_id)}
                                    onChange={(selectedOption) => {
                                        const selected = kontrak.find(k => k.id === selectedOption?.value);
                                        const nilai = selected ? Number(selected.harga) * Number(selected.volume) : '';
                                        setValues({
                                            ...values,
                                            kontrak_id: selectedOption ? selectedOption.value : '',
                                            nilai,
                                        });
                                    }}
                                    isClearable
                                    placeholder="-- Pilih Kontrak --"
                                    className="text-sm"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Pilih Invoice</label>
                                <Select
                                    name="invoice_id"
                                    options={invoiceOptions}
                                    value={invoiceOptions.find((opt) => opt.value === values.invoice_id)}
                                    onChange={(selectedOption) => {
                                        setValues({
                                            ...values,
                                            invoice_id: selectedOption ? selectedOption.value : '',
                                        });
                                    }}
                                    isClearable
                                    placeholder="-- Pilih Invoice --"
                                    className="text-sm"
                                />
                            </div>

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

                            <div className="col-span-2 flex justify-end">
                                <PrimaryButton type="submit">Simpan</PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
