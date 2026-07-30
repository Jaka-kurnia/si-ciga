<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Berita;
use App\Models\Statistik;
use App\Models\Identitas;
use App\Models\Prestasi;
use App\Models\Profil;
use App\Models\VisiMisi;
use App\Models\Pengajar;
use App\Models\Galeri;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $tab = $request->query('tab', 'berita');

        $berita = Berita::orderBy('created_at', 'desc')->get();
        $statistik = Statistik::all();
        $identitas = Identitas::all();
        $prestasi = Prestasi::all();
        $profil = Profil::all();
        $visiMisi = VisiMisi::orderBy('order', 'asc')->get();
        $pengajar = Pengajar::orderBy('order', 'asc')->get();
        $galeri = Galeri::orderBy('created_at', 'desc')->get();

        return view('admin.index', compact(
            'tab', 'berita', 'statistik', 'identitas', 'prestasi', 'profil', 'visiMisi', 'pengajar', 'galeri'
        ));
    }
}
