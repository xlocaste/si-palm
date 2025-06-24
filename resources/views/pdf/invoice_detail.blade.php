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
                <p>Pontianak, {{ $invoice->formatted_created_at }}</p>
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
                                    <td style="width: 68%">Rp.{{ number_format($invoice->kontrak->harga, 0, ',', '.') }}</td>
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
                        <td class="tbody;" style="border: 1px solid; vertical-align: bottom;">
                            <div>
                                Rp.{{ number_format($invoice->nilai, 0, ',', '.') }}
                            </div>
                            <div>
                                 Rp.{{ number_format($invoice->ppn, 0, ',', '.') }}
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid"></td>
                        <td style="text-align: right; border: 1px solid;">Jumlah</td>
                        <td style="text-align: left; border: 1px solid;">Rp.{{ number_format($invoice->jumlah, 0, ',', '.') }}</td>
                    </tr>
                </tbody>
            </table>
            <p style="margin-top: 10px">Terbilang : <a style="font-style: italic; font-weight: bold;">{{$invoice->terbilang}}</a></p>
            <div style="font-style: italic; margin-top: 20px;">
                <p>
                    Jumlah tersebut harap disetor pada Bank Mandiri Cabang Pontianak Tanjungpura
                </p>
                <p>
                    A.n PT Perkebunan Nusantara IV
                </p>
                <p>
                    No. Rekg. 1050088001874
                </p>
            </div>
            <div class="ttd">
                <div class="isi">
                    <p>PT, PERKEBUNAN NUSANTARA IV</p>
                    <p>Senior Executive Vice President</p>
                    <p style="text-decoration: underline; font-weight: 500; padding-top: 80px;">{{ $ttd->sevp }}</p>
                    <p>SEVP Bussines Support</p>
                </div>
            </div>
        </div>
        <table class="footer">
            <tr class="tr">
                <td style="padding: 0">
                    <p style="color: blue; padding-right: 0; margin: 0;">AKLAK<a style="color: black; padding: 0; margin: 0;"> - Amanah, Kompeten, Harmonis, Loyal, Adaptif, Kolaboratif</a> </p>
                    <p>Head Office Gedung Agro Plaza Lt. 8</p>
                    <p>Jl. H.R Rasuma Said Kaiv X2 No.1</p>
                    <p>Telp     : +62 21 31119000</p>
                    <p>Email    : ptpnusantara4@ptpn4.co.id</p>
                </td>
                <td style="padding: 0" style="text-align: right;">
                    <p style="font-weight: 500; padding: 0; margin: 0; ">Regional V - Pontianak</p>
                    <p>Jl. Sultan Abdurahman 11, Pontianak 78113</p>
                    <p>Telp : +62 561 734110</p>
                    <p>Email : sekper@ptpn13.co.id</p>
                </td>
            </tr>
        </table>
    </div>
</body>
</html>
