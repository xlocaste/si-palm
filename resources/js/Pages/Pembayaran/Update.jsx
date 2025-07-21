import React, { useState } from 'react'
import { useForm } from '@inertiajs/react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Update({ auth, pembayaran, kontrak }) {
  const { data, setData, put, processing, errors } = useForm({
    metode: pembayaran.metode || '',
    nama_bank: pembayaran.nama_bank || '',
    cara_pembayaran: pembayaran.cara_pembayaran || '',
    atas_nama: pembayaran.atas_nama || '',
    rek_no: pembayaran.rek_no || '',
    jatuh_tempo_pembayaran: pembayaran.jatuh_tempo_pembayaran || '',
    kontrak_id: pembayaran.kontrak_id || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    put(route('pembayaran.update', pembayaran.id))
  }

  return (
    <AuthenticatedLayout user={auth.user}>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Edit Pembayaran</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">No Kontrak</label>
            <select
              value={data.kontrak_id || ''}
              onChange={(e) => setData('kontrak_id', e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Pilih Kontrak --</option>
              {kontrak.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.no_kontrak}
                </option>
              ))}
            </select>
            {errors.kontrak_id && <p className="text-red-500 text-sm">{errors.kontrak_id}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Metode</label>
            <select
                value={data.metode}
                onChange={(e) => setData('metode', e.target.value)}
                className="w-full border rounded px-3 py-2"
                >
                <option value="">Pilih Metode</option>
                <option value="Tunai">Tunai</option>
                <option value="Transfer">Transfer</option>
                <option value="Debit">Debit</option>
                <option value="Kredit">Kredit</option>
                <option value="E-Wallet">E-Wallet</option>
            </select>
            {errors.metode && <p className="text-red-500 text-sm">{errors.metode}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Nama Bank</label>
            <input
              type="text"
              value={data.nama_bank}
              onChange={(e) => setData('nama_bank', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.nama_bank && <p className="text-red-500 text-sm">{errors.nama_bank}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Cara Pembayaran</label>
            <input
              type="text"
              value={data.cara_pembayaran}
              onChange={(e) => setData('cara_pembayaran', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.cara_pembayaran && <p className="text-red-500 text-sm">{errors.cara_pembayaran}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Atas Nama</label>
            <input
              type="text"
              value={data.atas_nama}
              onChange={(e) => setData('atas_nama', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.atas_nama && <p className="text-red-500 text-sm">{errors.atas_nama}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">No Rekening</label>
            <input
              type="text"
              value={data.rek_no}
              onChange={(e) => setData('rek_no', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.rek_no && <p className="text-red-500 text-sm">{errors.rek_no}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium">Jatuh Tempo</label>
            <input
              type="date"
              value={data.jatuh_tempo_pembayaran}
              onChange={(e) => setData('jatuh_tempo_pembayaran', e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            {errors.jatuh_tempo_pembayaran && <p className="text-red-500 text-sm">{errors.jatuh_tempo_pembayaran}</p>}
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  )
}
