<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Berita;

class BeritaController extends Controller
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
        $data = $request->validate([
            'title' => 'required|string',
            'date' => 'required|string',
            'category' => 'required|string',
            'excerpt' => 'required|string',
        ]);
        
        $data['image'] = $this->uploadImage($request, 'image', 'berita') ?? '';
        Berita::create($data);
        return redirect()->back()->with(['success' => 'Berita berhasil ditambahkan!', 'tab' => 'berita']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'date' => 'required|string',
            'category' => 'required|string',
            'excerpt' => 'required|string',
        ]);
        
        $berita = Berita::findOrFail($id);
        $data = $request->except(['_token', '_method', 'image']);
        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadImage($request, 'image', 'berita');
        }
        $berita->update($data);
        return redirect()->back()->with(['success' => 'Berita berhasil diupdate!', 'tab' => 'berita']);
    }

    public function destroy($id)
    {
        Berita::findOrFail($id)->delete();
        return redirect()->back()->with(['success' => 'Berita berhasil dihapus!', 'tab' => 'berita']);
    }
}
