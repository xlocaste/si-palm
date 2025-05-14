import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Detail({ auth, RealisasiPenyerahan }) {
    console.log(RealisasiPenyerahan);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Realisasi Penyerahan
                </h2>
            }
        >
            <Head title="Detail Realisasi Penyerahan" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg space-y-4">
                    <p className="font-bold uppercase text-lg border-b pb-2">
                        Detail Realisasi Penyerahan
                    </p>

                    <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
                        <DetailItem label="Tanggal Serah" value={RealisasiPenyerahan.tanggal_serah} />
                        <DetailItem label="ALB" value={RealisasiPenyerahan.alb} />
                        <DetailItem label="KA" value={RealisasiPenyerahan.ka} />
                        <DetailItem label="KK" value={RealisasiPenyerahan.kk} />
                        <DetailItem label="No. BA" value={RealisasiPenyerahan.no_ba} />
                        <DetailItem label="No. Surat Penerbitan Invoice" value={RealisasiPenyerahan.no_surat_penerbitan_invoice} />
                        <DetailItem label="Tanggal Surat Invoice" value={RealisasiPenyerahan.tanggal_surat_invoice} />
                        <DetailItem label="ID Kontrak" value={RealisasiPenyerahan.kontrak_id} />
                        <DetailItem label="No. Kontrak" value={RealisasiPenyerahan.kontrak?.no_kontrak} />
                        <DetailItem label="ID Invoice" value={RealisasiPenyerahan.invoice_id} />
                        <DetailItem label="No. Invoice" value={RealisasiPenyerahan.invoice?.no_invoice} />

                        <div className="col-span-2 flex justify-end">
                            <SecondaryButton>
                                <Link href={route('realisasi-penyerahan.index')}>
                                    Kembali ke Daftar
                                </Link>
                            </SecondaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-gray-500 font-medium">{label}</p>
        <p className="text-gray-800">{value || '-'}</p>
    </div>
);
