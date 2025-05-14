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

export default function Dashboard({ auth, datasets, labels }) {
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
                    <h3 className="text-xl font-semibold mb-4">
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

