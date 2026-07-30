<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Admin\BeritaController;
use App\Http\Controllers\Admin\StatistikController;
use App\Http\Controllers\Admin\IdentitasController;
use App\Http\Controllers\Admin\ProfilController;
use App\Http\Controllers\Admin\VisiMisiController;
use App\Http\Controllers\Admin\PengajarController;
use App\Http\Controllers\Admin\PrestasiController;
use App\Http\Controllers\Admin\GaleriController;
use App\Http\Controllers\AuthController;

Route::get('/', [HomeController::class, 'index']);

// Authentication Routes
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.post');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

// Halaman Admin (Protected by Auth)
Route::middleware(['auth'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');

    // CRUD Berita
    Route::post('/admin/berita', [BeritaController::class, 'store'])->name('admin.berita.store');
    Route::put('/admin/berita/{id}', [BeritaController::class, 'update'])->name('admin.berita.update');
    Route::delete('/admin/berita/{id}', [BeritaController::class, 'destroy'])->name('admin.berita.destroy');

    // CRUD Statistik
    Route::post('/admin/statistik', [StatistikController::class, 'store'])->name('admin.statistik.store');
    Route::put('/admin/statistik', [StatistikController::class, 'update'])->name('admin.statistik.update');
    Route::delete('/admin/statistik/{id}', [StatistikController::class, 'destroy'])->name('admin.statistik.destroy');

    // CRUD Identitas
    Route::post('/admin/identitas', [IdentitasController::class, 'store'])->name('admin.identitas.store');
    Route::put('/admin/identitas', [IdentitasController::class, 'update'])->name('admin.identitas.update');
    Route::delete('/admin/identitas/{id}', [IdentitasController::class, 'destroy'])->name('admin.identitas.destroy');

    // CRUD Profil
    Route::post('/admin/profil', [ProfilController::class, 'store'])->name('admin.profil.store');
    Route::put('/admin/profil', [ProfilController::class, 'update'])->name('admin.profil.update');
    Route::delete('/admin/profil/{id}', [ProfilController::class, 'destroy'])->name('admin.profil.destroy');

    // CRUD Visi Misi
    Route::post('/admin/visimisi', [VisiMisiController::class, 'store'])->name('admin.visimisi.store');
    Route::put('/admin/visimisi/{id}', [VisiMisiController::class, 'update'])->name('admin.visimisi.update');
    Route::delete('/admin/visimisi/{id}', [VisiMisiController::class, 'destroy'])->name('admin.visimisi.destroy');

    // CRUD Pengajar
    Route::post('/admin/pengajar', [PengajarController::class, 'store'])->name('admin.pengajar.store');
    Route::put('/admin/pengajar/{id}', [PengajarController::class, 'update'])->name('admin.pengajar.update');
    Route::delete('/admin/pengajar/{id}', [PengajarController::class, 'destroy'])->name('admin.pengajar.destroy');

    // CRUD Prestasi
    Route::post('/admin/prestasi', [PrestasiController::class, 'store'])->name('admin.prestasi.store');
    Route::put('/admin/prestasi/{id}', [PrestasiController::class, 'update'])->name('admin.prestasi.update');
    Route::delete('/admin/prestasi/{id}', [PrestasiController::class, 'destroy'])->name('admin.prestasi.destroy');

    // CRUD Galeri
    Route::post('/admin/galeri', [GaleriController::class, 'store'])->name('admin.galeri.store');
    Route::delete('/admin/galeri/{id}', [GaleriController::class, 'destroy'])->name('admin.galeri.destroy');
});
