import { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { router } from "@inertiajs/react";
import Select from 'react-select';
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";

export default function Add({ auth, kontrak }) {
    const [values, setValues] = useState({
        no_invoice: '',
        tanggal_bayar: '',
        kontrak_id: '',
        nilai: '',
        ppn: '',
        jumlah: '',
        terbilang: '',
    });

    function toTerbilang(n) {
        const satuan = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];

        n = Math.floor(n);

        if (n < 12) return satuan[n];
        if (n < 20) return toTerbilang(n - 10) + " Belas";
        if (n < 100) return toTerbilang(Math.floor(n / 10)) + " Puluh " + toTerbilang(n % 10);
        if (n < 200) return "Seratus " + toTerbilang(n - 100);
        if (n < 1000) return toTerbilang(Math.floor(n / 100)) + " Ratus " + toTerbilang(n % 100);
        if (n < 2000) return "Seribu " + toTerbilang(n - 1000);
        if (n < 1000000) return toTerbilang(Math.floor(n / 1000)) + " Ribu " + toTerbilang(n % 1000);
        if (n < 1000000000) return toTerbilang(Math.floor(n / 1000000)) + " Juta " + toTerbilang(n % 1000000);
        if (n < 1000000000000) return toTerbilang(Math.floor(n / 1000000000)) + " Miliar " + toTerbilang(n % 1000000000);
        if (n < 1000000000000000) return toTerbilang(Math.floor(n / 1000000000000)) + " Triliun " + toTerbilang(n % 1000000000000);

        return "Angka terlalu besar";
    }

    useEffect(() => {
        const jumlah = parseFloat(values.jumlah) || 0;
        if (jumlah > 0) {
            setValues(prev => ({
                ...prev,
                terbilang: toTerbilang(jumlah).trim() + " Rupiah",
            }));
        } else {
            setValues(prev => ({
                ...prev,
                terbilang: '',
            }));
        }
    }, [values.jumlah]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const confirmed = window.confirm("Apakah Anda yakin ingin menyimpan data ini?");
        if (!confirmed) return;
        router.post(route('invoice.store'), values);
        console.log('Kirim data:', values);
    };

    const options = kontrak.map((k) => ({
        value: k.id,
        label: `${k.jenis_kontrak} - ${k.no_kontrak} - Harga: Rp${k.harga}, Volume: ${k.volume}`,
    }));

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
                                <label>No. Invoice</label>
                                <input type="text" name="no_invoice" value={values.no_invoice} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label>Tanggal Bayar</label>
                                <input type="date" name="tanggal_bayar" value={values.tanggal_bayar} onChange={handleChange} required className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block mb-1 font-medium">Pilih Kontrak</label>
                                <Select
                                    name="kontrak_id"
                                    options={options}
                                    value={options.find((opt) => opt.value === values.kontrak_id)}
                                    onChange={(selectedOption) => {
                                        const selected = kontrak.find(k => k.id === selectedOption?.value);
                                        const nilai = selected ? Number(selected.harga) * Number(selected.volume) : 0;
                                        const ppn = selected ? (selected.ppn / 100) * nilai : 0;
                                        const jumlah = nilai + ppn;

                                        setValues({
                                            ...values,
                                            kontrak_id: selectedOption ? selectedOption.value : '',
                                            nilai,
                                            ppn,
                                            jumlah,
                                        });
                                    }}
                                    isClearable
                                    placeholder="-- Pilih Kontrak --"
                                    className="text-sm"
                                />
                            </div>
                            <div>
                                <label>Nilai (Rp)</label>
                                <input
                                    type="number"
                                    name="nilai"
                                    value={values.nilai}
                                    readOnly
                                    className="w-full border p-2 rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label>PPN (Rp)</label>
                                <input
                                    type="number"
                                    name="ppn"
                                    value={values.ppn}
                                    readOnly
                                    className="w-full border p-2 rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label>Jumlah (Rp)</label>
                                <input
                                    type="number"
                                    name="jumlah"
                                    value={values.jumlah}
                                    readOnly
                                    className="w-full border p-2 rounded bg-gray-100"
                                />
                            </div>
                            <div>
                                <label>Terbilang</label>
                                <input
                                    type="text"
                                    name="terbilang"
                                    value={values.terbilang}
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
