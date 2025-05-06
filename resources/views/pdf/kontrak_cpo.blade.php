<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Kontrak Minyak Sawit (CPO)</title>
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
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table.filter-info {
            margin-bottom: 15px;
            width: 100%;
        }
        table.filter-info td {
            padding: 3px;
            border: none;
        }
        table.data th, table.data td {
            border: 1px solid #ddd;
            padding: 8px;
            font-size: 11px;
        }
        table.data th {
            background-color: #f2f2f2;
            text-align: left;
            font-weight: bold;
        }
        .footer {
            margin-top: 20px;
            text-align: right;
            font-size: 11px;
        }
        .page-number {
            text-align: right;
            font-size: 10px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN KONTRAK MINYAK SAWIT (CPO)</h1>
        <p>Tanggal Cetak: {{ date('d-m-Y H:i:s') }}</p>
    </div>
    
    <div class="filter">
        <table class="filter-info">
            <tr>
                <td width="15%"><strong>Filter Pencarian:</strong></td>
                <td>{{ $filter['search'] ?? 'Semua' }}</td>
            </tr>
            <tr>
                <td><strong>Periode:</strong></td>
                <td>{{ $filter['date_from'] ?? '-' }} s/d {{ $filter['date_to'] ?? '-' }}</td>
            </tr>
            <tr>
                <td><strong>Rentang Harga:</strong></td>
                <td>{{ $filter['harga_from'] ? 'Rp ' . number_format($filter['harga_from'],0,',','.') : '-' }} s/d {{ $filter['harga_to'] ? 'Rp ' . number_format($filter['harga_to'],0,',','.') : '-' }}</td>
            </tr>
        </table>
    </div>
    
    <table class="data">
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">No. Kontrak</th>
                <th width="20%">Pembeli</th>
                <th width="10%">Mutu</th>
                <th width="15%">Harga</th>
                <th width="10%">Volume</th>
                <th width="12%">Tanggal Kontrak</th>
                <th width="13%">Jatuh Tempo</th>
            </tr>
        </thead>
        <tbody>
            @if(count($kontrakCPO) > 0)
                @foreach($kontrakCPO as $index => $kontrak)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $kontrak->no_kontrak }}</td>
                    <td>{{ $kontrak->pembeli }}</td>
                    <td>{{ $kontrak->mutu }}</td>
                    <td>Rp {{ number_format($kontrak->harga,0,',','.') }}</td>
                    <td>{{ $kontrak->volume }}</td>
                    <td>{{ date('d/m/Y', strtotime($kontrak->tanggal_kontrak)) }}</td>
                    <td>{{ date('d/m/Y', strtotime($kontrak->jatuh_tempo)) }}</td>
                </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="8" style="text-align: center;">Tidak ada data kontrak</td>
                </tr>
            @endif
        </tbody>
    </table>
    
    <div class="footer">
        <div class="page-number">Halaman {{ '{PAGE_NUM}' }} dari {{ '{PAGE_COUNT}' }}</div>
    </div>
</body>
</html> 