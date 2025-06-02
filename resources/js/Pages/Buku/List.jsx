import React from 'react'
import { Link } from '@inertiajs/inertia-react'
import MainLayout from '@/Layouts/MainLayout'

const Index = ({ buku }) => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Buku</h1>
        <Link
          href="/buku/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Tambah Buku
        </Link>
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">#</th>
            <th className="border px-4 py-2 text-left">Judul</th>
            <th className="border px-4 py-2 text-left">Deskripsi</th>
          </tr>
        </thead>
        <tbody>
          {buku.map((item, index) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{item.judul}</td>
              <td className="border px-4 py-2">{item.deskripsi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  )
}

export default Index
