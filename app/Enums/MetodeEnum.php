<?php

namespace App\Enums;

enum MetodeEnum: string
{
    case TUNAI = 'Tunai';
    case TRANSFER = 'Transfer';
    case DEBIT = 'Debit';
    case KREDIT = 'Kredit';
    case EWALLET = 'E-Wallet';
}
