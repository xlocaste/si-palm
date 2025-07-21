import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaEdit } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function List({ Pembayaran, auth }) {
    console.log(Pembayaran)

    const handleDelete = (id) => {
            if (confirm("Yakin ingin menghapus data ini?")) {
                router.delete(route("pembayaran.destroy", id));
            }
        };

  return (
    <>
    <AuthenticatedLayout
        user={auth.user}
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Daftar Pembayaran
            </h2>
        }
    >
      <Head title="Daftar Pembayaran" />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
            <div className='flex justify-between items-center'>
                <label className="font-bold text-gray-700 ">DAFTAR PEMBAYARAN</label>
                <Link href={route('pembayaran.create')}>
                    <PrimaryButton className="mb-4 px-4 py-2 text-white rounded">
                        Tambah Pembayaran
                    </PrimaryButton>
                </Link>
            </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">No Kontrak</th>
                  <th className="px-4 py-2 border">Metode</th>
                  <th className="px-4 py-2 border">Nama Bank</th>
                  <th className="px-4 py-2 border">Cara Pembayaran</th>
                  <th className="px-4 py-2 border">Atas Nama</th>
                  <th className="px-4 py-2 border">Rekening No</th>
                  <th className="px-4 py-2 border">Jatuh Tempo</th>
                  <th className="px-4 py-2 border">File</th>
                  <th className="px-4 py-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Pembayaran.length > 0 ? (
                  Pembayaran.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{item.kontrak?.no_kontrak || "Data Kosong"}</td>
                        <td className="px-4 py-2 border">{item.metode || "Data Kosong"}</td>
                        <td className="px-4 py-2 border">{item.nama_bank || "Data Kosong"}</td>
                        <td className="px-4 py-2 border">{item.cara_pembayaran || "Data Kosong"}</td>
                        <td className="px-4 py-2 border">{item.atas_nama || "Data Kosong"}</td>
                        <td className="px-4 py-2 border">{item.rek_no || "Data Kosong"}</td>
                        <td className="px-4 py-2 border">{item.jatuh_tempo_pembayaran || "Data Kosong"}</td>
                        <td className="px-4 py-2 border">
                            {item.file ? (
                                <a
                                href={`storage/${item.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                                >
                                Lihat File
                                </a>
                            ) : (
                                "Data Kosong"
                            )}
                        </td>
                      <td className="px-4 py-2 border space-x-2">
                        <Link
                            href={route("pembayaran.edit", item.id)}
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit"
                        >
                            <FaEdit />
                        </Link>
                        <button
                            onClick={() =>
                                handleDelete(
                                    item.id
                                )
                            }
                            className="text-red-500 hover:text-red-700"
                            title="Hapus"
                        >
                            <FontAwesomeIcon
                                icon={faTrash}
                            />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      Tidak ada data pembayaran.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
    </>
  );
}
