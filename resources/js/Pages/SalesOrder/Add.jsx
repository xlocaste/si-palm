import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import Select from 'react-select';

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
        const confirmed = window.confirm("Apakah Anda yakin ingin menyimpan data ini?");
        if (!confirmed) return;
        router.post(route('sales-order.store'), values);
    };

    const options = kontrak.map((k) => ({
        value: k.id,
        label: `${k.jenis_kontrak} - ${k.no_kontrak} - Harga: Rp${k.harga}, Volume: ${k.volume}`,
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Sales Order</h2>}
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
