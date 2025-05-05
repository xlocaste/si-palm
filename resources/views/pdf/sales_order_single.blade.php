<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Order #{{ $salesOrder->no_sales_order }}</title>
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
        .sales-order-title {
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
        
        .item-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .item-table th, .item-table td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        .item-table th {
            background-color: #f2f2f2;
            text-align: left;
        }
        
        .amount-table {
            width: 350px;
            margin-left: auto;
            border-collapse: collapse;
        }
        .amount-table td {
            padding: 5px;
        }
        .amount-table .label {
            text-align: right;
            font-weight: bold;
        }
        .amount-table .separator {
            width: 20px;
            text-align: center;
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
    </style>
</head>
<body>
    <div class="header">
        <h1>PT. SAWIT INDONESIA</h1>
        <p>Jl. Industri No. 123, Kota Medan, Sumatera Utara</p>
        <p>Telp: (061) 1234567 | Email: info@sawitindonesia.co.id</p>
    </div>
    
    <div class="sales-order-title">
        Sales Order {{ $salesOrder->kontrak->jenis_kontrak === 'CPO' ? 'Minyak Sawit (CPO)' : 'Inti Sawit (PK)' }}
    </div>
    
    <div class="info-section">
        <table class="detail-table">
            <tr>
                <td class="label">Nomor Sales Order</td>
                <td class="separator">:</td>
                <td class="value">{{ $salesOrder->no_sales_order }}</td>
            </tr>
            <tr>
                <td class="label">Nomor Kontrak</td>
                <td class="separator">:</td>
                <td class="value">{{ $salesOrder->kontrak->no_kontrak }}</td>
            </tr>
            <tr>
                <td class="label">Tanggal Sales Order</td>
                <td class="separator">:</td>
                <td class="value">{{ date('d/m/Y', strtotime($salesOrder->tanggal_sales_order)) }}</td>
            </tr>
            <tr>
                <td class="label">Tahap</td>
                <td class="separator">:</td>
                <td class="value">{{ $salesOrder->tahap }}</td>
            </tr>
            <tr>
                <td class="label">Pembeli</td>
                <td class="separator">:</td>
                <td class="value">{{ $salesOrder->kontrak->pembeli }}</td>
            </tr>
        </table>
    </div>
    
    <table class="item-table">
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="45%">Deskripsi</th>
                <th width="15%">Volume</th>
                <th width="15%">Harga Satuan</th>
                <th width="20%">Jumlah</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>{{ $salesOrder->kontrak->jenis_kontrak === 'CPO' ? 'Minyak Sawit (CPO)' : 'Inti Sawit (PK)' }} - {{ $salesOrder->kontrak->mutu }}</td>
                <td>{{ $salesOrder->volume_sales_order }}</td>
                <td>Rp {{ number_format($salesOrder->kontrak->harga,0,',','.') }}</td>
                <td>Rp {{ number_format($salesOrder->nilai,0,',','.') }}</td>
            </tr>
        </tbody>
    </table>
    
    <table class="amount-table">
        <tr>
            <td class="label">Total</td>
            <td class="separator">:</td>
            <td>Rp {{ number_format($salesOrder->nilai,0,',','.') }}</td>
        </tr>
        <tr>
            <td class="label">PPN {{ $salesOrder->kontrak->ppn ?? '11' }}%</td>
            <td class="separator">:</td>
            <td>Rp {{ number_format($salesOrder->nilai * (($salesOrder->kontrak->ppn ?? 11)/100),0,',','.') }}</td>
        </tr>
        <tr>
            <td class="label">Total Nilai</td>
            <td class="separator">:</td>
            <td style="font-weight: bold;">Rp {{ number_format($salesOrder->nilai + ($salesOrder->nilai * (($salesOrder->kontrak->ppn ?? 11)/100)),0,',','.') }}</td>
        </tr>
    </table>
    
    <div style="margin-top: 40px;">
        <p>Catatan Tambahan:</p>
        <p>
            <strong>Mutu:</strong> {{ $salesOrder->kontrak->mutu }}<br>
            <strong>Kondisi Penyerahan:</strong> {{ $salesOrder->kontrak->kondisi_penyerahan ?? 'Sesuai kontrak' }}<br>
            <strong>Waktu Penyerahan:</strong> {{ $salesOrder->kontrak->waktu_penyerahan ?? 'Sesuai kontrak' }}
        </p>
    </div>
    
    <div style="display: flex; margin-top: 50px;">
        <div style="width: 50%; text-align: center;">
            <div style="margin-bottom: 60px;">Mengetahui,</div>
            <div style="border-top: 1px solid #000; width: 60%; margin: 0 auto;"></div>
            <div style="margin-top: 5px;">Manager Pemasaran</div>
        </div>
        
        <div style="width: 50%; text-align: center;">
            <div style="margin-bottom: 60px;">Medan, {{ date('d F Y', strtotime($salesOrder->tanggal_sales_order)) }}</div>
            <div style="border-top: 1px solid #000; width: 60%; margin: 0 auto;"></div>
            <div style="margin-top: 5px;">Direktur</div>
        </div>
    </div>
    
    <div class="footer">
        <p>Dokumen ini sah dan diproses oleh komputer</p>
        <p>Silakan hubungi kami untuk informasi lebih lanjut</p>
    </div>
</body>
</html> 