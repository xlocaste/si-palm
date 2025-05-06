<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Invoice</title>
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
        .section-title {
            font-size: 14px;
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 10px;
            background-color: #f8f8f8;
            padding: 5px;
            border-bottom: 1px solid #ddd;
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
        <h1>DAFTAR INVOICE</h1>
        <p>Tanggal Cetak: {{ date('d-m-Y H:i:s') }}</p>
    </div>
    
    <div class="filter">
        <table class="filter-info">
            <tr>
                <td width="15%"><strong>Filter Pencarian:</strong></td>
                <td>{{ $filter['search'] ?? 'Semua' }}</td>
            </tr>
            <tr>
                <td><strong>Jenis:</strong></td>
                <td>
                    @if($filter['jenis'] == 'cpo')
                        Minyak Sawit (CPO)
                    @elseif($filter['jenis'] == 'pk')
                        Inti Sawit (PK)
                    @else
                        Semua
                    @endif
                </td>
            </tr>
        </table>
    </div>
    
    @if(count($invoiceCPO) > 0)
    <div class="section-title">Invoice Minyak Sawit (CPO)</div>
    <table class="data">
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">No. Invoice</th>
                <th width="15%">No. Kontrak</th>
                <th width="15%">Tanggal Bayar</th>
                <th width="20%">Pembeli</th>
                <th width="10%">Volume</th>
                <th width="15%">Nilai</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoiceCPO as $index => $invoice)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $invoice->no_invoice }}</td>
                <td>{{ $invoice->kontrak->no_kontrak }}</td>
                <td>{{ date('d/m/Y', strtotime($invoice->tanggal_bayar)) }}</td>
                <td>{{ $invoice->kontrak->pembeli }}</td>
                <td>{{ $invoice->kontrak->volume }}</td>
                <td>Rp {{ number_format($invoice->nilai,0,',','.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif
    
    @if(count($invoicePK) > 0)
    <div class="section-title">Invoice Inti Sawit (PK)</div>
    <table class="data">
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">No. Invoice</th>
                <th width="15%">No. Kontrak</th>
                <th width="15%">Tanggal Bayar</th>
                <th width="20%">Pembeli</th>
                <th width="10%">Volume</th>
                <th width="15%">Nilai</th>
            </tr>
        </thead>
        <tbody>
            @foreach($invoicePK as $index => $invoice)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ $invoice->no_invoice }}</td>
                <td>{{ $invoice->kontrak->no_kontrak }}</td>
                <td>{{ date('d/m/Y', strtotime($invoice->tanggal_bayar)) }}</td>
                <td>{{ $invoice->kontrak->pembeli }}</td>
                <td>{{ $invoice->kontrak->volume }}</td>
                <td>Rp {{ number_format($invoice->nilai,0,',','.') }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
    @endif
    
    @if(count($invoiceCPO) === 0 && count($invoicePK) === 0)
    <div style="text-align: center; margin: 40px 0; color: #666;">
        Tidak ada data invoice yang ditemukan.
    </div>
    @endif
    
    <div class="footer">
        <div class="page-number">Halaman {{ '{PAGE_NUM}' }} dari {{ '{PAGE_COUNT}' }}</div>
    </div>
</body>
</html> 