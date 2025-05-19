import { Link, Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Sistem Informasi Penjualan Sawit" />

            <div class="w-full h-screen bg-[url('/image/lp.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 h-screen bg-black bg-opacity-50"></div>
                <div className="absolute z-20 h-screen sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-white"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-white"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-white"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="absolute z-10 w-full p-6 lg:p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <ApplicationLogo />
                    </div>

                    <h1 className="mt-10 text-4xl font-bold text-white">
                        Sistem Informasi Kontrak Penjualan Inti Sawit dan Minyak Sawit
                    </h1>
                    <p className="mt-4 text-lg text-white max-w-3xl mx-auto">
                        Aplikasi web untuk mempermudah pengelolaan kontrak, penjualan, realisasi penyerahan, dan pelaporan produk sawit secara aman dan efisien.
                    </p>

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

                    <div className="mt-16 text-sm text-white">
                        &copy; 2025 Sistem Informasi Penjualan Sawit – PT Perkebunan Nusantara IV <br />
                        Laravel v{laravelVersion} • PHP v{phpVersion}
                    </div>
                </div>
            </div>
        </>
    );
}

function FeatureCard({ title, description }) {
    return (
        <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
        </div>
    );
}
