<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ public_path('css/so.css') }}">
</head>
<body>
    <div class="container">
        <div class="image">
            <img src="image/ptpn.png" alt="">
        </div>
        <div class="judul" style="margin-top: 10px">
            <p>
                ORDER PENYERAHAN / DELIVERY ORDER
            </p>
        </div>
        <div class="penerima" style="margin-top: 10px">
            <table>
                <tr>
                    <td>
                        Nomor
                    </td>
                    <td> : </td>
                    <td>
                        {{$salesOrder->no_sales_order}}
                    </td>
                    <td>
                        Pontianak, {{ $salesOrder->formatted_created_at }}
                    </td>
                </tr>
                <tr style="font-weight: 500;">
                    <td>
                        Kepada
                    </td>
                    <td> : </td>
                    <td>
                        {{$salesOrder->kontrak->pembeli}}
                    </td>
                </tr>
            </table>
        </div>
        <div class="table" style="margin-top: 20px;">
            <p>
                Mohon segera dilaksanakan pengambilan {{$salesOrder->kontrak->jenis_kontrak}} di PKS Rimba Belian Kalimantan Barat sesuai
kontrak sebagai berikut :
            </p>
            <table style="margin-top: 5px">
                <thead>
                    <tr>
                        <th rowspan="2">Jenis<br>Produksi</th>
                        <th colspan="2">Kontrak</th>
                        <th rowspan="2">ALB<br>(%)</th>
                        <th rowspan="2">K. A - K. K<br>(%)</th>
                        <th rowspan="2">Jumlah<br>(Netto)</th>
                        <th rowspan="2">Catatan</th>
                    </tr>
                    <tr style="background-color: #ffff66; font-weight: bold;">
                        <th>Nomor</th>
                        <th>Tgl.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{$salesOrder->kontrak->jenis_kontrak}}</td>
                        <td>{{$salesOrder->kontrak->no_kontrak}}</td>
                        <td>{{$salesOrder->kontrak->tanggal_kontrak}}</td>
                        <td>5</td>
                        <td>0,5</td>
                        <td>{{$salesOrder->volume_sales_order}}</td>
                        <td>Tahap - {{$salesOrder->tahap}}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="7" style="text-align: left; font-weight: 500">
                            Syarat Penyerahan: PKS Rimbu Belian
                        </td>
                    </tr>
                    <tr>
                        <td colspan="4" style="text-align: left;">
                            Pembayaran telah dilaksanakan melalui :
                            <p style="padding: 0; margin: 0; font-weight: 500;">{{$salesOrder->kontrak->pembayaran->nama_bank}}</p>
                            <p style="padding: 0; margin: 0;">Ke Rekening PTPN IV</p>
                            <p style="padding: 0; margin: 0;">A/C No. {{$salesOrder->kontrak->pembayaran->rek_no}}</p>
                            <p style="padding: 0; margin: 0;">Pada tanggal {{$salesOrder->kontrak->pembayaran->created_at}}</p>
                        </td>
                        <td colspan="3" style="text-align: left; padding: 0;">
                            <p style="font-weight: 500">Catatan :</p>
                            <p>
                                - Setelah barang diserahkan, agar dibuat Berita Acara serah terima.
                            </p>
                            <p>
                                - Penimbangan / pengukuran dilaksanakan di gudang tempat pengambilan barang.
                            </p>
                            <p>
                                - Pengambilan barang, sesegera mungkin
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7" style="text-align: left;">
                            Order penyerahan ini berlaku sejak tanggal diterbitkan s/d tgl. <a style="font-weight: bold">30 Januari 2024</a> Terhitung mulai tanggal
                            jatuh tempo DO ini, barang belum diambil maka segala ongkos veem, sewa gudang, kerusakan mutu dan
                            kesusutan, dll. Ditanggung oleh pembeli.
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class="ttd" style="margin-top: 10px">
            <table>
                <tr>
                    <th colspan="2">Bagian Pengadaan & teknisi laboratorium</th>
                </tr>
                <tr>
                    <th>
                        Kepala Sub Bagian Logistik
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        Arie Rizky Richard
                    </th>
                    <th>
                        Kepala Bagian Pengadaan & TI
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        <br>
                        Sri Yetty Mida M, N.
                    </th>
                </tr>
            </table>
        </div>
        <div style="padding-top: 10px;">
            <p>Tembusan :</p>
            <p>5PRM (PKS Rimba Belian)
</p>
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
