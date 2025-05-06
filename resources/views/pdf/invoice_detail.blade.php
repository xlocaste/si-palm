<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Invoice {{ $invoice->no_invoice }}</title>
    <style>
        body { font-family: sans-serif; font-size: 14px; }
        .container { width: 100%; margin: 0 auto; }
        h2 { text-align: center; }
        .info { margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <h2>Invoice CPO</h2>
        <div class="info">
            <p><strong>No Invoice :</strong> {{ $invoice->no_invoice }}</p>
            <p><strong>Tanggal Bayar :</strong> {{ $invoice->tanggal_bayar }}</p>
            <p><strong>Volume :</strong> {{ $invoice->kontrak->volume ?? '-' }}</p>
            <p><strong>Tanggal Bayar :</strong> {{ $invoice->nilai }}</p>
        </div>
    </div>
</body>
</html>
