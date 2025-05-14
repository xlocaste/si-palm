import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Detail({ auth, Invoice }) {
    console.log(Invoice);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Invoice
                </h2>
            }
        >
            <Head title="Detail Invoice" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg space-y-4">
                    <p className="font-bold uppercase text-lg border-b pb-2">Detail Invoice</p>

                    <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
                        <DetailItem label="No. Invoice" value={Invoice.no_invoice} />
                        <DetailItem label="Tanggal Bayar" value={Invoice.tanggal_bayar} />
                        <DetailItem label="Nilai" value={Invoice.nilai} />
                        <DetailItem label="Kontrak ID" value={Invoice.kontrak_id} />
                        <DetailItem label="No. Kontrak" value={Invoice.kontrak?.no_kontrak} />

                        <div className="col-span-2 flex justify-end">
                            <SecondaryButton>
                                <Link href={route('invoice.index')}>
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
