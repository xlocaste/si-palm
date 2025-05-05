<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detail Kontrak Inti Sawit (PK)</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
        }
        .info-section {
            margin-bottom: 20px;
        }
        .detail-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .detail-table td {
            padding: 5px;
            vertical-align: top;
        }
        .detail-table .label {
            width: 35%;
            font-weight: bold;
        }
        .detail-table .separator {
            width: 5%;
            text-align: center;
        }
        .detail-table .value {
            width: 60%;
        }
        .footer {
            margin-top: 30px;
            text-align: right;
            font-size: 11px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>DETAIL KONTRAK INTI SAWIT (PK)</h1>
        <p>Nomor Kontrak: {{ $kontrak->no_kontrak }}</p>
        <p>Tanggal Cetak: {{ date('d-m-Y H:i:s') }}</p>
    </div>
    
    <div class="info-section">
        <table class="detail-table">
            <tr>
                <td class="label">Nomor Kontrak</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->no_kontrak }}</td>
            </tr>
            <tr>
                <td class="label">Pembeli</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->pembeli }}</td>
            </tr>
            <tr>
                <td class="label">Mutu</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->mutu }}</td>
            </tr>
            <tr>
                <td class="label">Harga</td>
                <td class="separator">:</td>
                <td class="value">Rp {{ number_format($kontrak->harga,0,',','.') }}</td>
            </tr>
            <tr>
                <td class="label">Volume</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->volume }}</td>
            </tr>
            <tr>
                <td class="label">Tanggal Kontrak</td>
                <td class="separator">:</td>
                <td class="value">{{ date('d/m/Y', strtotime($kontrak->tanggal_kontrak)) }}</td>
            </tr>
            <tr>
                <td class="label">Jatuh Tempo</td>
                <td class="separator">:</td>
                <td class="value">{{ date('d/m/Y', strtotime($kontrak->jatuh_tempo)) }}</td>
            </tr>
            <tr>
                <td class="label">Penjual & Pemilik Komoditas</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->penjual_dan_pemilik_komoditas }}</td>
            </tr>
            <tr>
                <td class="label">Nomor Referensi</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->no_referensi }}</td>
            </tr>
            <tr>
                <td class="label">Komoditi</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->komoditi }}</td>
            </tr>
            <tr>
                <td class="label">Jenis Komoditi</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->jenis_komoditi }}</td>
            </tr>
            <tr>
                <td class="label">Kondisi Penyerahan</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->kondisi_penyerahan }}</td>
            </tr>
            <tr>
                <td class="label">Metode Pembayaran</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->metode }}</td>
            </tr>
            <tr>
                <td class="label">Waktu Penyerahan</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->waktu_penyerahan }}</td>
            </tr>
            <tr>
                <td class="label">Jenis Tempo Penyerahan</td>
                <td class="separator">:</td>
                <td class="value">{{ $kontrak->jenis_tempo_penyerahan }}</td>
            </tr>
        </table>
    </div>
    
    <div class="footer">
        <p>Dokumen ini dicetak oleh sistem dan sah tanpa tanda tangan.</p>
    </div>
</body>
</html> 