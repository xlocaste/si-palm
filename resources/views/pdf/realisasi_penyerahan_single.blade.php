<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Realisasi Penyerahan</title>
    <link rel="stylesheet" href="{{ public_path('css/rp.css') }}">
</head>
<body>
     <div class="container">
        <div class="image">
            <img src="image/ptpn.png" alt="">
        </div>
        <div class="header">
            <table class="head">
                <tr>
                    <td>Nomor</td> <td> : </td> <td> </td>
                    <td></td>
                    <td style="text-align: right">Pontianak, {{ $realisasiPenyerahan->formatted_created_at }}</td>
                </tr>
                <tr>
                    <td>Lamp.</td> <td> : </td> <td> - </td>
                </tr>
                <tr>
                    <td>Hal</td> <td> : </td> <td> Realisasi Pengapalan/Pengiriman {{$realisasiPenyerahan->kontrak->jenis_kontrak}} </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td style="width: 120px"></td>
                    <td>
                        <p>Kepada</p>
                        <p style="font-weight: 500">Divisi Pemasaran </p>
                        <p style="font-weight: 500">PT. Perkebunan Nusantara IV </p>
                        <p>di-</p>
                        <p style="padding-left: 50px">Tempat</p>
                        <p>
                            Dengan ini kami sampaikan mengenai realisasi pengapalan {{$realisasiPenyerahan->kontrak->jenis_kontrak}} PKS Rimba Belian & PKS Gunung
                            Meliau di wilayah Regional V PT. Perkebunan Nusantara IV sebagai berikut:
                        </p>
                        <p style="font-weight: 500">A. Pembeli</p>
                        <p>Nama Pembeli : {{$realisasiPenyerahan->kontrak->pembeli}}</p>
                        <p>No. Kontrak : {{$realisasiPenyerahan->kontrak->no_kontrak}}</p>
                        <p>Volume Kontrak : {{$realisasiPenyerahan->kontrak->volume}}</p>
                        <p>Volume Realisasi : {{$realisasiPenyerahan->kontrak->volume}}</p>
                        <p style="font-weight: 500">B. Realisasi Penyerahan</p>
                        <table class="table">
                            <thead class="thead">
                                <tr>
                                    <th rowspan="2">Nomor/Tgl</th>
                                    <th rowspan="2">Mutu ALB (%)</th>
                                    <th rowspan="2">Volume (Kg)</th>
                                    <th colspan="2">Pembayaran</th>
                                    <th colspan="6">Realisasi Penyerahan</th>
                                    <th rowspan="2">FOB</th>
                                    <th rowspan="2">Sisa Kontrak (Kg)</th>
                                </tr>
                                <tr>
                                    <th>Tgl Batas Pembayaran</th>
                                    <th>Tgl Realisasi Pembayaran</th>

                                    <th>Tgl Realisasi Pengapalan</th>
                                    <th>Tahap</th>
                                    <th>Volume (Kg)</th>
                                    <th>ALB (%)</th>
                                    <th>K. Air (%)</th>
                                    <th>K. Kot. (%)</th>
                                </tr>
                            </thead>
                            <tbody class="tbody">
                                <tr>
                                    <td>{{$realisasiPenyerahan->kontrak->no_kontrak}}</td>
                                    <td>{{$realisasiPenyerahan->alb}}</td>
                                    <td>{{$realisasiPenyerahan->kontrak->volume}}</td>
                                    <td>{{$realisasiPenyerahan->kontrak->jatuh_tempo}}</td>
                                    <td>{{$realisasiPenyerahan->formatted_created_at}}</td>
                                    <td>{{$realisasiPenyerahan->formatted_created_at}}</td>
                                    <td> 1 </td>
                                    <td>{{$realisasiPenyerahan->kontrak->volume}}</td>
                                    <td>{{$realisasiPenyerahan->alb}}</td>
                                    <td>{{$realisasiPenyerahan->ka}}</td>
                                    <td>{{$realisasiPenyerahan->kk}}</td>
                                    <td>
                                        5PRM
                                        5PGM
                                    </td>
                                    <td> - </td>
                                </tr>
                                <tr>
                                    <td>jumlah</td>
                                    <td></td>
                                    <td>{{$realisasiPenyerahan->kontrak->volume}}</td>
                                    <td></td>
                                    <td>{{$realisasiPenyerahan->kontrak->volume}}</td>
                                    <td></td>
                                    <td></td>
                                    <td>{{$realisasiPenyerahan->kontrak->volume}}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            Dengan ini agar dapat segera diterbitkan perhitungan rampung atas pengapalan {{$realisasiPenyerahan->kontrak->jenis_kontrak}} untuk Kontrak
                            No. {{$realisasiPenyerahan->kontrak->no_kontrak}}
                        </p>
                            <br>
                        <p>Demikian kami sampaikan, atas perhatian dan kerjasamanya diucapkan terimakasih.</p>
                    </td>
                </tr>
            </table>
        </div>
        <div class="ttd">
            <div class="isi">

                <p>PT, PERKEBUNAN NUSANTARA IV</p>
                <p>Senior Executive Vice President</p>
                <p style="text-decoration: underline; font-weight: 500; padding-top: 80px;">Muhammad Zulham Rambe</p>
                <p>SEVP Bussines Support</p>
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
