<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Daftar Realisasi Penyerahan</title>
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
    
    <div class="subtitle">Daftar Realisasi Penyerahan</div>
    
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
                <th width="15%">No. BA</th>
                <th width="20%">No. Surat Penerbitan Invoice</th>
                <th width="12%">Tanggal Serah</th>
                <th width="18%">Kontrak</th>
                <th width="10%">Status ALB</th>
                <th width="10%">Status KA</th>
                <th width="10%">Status KK</th>
            </tr>
        </thead>
        <tbody>
            @if(count($realisasiPenyerahan) > 0)
                @foreach($realisasiPenyerahan as $index => $item)
                <tr>
                    <td class="text-center">{{ $index + 1 }}</td>
                    <td>{{ $item->no_ba }}</td>
                    <td>{{ $item->no_surat_penerbitan_invoice }}</td>
                    <td>{{ date('d/m/Y', strtotime($item->tanggal_serah)) }}</td>
                    <td>{{ $item->kontrak->no_kontrak ?? '-' }}</td>
                    <td class="text-center {{ $item->alb > 0 ? 'status-yes' : 'status-no' }}">
                        {{ $item->alb > 0 ? 'OK' : 'NOT OK' }}
                    </td>
                    <td class="text-center {{ $item->ka > 0 ? 'status-yes' : 'status-no' }}">
                        {{ $item->ka > 0 ? 'OK' : 'NOT OK' }}
                    </td>
                    <td class="text-center {{ $item->kk > 0 ? 'status-yes' : 'status-no' }}">
                        {{ $item->kk > 0 ? 'OK' : 'NOT OK' }}
                    </td>
                </tr>
                @endforeach
            @else
                <tr>
                    <td colspan="8" class="text-center">Tidak ada data realisasi penyerahan.</td>
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