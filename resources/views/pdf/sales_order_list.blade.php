<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Sales Order</title>
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
        .subtitle {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0;
            text-transform: uppercase;
        }
        .meta-info {
            margin-bottom: 15px;
        }
        .filter-info {
            margin-bottom: 15px;
            font-style: italic;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 11px;
        }
        .text-center {
            text-align: center;
        }
        .text-right {
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>PT. SAWIT INDONESIA</h1>
        <p>Jl. Industri No. 123, Kota Medan, Sumatera Utara</p>
        <p>Telp: (061) 1234567 | Email: info@sawitindonesia.co.id</p>
    </div>
    
    <div class="subtitle">Daftar Sales Order</div>
    
    <div class="meta-info">
        <p>Tanggal Cetak: {{ date('d-m-Y H:i:s') }}</p>
    </div>
    
    @if(isset($filter) && $filter['search'])
    <div class="filter-info">
        <p>Filter Pencarian: {{ $filter['search'] }}</p>
    </div>
    @endif
    
    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="20%">Nomor Sales Order</th>
                <th width="15%">Tanggal</th>
                <th width="10%">Tahap</th>
                <th width="15%">Volume</th>
                <th width="15%">Nilai</th>
                <th width="20%">Kontrak</th>
            </tr>
        </thead>
        <tbody>
            @if(count($salesOrders) > 0)
                @foreach($salesOrders as $index => $salesOrder)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>{{ $salesOrder->no_sales_order }}</td>
                    <td>{{ date('d/m/Y', strtotime($salesOrder->tanggal_sales_order)) }}</td>
                    <td class="text-center">{{ $salesOrder->tahap }}</td>
                    <td class="text-right">{{ $salesOrder->volume_sales_order }}</td>
                    <td class="text-right">Rp {{ number_format($salesOrder->nilai,0,',','.') }}</td>
                    <td>{{ $salesOrder->kontrak->no_kontrak ?? '-' }}</td>
                </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="7" class="text-center">Tidak ada data sales order.</td>
                </tr>
            @endif
        </tbody>
    </table>
    
    <div class="footer">
        <p>Dokumen ini sah dan diproses oleh komputer</p>
        <p>Silakan hubungi kami untuk informasi lebih lanjut</p>
    </div>
</body>
</html> 