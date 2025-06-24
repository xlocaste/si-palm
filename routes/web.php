<?php

use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\JatuhTempoController;
use App\Http\Controllers\KontrakController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RealisasiPenyerahanController;
use App\Http\Controllers\SalesOrderController;
use App\Http\Controllers\TtdController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Kontrak;
use Carbon\Carbon;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [KontrakController::class, 'dashboard'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('/kontrak')->name('kontrak.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [KontrakController::class, 'index'])->name('index');
        Route::get('/create', [KontrakController::class, 'create'])->name('create');
        Route::post('/', [KontrakController::class, 'store'])->name('store');
        Route::put('/{kontrak}', [KontrakController::class, 'update'])->name('update');
        Route::delete('/{kontrak}', [KontrakController::class, 'destroy'])->name('destroy');
        Route::get('/{kontrak}/edit', [KontrakController::class, 'edit'])->name('edit');
        Route::get('/{kontrak}/show', [KontrakController::class, 'show'])->name('show');
    });
});

Route::prefix('/invoice')->name('invoice.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [InvoiceController::class, 'index'])->name('index');
        Route::get('/create', [InvoiceController::class, 'create'])->name('create');
        Route::post('/', [InvoiceController::class, 'store'])->name('store');
        Route::put('/{invoice}', [InvoiceController::class, 'update'])->name('update');
        Route::delete('/{invoice}', [InvoiceController::class, 'destroy'])->name('destroy');
        Route::get('/{invoice}/edit', [InvoiceController::class, 'edit'])->name('edit');
        Route::get('/{invoice}/show', [InvoiceController::class, 'show'])->name('show');
        Route::get('/print/{invoice}', [InvoiceController::class, 'print'])->name('print');
    });
});

Route::prefix('/sales-order')->name('sales-order.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [SalesOrderController::class, 'index'])->name('index');
        Route::get('/create', [SalesOrderController::class, 'create'])->name('create');
        Route::post('/', [SalesOrderController::class, 'store'])->name('store');
        Route::put('/{salesOrder}', [SalesOrderController::class, 'update'])->name('update');
        Route::delete('/{salesOrder}', [SalesOrderController::class, 'destroy'])->name('destroy');
        Route::get('/{salesOrder}/edit', [SalesOrderController::class, 'edit'])->name('edit');
        Route::get('/{salesOrder}/show', [SalesOrderController::class, 'show'])->name('show');
        Route::get('/print/{salesOrder}', [SalesOrderController::class, 'printSingle'])->name('print');
    });
});

Route::prefix('/realisasi-penyerahan')->name('realisasi-penyerahan.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [RealisasiPenyerahanController::class, 'index'])->name('index');
        Route::get('/create', [RealisasiPenyerahanController::class, 'create'])->name('create');
        Route::post('/', [RealisasiPenyerahanController::class, 'store'])->name('store');
        Route::put('/{realisasiPenyerahan}', [RealisasiPenyerahanController::class, 'update'])->name('update');
        Route::delete('/{realisasiPenyerahan}', [RealisasiPenyerahanController::class, 'destroy'])->name('destroy');
        Route::get('/{realisasiPenyerahan}/edit', [RealisasiPenyerahanController::class, 'edit'])->name('edit');
        Route::get('/{realisasiPenyerahan}/show', [RealisasiPenyerahanController::class, 'show'])->name('show');
        Route::get('/print/{realisasiPenyerahan}', [RealisasiPenyerahanController::class, 'printSingle'])->name('print');
    });
});

Route::prefix('/tempo-penyerahan')->name('tempo-penyerahan.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [KontrakController::class, 'tempoPenyerahan'])->name('index');
    });
});

Route::prefix('/kontrak-cpo')->name('kontrak-cpo.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [KontrakController::class, 'showCPO'])->name('index');
        Route::get('/kontrak-cpo/{no_kontrak}', [KontrakController::class, 'show'])->name('kontrak-cpo.show');
        Route::get('/print/{kontrak}', [KontrakController::class, 'printSingleCPO'])->name('print');
    });
});

Route::prefix('/kontrak-pk')->name('kontrak-pk.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [KontrakController::class, 'showPK'])->name('index');
        Route::get('/print/{kontrak}', [KontrakController::class, 'printSinglePK'])->name('print');
    });
});

Route::prefix('/pembayaran')->name('pembayaran.')->group(function() {
    Route::group(['middleware' => ['auth']], function() {
        Route::get('/', [PembayaranController::class, 'index'])->name('index');
        Route::get('/create', [PembayaranController::class, 'create'])->name('create');
        Route::post('/', [PembayaranController::class, 'store'])->name('store');
        Route::put('/{pembayaran}', [PembayaranController::class, 'update'])->name('update');
        Route::delete('/{pembayaran}', [PembayaranController::class, 'destroy'])->name('destroy');
        Route::get('/{pembayaran}/edit', [PembayaranController::class, 'edit'])->name('edit');
    });
});

Route::prefix('/jatuh-tempo')->name('jatuh-tempo.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [JatuhTempoController::class, 'index'])->name('index');
    });
});

Route::prefix('/laporan')->name('laporan.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [LaporanController::class, 'index'])->name('index');
        Route::get('/{kontrak}/show', [LaporanController::class, 'show'])->name('show');
        Route::get('/{kontrak}/print', [LaporanController::class, 'merge'])->name('merge');
    });
});

Route::prefix('/ttd')->name('ttd.')->group(function () {
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [TtdController::class, 'index'])->name('index');
        Route::put('/{ttd}', [TtdController::class, 'update'])->name('update');
    });
});

require __DIR__.'/auth.php';
