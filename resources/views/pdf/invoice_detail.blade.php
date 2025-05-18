<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->no_invoice }}</title>
    <link rel="stylesheet" href="{{ public_path('css/invoice.css') }}">
</head>
<body>
    <div class="container">
        <div class="image">
            <img src="image/ptpn.png" alt="">
        </div>
        <div class="judul">
            <h2 style="text-decoration: underline; background-color: yellow;">INVOICE</h2>
            <h5>Nomor : {{$invoice->no_invoice}}</h5>
        </div>
        <div class="alamat">
            <div class="tempat">
                <p>Pontianak dan tanggal sekarang</p>
            </div>
            <table style="width: 50%;">
                <tr><td style="vertical-align: top">Kepada </td><td style="vertical-align: top">:</td><td style="font">
                    {{$invoice->kontrak->pembeli}}
            </table>
        </div>

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <td style="text-align: center; border: 1px solid;">Nomor</td>
                        <td class="uraian" style="text-align: center; border: 1px solid;">Uraian</td>
                        <td class="jumlah" style="text-align: center; border: 1px solid;">Jumlah</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="tbody;" style="border: 1px solid">
                            {{$invoice->kontrak->no_kontrak}}
                        </td>
                        <td class="tbody;" style="border: 1px solid">
                            Pembayaran atas penjualan {{ $invoice->kontrak->jenis_kontrak ?? '-' }}
                            {{ $invoice->kontrak->pembeli ?? '-' }} sesuai dengan Kontrak Jual Beli
                            {{ $invoice->kontrak->jenis_kontrak ?? '-' }} :
                            <table>
                                <tr>
                                    <td style="width: 30%">Nomor</td>
                                    <td style="width: 2%">:</td>
                                    <td style="width: 68%">{{ $invoice->no_invoice }}</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%">Tanggal Bayar</td>
                                    <td style="width: 2%">:</td>
                                    <td style="width: 68%">{{ $invoice->tanggal_bayar }}</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%">Volume (Kg)</td>
                                    <td style="width: 2%">:</td>
                                    <td style="width: 68%">{{ $invoice->kontrak->volume ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%">Harga (Rp/Kg)</td>
                                    <td style="width: 2%">:</td>
                                    <td style="width: 68%">{{ $invoice->kontrak->harga ?? '-' }}</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%">Nilai</td>
                                    <td style="width: 2%">:</td>
                                </tr>
                                <tr>
                                    <td style="width: 30%">PPN 11%</td>
                                    <td style="width: 2%">:</td>
                                </tr>
                            </table>
                        </td>
                        <td class="tbody;" style="border: 1px solid; vertical-align: bottom;">Rp.{{$invoice->nilai}}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid"></td>
                        <td style="text-align: right; border: 1px solid;">Jumlah</td>
                        <td style="text-align: left; border: 1px solid;">Rp.{{$invoice->nilai}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>
