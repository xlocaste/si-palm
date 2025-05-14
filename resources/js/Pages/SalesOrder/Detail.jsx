import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Detail({ auth, SalesOrder }) {
    console.log(SalesOrder);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Sales Order
                </h2>
            }
        >
            <Head title="Detail Sales Order" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg space-y-4">
                    <p className="font-bold uppercase text-lg border-b pb-2">Detail Sales Order</p>

                    <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
                        <DetailItem label="No. Sales Order" value={SalesOrder.no_sales_order} />
                        <DetailItem label="Tanggal Sales Order" value={SalesOrder.tanggal_sales_order} />
                        <DetailItem label="Tahap" value={SalesOrder.tahap} />
                        <DetailItem label="Volume Sales Order" value={SalesOrder.volume_sales_order} />
                        <DetailItem label="Nilai" value={SalesOrder.nilai} />
                        <DetailItem label="Kontrak ID" value={SalesOrder.kontrak_id} />
                        <DetailItem label="No. Kontrak" value={SalesOrder.kontrak?.no_kontrak} />

                        <div className="col-span-2 flex justify-end">
                            <SecondaryButton>
                                <Link href={route('sales-order.index')}>
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
