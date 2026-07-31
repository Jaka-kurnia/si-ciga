<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Galeri;

class GaleriController extends Controller
{
    private function uploadImage(Request $request, $fieldName, $folder)
    {
        if ($request->hasFile($fieldName)) {
            $path = $request->file($fieldName)->store($folder, 'public');
            return '/storage/' . $path;
        }
        return null;
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image'
        ], [
            'image.required' => 'Foto dokumentasi wajib diunggah.'
        ]);

        if ($request->hasFile('image')) {
            $path = $this->uploadImage($request, 'image', 'galeri');
            Galeri::create(['image' => $path]);
        }
        return redirect()->back()->with(['success' => 'Foto Galeri berhasil ditambahkan!', 'tab' => 'galeri']);
    }

    public function destroy($id)
    {
        Galeri::findOrFail($id)->delete();
        return redirect()->back()->with(['success' => 'Foto Galeri berhasil dihapus!', 'tab' => 'galeri']);
    }
}
