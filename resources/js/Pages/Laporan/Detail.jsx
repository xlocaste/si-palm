import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Detail({ auth, Kontrak }) {
    console.log(Kontrak);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Laporan
                </h2>
            }
        >
            <Head title="Detail Kontrak" />
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg space-y-4">

                    <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
                        <p className="font-bold uppercase text-lg border-b pb-2 col-span-2">Kontrak</p>
                        <DetailItem label="No. Kontrak" value={Kontrak.no_kontrak} />
                        <DetailItem label="Penjual" value={Kontrak.penjual_dan_pemilik_komoditas} />
                        <DetailItem label="No. Referensi" value={Kontrak.no_referensi} />
                        <DetailItem label="Komoditi" value={Kontrak.komoditi} />
                        <DetailItem label="Jenis Komoditi" value={Kontrak.jenis_komoditi} />
                        <DetailItem label="Symbol" value={Kontrak.symbol} />
                        <DetailItem label="Packaging" value={Kontrak.packaging} />
                        <DetailItem label="Deskripsi Produk" value={Kontrak.deskripsi_produk} />
                        <DetailItem label="Produsen" value={Kontrak.produsen} />
                        <DetailItem label="Pelabuhan Muat" value={Kontrak.pelabuhan_muat} />
                        <DetailItem label="Harga Satuan" value={Kontrak.harga_satuan} />
                        <DetailItem label="PPN" value={Kontrak.ppn} />
                        <DetailItem label="Kondisi Penyerahan" value={Kontrak.kondisi_penyerahan} />
                        <DetailItem label="Waktu Penyerahan" value={Kontrak.waktu_penyerahan} />
                        <DetailItem label="Syarat Lain" value={Kontrak.syarat_lain} />
                        <DetailItem label="Dasar Ketentuan" value={Kontrak.dasar_ketentuan} />
                        <DetailItem label="Jumlah Pembayaran" value={Kontrak.jumlah_pembayaran} />
                        <DetailItem label="Pembeli" value={Kontrak.pembeli} />
                        <DetailItem label="Mutu" value={Kontrak.mutu} />
                        <DetailItem label="Harga" value={Kontrak.harga} />
                        <DetailItem label="Volume" value={Kontrak.volume} />
                        <DetailItem label="Tanggal Kontrak" value={Kontrak.tanggal_kontrak} />
                        <DetailItem label="Jatuh Tempo" value={Kontrak.jatuh_tempo} />
                        <DetailItem label="Jenis Tempo Penyerahan" value={Kontrak.jenis_tempo_penyerahan} />
                        <DetailItem label="Jenis Kontrak" value={Kontrak.jenis_kontrak} />
                        <p className="font-bold uppercase text-lg border-b pb-2 col-span-2">Invoice</p>
                        <DetailItem label="No Invoice" value={Kontrak.invoices?.[0]?.no_invoice || '-'} />
                        <DetailItem label="Tanggal Bayar" value={Kontrak.invoices?.[0]?.tanggal_bayar || '-'} />
                        <DetailItem label="Nilai" value={Kontrak.invoices?.[0]?.nilai || '-'} />
                        <DetailItem label="PPN" value={Kontrak.invoices?.[0]?.ppn || '-'} />
                        <DetailItem label="Terbilang" value={Kontrak.invoices?.[0]?.terbilang || '-'} />
                        <DetailItem label="Jumlah" value={Kontrak.invoices?.[0]?.jumlah || '-'} />
                        <p className="font-bold uppercase text-lg border-b pb-2 col-span-2">Sales Order</p>
                        <DetailItem label="No Sales Order" value={Kontrak.sales_order?.[0]?.no_sales_order || '-'} />
                        <DetailItem label="Tanggal Sales Order" value={Kontrak.sales_order?.[0]?.tanggal_sales_order || '-'} />
                        <DetailItem label="Tahap" value={Kontrak.sales_order?.[0]?.tahap || '-'} />
                        <DetailItem label="Volume Sales Order" value={Kontrak.sales_order?.[0]?.volume_sales_order || '-'} />
                        <DetailItem label="Nilai Sales Order" value={Kontrak.sales_order?.[0]?.nilai || '-'} />
                        <p className="font-bold uppercase text-lg border-b pb-2 col-span-2">Realisasi Penyerahan</p>
                        <DetailItem label="Tanggal Serah" value={Kontrak.realisasi_penyerahan?.[0]?.tanggal_serah || '-'} />
                        <DetailItem label="ALB" value={Kontrak.realisasi_penyerahan?.[0]?.alb || '-'} />
                        <DetailItem label="KA" value={Kontrak.realisasi_penyerahan?.[0]?.ka || '-'} />
                        <DetailItem label="KK" value={Kontrak.realisasi_penyerahan?.[0]?.kk || '-'} />
                        <DetailItem label="No BA" value={Kontrak.realisasi_penyerahan?.[0]?.no_ba || '-'} />
                        <DetailItem label="No Surat Penerbitan Invoice" value={Kontrak.realisasi_penyerahan?.[0]?.no_surat_penerbitan_invoice || '-'} />
                        <DetailItem label="Tanggal Surat Invoice" value={Kontrak.realisasi_penyerahan?.[0]?.tanggal_surat_invoice || '-'} />
                        <div className="col-span-2 flex justify-end gap-4">
                            <SecondaryButton>
                                <Link href={route('laporan.merge', Kontrak.id)}>Print</Link>
                            </SecondaryButton>

                            <SecondaryButton>
                                <Link href={route('laporan.index')}>
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
