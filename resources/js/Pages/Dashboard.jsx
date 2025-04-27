import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard({ auth }) {
    const data = [
        { name: 'Jan', cpo: 4000, kernel: 2400 },
        { name: 'Feb', cpo: 3000, kernel: 1398 },
        { name: 'Mar', cpo: 2000, kernel: 9800 },
        { name: 'Apr', cpo: 2780, kernel: 3908 },
        { name: 'May', cpo: 1890, kernel: 4800 },
    ];

    return (
        <>
            {/* Custom CSS untuk animasi berjalan */}
            <style>
                {`
                @keyframes marquee {
                    0%   { transform: translateX(100%); }
                    100% { transform: translateX(-100%); }
                }
                .animate-marquee {
                    animation: marquee 15s linear infinite;
                }
                `}
            </style>

            <AuthenticatedLayout
                user={auth.user}
                header={
                    <div className="overflow-hidden whitespace-nowrap relative w-full bg-white py-2">
                        <div className="inline-block animate-marquee text-xl font-semibold text-gray-800">
                            SELAMAT DATANG DI SISTEM INFORMASI KONTRAK PEMBELIAN SAWIT PTPN IV
                        </div>
                    </div>
                }
            >
                <Head title="Dashboard" />

                <div className="py-6 px-6 space-y-6">
                    {/* Kotak info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="text-sm text-gray-500">Total Penjualan CPO</div>
                            <div className="text-xl font-semibold">Rp 250.000.000</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="text-sm text-gray-500">Total Penjualan Kernel</div>
                            <div className="text-xl font-semibold">Rp 125.000.000</div>
                        </div>
                    </div>

                    {/* Grafik Penjualan */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Grafik Penjualan CPO dan Kernel</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cpo" fill="#4F46E5" name="CPO" />
                                <Bar dataKey="kernel" fill="#10B981" name="Kernel" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
