import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

export default function Dashboard({ auth, datasets, labels, realisasi}) {
    console.log(datasets)
    const data = labels.map((label, index) => ({
        bulan: label,
        cpo: datasets.cpo[index],
        pk: datasets.pk[index],
    }));

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Grafik Kontrak" />

            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white shadow rounded-lg p-4 flex items-center">
                            <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-500">Total CPO</h4>
                            <p className="mt-1 text-2xl font-semibold text-indigo-600">
                                {realisasi.cpo}
                            </p>
                            </div>
                            <div>
                            <svg className="w-8 h-8 text-indigo-200" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 6h14M3 10h14M3 14h14"/>
                            </svg>
                            </div>
                        </div>
                        <div className="bg-white shadow rounded-lg p-4 flex items-center">
                            <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-500">Total PK</h4>
                            <p className="mt-1 text-2xl font-semibold text-green-500">
                                {realisasi.pk}
                            </p>
                            </div>
                            <div>
                            <svg className="w-8 h-8 text-green-200" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 6h14M3 10h14M3 14h14"/>
                            </svg>
                            </div>
                        </div>
                    </div>
                    <h3 className="text-xl font-semibold my-4">
                        Grafik Kontrak per Bulan (Tahun Ini)
                    </h3>

                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="bulan" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="cpo"
                                stroke="#6366f1"
                                name="CPO"
                            />
                            <Line
                                type="monotone"
                                dataKey="pk"
                                stroke="#10b981"
                                name="PK"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

