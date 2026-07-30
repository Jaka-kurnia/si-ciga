<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Statistik;
use App\Models\Identitas;
use App\Models\Prestasi;
use App\Models\Profil;
use App\Models\VisiMisi;
use App\Models\Pengajar;
use App\Models\Galeri;

class HomeController extends Controller
{
    public function index()
    {
        $berita = Berita::orderBy('created_at', 'desc')->get();
        $statistik = Statistik::all();
        $identitas = Identitas::all();
        $prestasi = Prestasi::all();
        $profil = Profil::all();
        $visiMisi = VisiMisi::orderBy('order', 'asc')->get();
        $pengajar = Pengajar::orderBy('order', 'asc')->get();
        $galeri = Galeri::orderBy('created_at', 'desc')->get();

        return view('welcome', compact(
            'berita', 'statistik', 'identitas', 'prestasi', 'profil', 'visiMisi', 'pengajar', 'galeri'
        ));
    }
}
