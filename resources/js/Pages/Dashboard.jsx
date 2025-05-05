import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatRupiah } from "@/Utils/formatRupiah";

export default function Dashboard({
    auth,
    kontrakData,
    kontrakMendekatiJatuhTempo,
    kontrakJatuhTempo,
    chartData,
    totalCPO,
    totalKernel,
}) {
    const [showAlert, setShowAlert] = useState(true);
    const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
    const [alertType, setAlertType] = useState("approaching"); // "approaching" atau "overdue"

    // Data untuk alert yang akan dirotasi
    const alerts = [
        ...kontrakMendekatiJatuhTempo.map((kontrak) => ({
            type: "approaching",
            kontrak,
        })),
        ...kontrakJatuhTempo.map((kontrak) => ({
            type: "overdue",
            kontrak,
        })),
    ];

    // Rotasi alert setiap 5 detik jika ada lebih dari satu alert
    useEffect(() => {
        if (alerts.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentAlertIndex(
                (prevIndex) => (prevIndex + 1) % alerts.length
            );
            setAlertType(alerts[(currentAlertIndex + 1) % alerts.length].type);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentAlertIndex, alerts.length]);

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
                            SELAMAT DATANG DI SISTEM INFORMASI KONTRAK PEMBELIAN
                            SAWIT PTPN IV
                        </div>
                    </div>
                }
            >
                <Head title="Dashboard" />

                <div className="py-6 px-6 space-y-6">
                    {/* Notifikasi Kontrak Jatuh Tempo */}
                    {alerts.length > 0 && showAlert && (
                        <div
                            className={`rounded-lg p-4 mb-4 flex justify-between items-center ${
                                alerts[currentAlertIndex].type === "approaching"
                                    ? "bg-yellow-100 border border-yellow-400 text-yellow-700"
                                    : "bg-red-100 border border-red-400 text-red-700"
                            }`}
                        >
                            <div>
                                <div className="font-bold">
                                    {alerts[currentAlertIndex].type ===
                                    "approaching"
                                        ? "Kontrak Mendekati Jatuh Tempo!"
                                        : "Kontrak Sudah Melewati Jatuh Tempo!"}
                                </div>
                                <div>
                                    Kontrak No:{" "}
                                    {
                                        alerts[currentAlertIndex].kontrak
                                            .no_kontrak
                                    }{" "}
                                    - Jatuh tempo pada:{" "}
                                    {new Date(
                                        alerts[
                                            currentAlertIndex
                                        ].kontrak.jatuh_tempo
                                    ).toLocaleDateString("id-ID")}{" "}
                                    - Jumlah:{" "}
                                    {formatRupiah(
                                        alerts[currentAlertIndex].kontrak
                                            .volume *
                                            alerts[currentAlertIndex].kontrak
                                                .harga
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAlert(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                &times;
                            </button>
                        </div>
                    )}

     

                    {/* Tabel Kontrak Mendekati Jatuh Tempo */}
                    {kontrakMendekatiJatuhTempo.length > 0 && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4">
                                Kontrak Mendekati Jatuh Tempo (7 Hari Ke Depan)
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No Kontrak
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Komoditi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Volume
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jatuh Tempo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {kontrakMendekatiJatuhTempo.map(
                                            (kontrak) => (
                                                <tr
                                                    key={kontrak.id}
                                                    className="hover:bg-yellow-50"
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {kontrak.no_kontrak}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {kontrak.komoditi}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {kontrak.volume}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {formatRupiah(
                                                            kontrak.volume *
                                                                kontrak.harga
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">
                                                        {new Date(
                                                            kontrak.jatuh_tempo
                                                        ).toLocaleDateString(
                                                            "id-ID"
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Tabel Kontrak Lewat Jatuh Tempo */}
                    {kontrakJatuhTempo.length > 0 && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-4 text-red-600">
                                Kontrak Melewati Jatuh Tempo
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                No Kontrak
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Komoditi
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Volume
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Jatuh Tempo
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {kontrakJatuhTempo.map((kontrak) => (
                                            <tr
                                                key={kontrak.id}
                                                className="hover:bg-red-50"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {kontrak.no_kontrak}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {kontrak.komoditi}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {kontrak.volume}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {formatRupiah(
                                                        kontrak.volume *
                                                            kontrak.harga
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                                                    {new Date(
                                                        kontrak.jatuh_tempo
                                                    ).toLocaleDateString(
                                                        "id-ID"
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
}
