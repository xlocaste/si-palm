import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Update({ auth, salesOrder }) {
    const [values, setValues] = useState({
        no_sales_order: salesOrder.no_sales_order || '',
        tanggal_sales_order: salesOrder.tanggal_sales_order || '',
        tahap: salesOrder.tahap || '',
        volume_sales_order: salesOrder.volume_sales_order || '',
        nilai: salesOrder.nilai || '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        router.put(route('sales-order.update', salesOrder.id), values, {
            onSuccess: () => {
                alert('Sales order berhasil diperbarui!');
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-white leading-tight">
                    Edit Sales Order
                </h2>
            }
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
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label>Tanggal Sales Order</label>
                                <input
                                    type="date"
                                    name="tanggal_sales_order"
                                    value={values.tanggal_sales_order}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label>Volume Sales Order</label>
                                <input
                                    type="number"
                                    name="volume_sales_order"
                                    value={values.volume_sales_order}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label>Nilai</label>
                                <input
                                    type="number"
                                    name="nilai"
                                    value={values.nilai}
                                    onChange={handleChange}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Perbarui
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
