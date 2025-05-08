<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Kontrak Penjualan</title>
    <style>
        body {
            font-family: "Times New Roman", serif;
            font-size: 12pt;
            margin: 2cm;
            color: #000;
        }
        .center { text-align: center; }
        .underline { text-decoration: underline; }
        .bold { font-weight: bold; }
        .section { margin-top: 15px; }
        .ttd { margin-top: 40px; text-align: right; }
        .stamp { margin-top: 30px; text-align: right; }
    </style>
</head>
<body>

    <div class="center">
        <div class="bold underline">KONTRAK PENJUALAN</div>
        <div>No: {{ $kontrak->no_kontrak }}</div>
        <div>Tgl: {{ \Carbon\Carbon::parse($kontrak->tanggal_kontrak)->format('d F Y') }}</div>
    </div>

    <div class="section">
        <p><strong>Penjual dan Pemilik Komoditas:</strong> {{ $kontrak->penjual_dan_pemilik_komoditas }}</p>
        <p><strong>No Referensi:</strong> {{ $kontrak->no_referensi }}</p>
        <p><strong>Pembeli:</strong> {{ $kontrak->pembeli }}</p>
        <p><strong>Produk:</strong> {{ $kontrak->komoditi }}</p>
        <p><strong>Jenis Komoditi:</strong> {{ $kontrak->jenis_komoditi }} ({{ $kontrak->symbol }})</p>
        <p><strong>Kemasan:</strong> {{ $kontrak->packaging }}</p>
        <p><strong>Deskripsi Produk:</strong> {{ $kontrak->deskripsi_produk }}</p>
        <p><strong>Produsen:</strong> {{ $kontrak->produsen }}</p>
        <p><strong>Pelabuhan Muat:</strong> {{ $kontrak->pelabuhan_muat }}</p>
        <p><strong>Mutu:</strong> {{ $kontrak->mutu }}</p>
        <p><strong>Volume:</strong> {{ number_format($kontrak->volume, 0, ',', '.') }} Kg</p>
        <p><strong>Harga Satuan:</strong> Rp {{ number_format($kontrak->harga_satuan, 2, ',', '.') }}</p>
        <p><strong>PPN:</strong> {{ $kontrak->ppn }}%</p>
        <p><strong>Kondisi Penyerahan:</strong> {{ $kontrak->kondisi_penyerahan }}</p>
        <p><strong>Pembayaran:</strong> {{ $kontrak->pembayaran->nama ?? '-' }}</p>
        <p><strong>Jangka Waktu Penyerahan:</strong>
            {{ $kontrak->waktu_penyerahan ? \Carbon\Carbon::parse($kontrak->waktu_penyerahan)->format('d F Y') : '-' }}
        </p>
        <p><strong>Syarat Lain:</strong> {{ $kontrak->syarat_lain }}</p>
        <p><strong>Dasar Ketentuan:</strong> {{ $kontrak->dasar_ketentuan }}</p>
        <p><strong>Jumlah Pembayaran:</strong> <br>
            <strong>Rp {{ number_format($kontrak->jumlah_pembayaran, 0, ',', '.') }}</strong>
        </p>
    </div>

    <div class="section">
        <p>Setuju kepada Tata Cara dan Ketentuan Penjualan Komoditi Perkebunan sesuai kontrak.</p>
    </div>

    <div class="ttd">
        <p>Jakarta, {{ \Carbon\Carbon::parse($kontrak->tanggal_kontrak)->format('d F Y') }}</p>
        <p><strong>PT. Perkebunan Nusantara I</strong></p>
        <p style="margin-top: 60px;">(Djusna Rudiana)<br>
            Kepala Divisi Pemasaran Komoditi<br>Kelapa Sawit dan Karet
        </p>
    </div>

    {{-- Gambar stempel --}}
    <div class="stamp">
        <img src="{{ asset('images/stempel.png') }}" alt="Stempel" width="120">
    </div>

</body>
</html>
