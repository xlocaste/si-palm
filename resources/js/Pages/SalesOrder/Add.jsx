import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Add({ auth, kontrak }) {
    const [values, setValues] = useState({
        no_sales_order: '',
        tanggal_sales_order: '',
        tahap: '',
        volume_sales_order: '',
        kontrak_id: '',
        nilai: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'kontrak_id' || name === 'volume_sales_order') {
            const newValues = { ...values, [name]: value };
            
            if (newValues.kontrak_id && newValues.volume_sales_order) {
                const selectedKontrak = kontrakData.find(k => k.id === parseInt(newValues.kontrak_id));
                
                if (selectedKontrak) {
                    const nilai = selectedKontrak.harga * newValues.volume_sales_order;
                    newValues.nilai = nilai;
                }
            }
            
            setValues(newValues);
        } else {
            setValues({
                ...values,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('sales-order.store'), values);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">Tambah Sales Order</h2>}
        >
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                <label>Volume Sales Order (ton)</label>
                                <input
                                    type="number"
                                    name="volume_sales_order"
                                    value={values.volume_sales_order}
                                    onChange={handleChange}
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
                                <label className="block mb-2">Pilih Kontrak</label>
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
                                />
                            </div>
                            <div className="text-right">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
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
