import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function List({ auth, ttd }) {
    const { data, setData, put, processing, errors } = useForm({
        sevp: ttd.sevp || '',
        ksbl: ttd.ksbl || '',
        kbpt: ttd.kbpt || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('ttd.update', ttd.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Daftar Nama Penandatangan</h2>}
        >
            <Head title="Daftar TTD" />

            <div className="py-6">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="sevp" className="block text-sm font-medium text-gray-700">Nama SEVP</label>
                                <input
                                    id="sevp"
                                    name="sevp"
                                    value={data.sevp}
                                    onChange={(e) => setData('sevp', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.sevp && <div className="text-red-600 text-sm mt-1">{errors.sevp}</div>}
                            </div>

                            <div>
                                <label htmlFor="ksbl" className="block text-sm font-medium text-gray-700">Nama KSBL</label>
                                <input
                                    id="ksbl"
                                    name="ksbl"
                                    value={data.ksbl}
                                    onChange={(e) => setData('ksbl', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.ksbl && <div className="text-red-600 text-sm mt-1">{errors.ksbl}</div>}
                            </div>

                            <div>
                                <label htmlFor="kbpt" className="block text-sm font-medium text-gray-700">Nama KBPT</label>
                                <input
                                    id="kbpt"
                                    name="kbpt"
                                    value={data.kbpt}
                                    onChange={(e) => setData('kbpt', e.target.value)}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                                {errors.kbpt && <div className="text-red-600 text-sm mt-1">{errors.kbpt}</div>}
                            </div>

                            <div className="flex justify-end">
                                <PrimaryButton type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Update'}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
