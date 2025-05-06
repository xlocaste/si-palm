import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { FaEdit } from 'react-icons/fa';

export default function List({ Pembayaran, auth }) {
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
                  <th className="px-4 py-2 border">Metode</th>
                  <th className="px-4 py-2 border">Nama Bank</th>
                  <th className="px-4 py-2 border">Cara Pembayaran</th>
                  <th className="px-4 py-2 border">Atas Nama</th>
                  <th className="px-4 py-2 border">Rekening No</th>
                  <th className="px-4 py-2 border">Jatuh Tempo</th>
                  <th className="px-4 py-2 border">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {Pembayaran.length > 0 ? (
                  Pembayaran.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{item.metode}</td>
                      <td className="px-4 py-2 border">{item.nama_bank}</td>
                      <td className="px-4 py-2 border">{item.cara_pembayaran}</td>
                      <td className="px-4 py-2 border">{item.atas_nama}</td>
                      <td className="px-4 py-2 border">{item.rek_no}</td>
                      <td className="px-4 py-2 border">{item.jatuh_tempo_pembayaran}</td>
                      <td className="px-4 py-2 border space-x-2">
                        <Link
                          href={`/pembayaran/${item.id}/edit`}
                          className="text-blue-600 hover:underline"
                        >
                          <FaEdit />
                        </Link>
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
