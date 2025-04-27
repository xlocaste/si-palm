import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Sistem Informasi Penjualan Sawit" />

            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-green-100 dark:bg-green-900 selection:bg-green-500 selection:text-white">


                {/* Top Right Auth Buttons */}
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:outline-red-500"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8 text-center">
                    {/* Logo Laravel */}
                    <div className="flex justify-center mb-6">
                        <svg
                            viewBox="0 0 62 65"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-auto bg-gray-100 dark:bg-gray-900"
                        >
                            <path
                                d="M61.8548 14.6253C61.8778 14.7102..." // Logo path (boleh kamu biarkan atau ganti)
                                fill="#FF2D20"
                            />
                        </svg>
                    </div>

                    {/* Banner Gambar */}
                    <div className="mt-6">
                        <img
                            src="/image/ptpn.jpg"
                            alt="Banner Sistem Informasi Penjualan Sawit"
                            className="w-full max-h-[400px] object-cover rounded-lg shadow"
                            loading="lazy"
                        />
                    </div>

                    {/* Judul dan Deskripsi */}
                    <h1 className="mt-10 text-4xl font-bold text-gray-900 dark:text-white">
                        Sistem Informasi Kontrak Penjualan Inti Sawit dan Minyak Sawit
                    </h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Aplikasi web untuk mempermudah pengelolaan kontrak, penjualan, realisasi penyerahan, dan pelaporan produk sawit secara aman dan efisien.
                    </p>

                    {/* Fitur Utama */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                        <FeatureCard
                            title="Manajemen Kontrak"
                            description="Input & pantau kontrak CPO & Kernel dalam satu dashboard."
                        />
                        <FeatureCard
                            title="Penjualan Terintegrasi"
                            description="Pantau rekap penjualan dan progres pembayaran secara realtime."
                        />
                        <FeatureCard
                            title="Realisasi Penyerahan"
                            description="Cek status pengiriman & jadwal penyerahan kontrak."
                        />
                        <FeatureCard
                            title="Laporan Dinamis"
                            description="Export laporan kontrak dan penjualan dengan format otomatis."
                        />
                    </div>

                    {/* Footer */}
                    <div className="mt-16 text-sm text-gray-500 dark:text-gray-400">
                        &copy; 2025 Sistem Informasi Penjualan Sawit – PT Perkebunan Nusantara IV <br />
                        Laravel v{laravelVersion} • PHP v{phpVersion}
                    </div>
                </div>
            </div>
        </>
    );
}

// Komponen Kartu Fitur
function FeatureCard({ title, description }) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        </div>
    );
}
