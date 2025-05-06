<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Realisasi Penyerahan #{{ $realisasiPenyerahan->no_ba }}</title>
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
        .company-info {
            text-align: left;
            margin-bottom: 20px;
        }
        .realisasi-title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            text-transform: uppercase;
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
        
        .status-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            border: 1px solid #ddd;
        }
        .status-table th, .status-table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        .status-table th {
            background-color: #f2f2f2;
        }
        
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 11px;
        }
        
        .signature {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            width: 45%;
            text-align: center;
        }
        .signature-line {
            margin: 50px auto 0;
            border-top: 1px solid #000;
            width: 70%;
        }
        
        .status-yes {
            color: green;
            font-weight: bold;
        }
        
        .status-no {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>PT. SAWIT INDONESIA</h1>
        <p>Jl. Industri No. 123, Kota Medan, Sumatera Utara</p>
        <p>Telp: (061) 1234567 | Email: info@sawitindonesia.co.id</p>
    </div>
    
    <div class="realisasi-title">
        Berita Acara Realisasi Penyerahan
    </div>
    
    <div class="info-section">
        <table class="detail-table">
            <tr>
                <td class="label">Nomor Berita Acara</td>
                <td class="separator">:</td>
                <td class="value">{{ $realisasiPenyerahan->no_ba }}</td>
            </tr>
            <tr>
                <td class="label">Nomor Surat Penerbitan Invoice</td>
                <td class="separator">:</td>
                <td class="value">{{ $realisasiPenyerahan->no_surat_penerbitan_invoice }}</td>
            </tr>
            <tr>
                <td class="label">Tanggal Surat Invoice</td>
                <td class="separator">:</td>
                <td class="value">{{ date('d/m/Y', strtotime($realisasiPenyerahan->tanggal_surat_invoice)) }}</td>
            </tr>
            <tr>
                <td class="label">Tanggal Serah</td>
                <td class="separator">:</td>
                <td class="value">{{ date('d/m/Y', strtotime($realisasiPenyerahan->tanggal_serah)) }}</td>
            </tr>
            <tr>
                <td class="label">Nomor Kontrak</td>
                <td class="separator">:</td>
                <td class="value">{{ $realisasiPenyerahan->kontrak->no_kontrak ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Nomor Invoice</td>
                <td class="separator">:</td>
                <td class="value">{{ $realisasiPenyerahan->invoice->no_invoice ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Pembeli</td>
                <td class="separator">:</td>
                <td class="value">{{ $realisasiPenyerahan->kontrak->pembeli ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Komoditas</td>
                <td class="separator">:</td>
                <td class="value">{{ $realisasiPenyerahan->kontrak->jenis_kontrak === 'CPO' ? 'Minyak Sawit (CPO)' : 'Inti Sawit (PK)' }}</td>
            </tr>
            <tr>
                <td class="label">Volume</td>
                <td class="separator">:</td>
                <td class="value">{{ $realisasiPenyerahan->kontrak->volume ?? '-' }}</td>
            </tr>
            <tr>
                <td class="label">Nilai</td>
                <td class="separator">:</td>
                <td class="value">Rp {{ number_format($realisasiPenyerahan->invoice->nilai ?? 0,0,',','.') }}</td>
            </tr>
        </table>
    </div>
    
    <div>
        <h3>Status Penyerahan:</h3>
        <table class="status-table">
            <thead>
                <tr>
                    <th>Kriteria</th>
                    <th>Persentase</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Analisa Laboratorium (ALB)</td>
                    <td>{{ $realisasiPenyerahan->alb }}%</td>
                    <td class="{{ $realisasiPenyerahan->alb > 0 ? 'status-yes' : 'status-no' }}">
                        {{ $realisasiPenyerahan->alb > 0 ? 'OK' : 'NOT OK' }}
                    </td>
                </tr>
                <tr>
                    <td>Kadar Air (KA)</td>
                    <td>{{ $realisasiPenyerahan->ka }}%</td>
                    <td class="{{ $realisasiPenyerahan->ka > 0 ? 'status-yes' : 'status-no' }}">
                        {{ $realisasiPenyerahan->ka > 0 ? 'OK' : 'NOT OK' }}
                    </td>
                </tr>
                <tr>
                    <td>Kadar Kotoran (KK)</td>
                    <td>{{ $realisasiPenyerahan->kk }}%</td>
                    <td class="{{ $realisasiPenyerahan->kk > 0 ? 'status-yes' : 'status-no' }}">
                        {{ $realisasiPenyerahan->kk > 0 ? 'OK' : 'NOT OK' }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div style="margin-top: 40px;">
        <p>Berdasarkan hasil pemeriksaan di atas, dengan ini dinyatakan bahwa penyerahan komoditas telah dilaksanakan sesuai dengan ketentuan yang berlaku dalam kontrak.</p>
    </div>
    
    <div style="display: flex; margin-top: 50px;">
        <div style="width: 50%; text-align: center;">
            <div style="margin-bottom: 60px;">Pembeli,</div>
            <div style="border-top: 1px solid #000; width: 60%; margin: 0 auto;"></div>
            <div style="margin-top: 5px;">{{ $realisasiPenyerahan->kontrak->pembeli ?? '' }}</div>
        </div>
        
        <div style="width: 50%; text-align: center;">
            <div style="margin-bottom: 60px;">Medan, {{ date('d F Y', strtotime($realisasiPenyerahan->tanggal_serah)) }}</div>
            <div style="border-top: 1px solid #000; width: 60%; margin: 0 auto;"></div>
            <div style="margin-top: 5px;">PT. Sawit Indonesia</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Dokumen ini sah dan diproses oleh komputer</p>
        <p>Silakan hubungi kami untuk informasi lebih lanjut</p>
    </div>
</body>
</html> 