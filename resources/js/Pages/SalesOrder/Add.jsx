import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Add({ auth, kontrak }) {
    const [values, setValues] = useState({
        no_sales_order: '',
        tanggal_sales_order: '',
        tahap: '',
        volume_sales_order: '',
        kontrak_id: '',
        nilai: '',
    });

    useEffect(() => {
        const selectedKontrak = kontrak.find(k => k.id === parseInt(values.kontrak_id));
        const volume = parseFloat(values.volume_sales_order);

        if (selectedKontrak && !isNaN(volume)) {
            setValues(prev => ({
                ...prev,
                nilai: selectedKontrak.harga * volume
            }));
        } else {
            setValues(prev => ({
                ...prev,
                nilai: ''
            }));
        }
    }, [values.kontrak_id, values.volume_sales_order]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        setValues({
            ...values,
            [name]: type === "number" ? (value === '' ? '' : parseFloat(value)) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('sales-order.store'), values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Invoice</h2>}
        >
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 items-center gap-6">
                            <div>
                                <label>No. Sales Order</label>
                                <input
                                    type="text"
                                    name="no_sales_order"
                                    value={values.no_sales_order}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label>Tanggal Sales Order</label>
                                <input
                                    type="date"
                                    name="tanggal_sales_order"
                                    value={values.tanggal_sales_order}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label>Volume Sales Order</label>
                                <input
                                    type="number"
                                    name="volume_sales_order"
                                    value={values.volume_sales_order}
                                    onChange={handleChange}
                                    step="any"
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label>Tahap</label>
                                <input
                                    type="number"
                                    name="tahap"
                                    value={values.tahap}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label htmlFor="kontrak_id" className="block text-sm font-medium text-gray-700">Kontrak</label>
                                <select
                                    name="kontrak_id"
                                    id="kontrak_id"
                                    value={values.kontrak_id}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                >
                                    <option value="">-- Pilih Kontrak --</option>
                                    {kontrak.map((k) => (
                                        <option key={k.id} value={k.id}>
                                            {`#${k.id} - No.Kontrak: ${k.no_kontrak} - Harga: Rp${k.harga.toLocaleString('id-ID')} - Volume: ${k.volume.toLocaleString()}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Nilai</label>
                                <input
                                    type="number"
                                    name="nilai"
                                    value={values.nilai}
                                    onChange={handleChange}
                                    required
                                    className="w-full border p-2 rounded"
                                    readOnly
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
