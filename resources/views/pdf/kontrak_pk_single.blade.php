<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8" />
    <title>Detail Kontrak Minyak Sawit (PK)</title>
    <link rel="stylesheet" href="{{ public_path('css/pdf.css') }}">
</head>
<body>
    <div class="header">
        <h1 style="font-size: 16px; font-weight: bold; margin: 0;">Detail Kontrak Minyak Sawit (PK)</h1>
        <p style="text-decoration: underline; font-weight: bold; font-size: 16px; margin: 0;">Nomor Kontrak: {{ $kontrak->no_kontrak }}</p>
        <p style="font-size: 16px; margin: 0;">Tanggal Cetak: {{ date('d-m-Y H:i:s') }}</p>
    </div>

    <table class="table">
        <tr><td class="label">Penjual & Pemilik Komoditas</td><td class="separator">:</td><td class="value">{{ $kontrak->penjual_dan_pemilik_komoditas }}</td></tr>
        <tr><td class="label">Penjual</td><td class="separator">:</td><td class="value">{{ $kontrak->penjual_dan_pemilik_komoditas }}</td></tr>
        <tr><td class="label">Pembeli</td><td class="separator">:</td><td class="value">{{ $kontrak->pembeli }}</td></tr>
        <tr><td class="label">No. Referensi</td><td class="separator">:</td><td class="value">{{ $kontrak->no_referensi }}</td></tr>
        <tr><td class="label">Nomor Kontrak</td><td class="separator">:</td><td class="value">{{ $kontrak->no_kontrak }}</td></tr>
        <tr>
            <td class="label">Komoditi</td>
            <td class="separator">:</td>
            <td class="value">{{ $kontrak->komoditi }}</td>
            <td class="label2">Jenis Komoditi</td>
            <td class="separator">:</td>
            <td class="value">{{ $kontrak->jenis_kontrak }}</td>
        </tr>
        <tr>
            <td class="label">Packaging</td>
            <td class="separator">:</td>
            <td class="value">{{ $kontrak->packaging }}</td>
            <td class="label2">Symbol</td>
            <td class="separator">:</td>
            <td class="value">{{ $kontrak->symbol }}</td>
        </tr>
        <tr><td class="label">Deskripsi Produk</td><td class="separator">:</td><td class="value">{{ $kontrak->jenis_kontrak }}</td></tr>
        <tr><td class="label">Mutu</td><td class="separator">:</td><td class="value">{{ $kontrak->mutu }}</td></tr>
        <tr><td class="label">Produsen</td><td class="separator">:</td><td class="value">{{ $kontrak->produsen }}</td></tr>
        <tr><td class="label">Pelabuhan Muat</td><td class="separator">:</td><td class="value">{{ $kontrak->pelabuhan_muat }}</td></tr>
        <tr><td class="label">Volume</td><td class="separator">:</td><td class="value">{{ $kontrak->volume }} Kg</td></tr>
        <tr><td class="label">Harga Satuan</td><td class="separator">:</td><td class="value">Rp {{ number_format($kontrak->harga_satuan,0,',','.') }}</td></tr>
        <tr><td class="label">PPN</td><td class="separator">:</td><td class="value">{{ $kontrak->ppn }} %</td></tr>
        <tr><td class="label">Kondisi Penyerahan</td><td class="separator">:</td><td class="value">{{ $kontrak->kondisi_penyerahan }}</td></tr>
        <tr>
            <td class="label">Pembayaran</td>
            <td class="separator">:</td>
            <td class="label3">Metode</td>
            <td class="separator1">: {{ $kontrak->pembayaran->metode ?? 'Tidak tersedia' }}</td>
            <td class="label3">Cara Pembayaran</td>
            <td class="separator1">:</td>
            <td class="value1">{{ $kontrak->pembayaran->cara_pembayaran ?? 'Tidak tersedia' }}</td>
        </tr>
        <tr>
            <td class="label"></td>
            <td class="separator"></td>
            <td class="label3">Nama Bank</td>
            <td class="separator1">: {{ $kontrak->pembayaran->nama_bank ?? 'Tidak tersedia' }}</td>
            <td class="label3">Jatuh Tempo</td>
            <td class="separator1">:</td>
            <td class="value1">{{ $kontrak->pembayaran->jatuh_tempo_pembayaran ?? 'Tidak tersedia' }}</td>
        </tr>
        <tr>
            <td class="label"></td>
            <td class="separator"></td>
            <td class="label3">Atas Nama</td>
            <td class="separator1">: {{ $kontrak->pembayaran->atas_nama ?? 'Tidak tersedia' }}</td>
        </tr>
        <tr>
            <td class="label"></td>
            <td class="separator"></td>
            <td class="label3">Rek No</td>
            <td class="separator1">: {{ $kontrak->pembayaran->rek_no ?? 'Tidak tersedia' }}</td>
        </tr>
        <tr><td class="label">Waktu Penyerahan</td><td class="separator">:</td><td class="value">{{ $kontrak->waktu_penyerahan }}</td></tr>
        <tr><td class="label">Syarat - Syarat Lain</td><td class="separator">:</td><td class="value">{{ $kontrak->syarat_lain }}</td></tr>
        <tr><td class="label">Jumlah Pembayaran</td><td class="separator">:</td><td class="value">Rp {{ number_format($kontrak->jumlah_pembayaran,0,',','.') }}</td></tr>
    </table>

    <div class="footer">
        <div class="left">
            <p>Persetujuan Pembeli</p>
            <p>{{ $kontrak->pembeli }}</p>
        </div>
        <div class="right">
            <p>Yang Menyetujui</p>
            <p>Nama Penandatangan</p>
            <p><br></p>
            <p><br></p>
            <p><br></p>
            <p><br></p>
            <p><br></p>
            <p>Kepala Divisi</p>
        </div>
    </div>

</body>
</html>
