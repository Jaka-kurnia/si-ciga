<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pengajar;

class PengajarController extends Controller
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
            'name' => 'required|string',
            'position' => 'required|string',
            'image' => 'nullable|image|max:700',
        ], [
            'image.max' => 'Ukuran foto maksimal adalah 700KB.'
        ]);
        $data = $request->all();
        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadImage($request, 'image', 'pengajar');
        }
        Pengajar::create($data);
        return redirect()->back()->with(['success' => 'Pengajar berhasil ditambahkan!', 'tab' => 'pengajar']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'position' => 'required|string',
            'image' => 'nullable|image|max:700',
        ], [
            'image.max' => 'Ukuran foto maksimal adalah 700KB.'
        ]);
        $data = $request->except(['_token', '_method', 'image']);
        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadImage($request, 'image', 'pengajar');
        }
        Pengajar::findOrFail($id)->update($data);
        return redirect()->back()->with(['success' => 'Pengajar berhasil diupdate!', 'tab' => 'pengajar']);
    }

    public function destroy($id)
    {
        Pengajar::findOrFail($id)->delete();
        return redirect()->back()->with(['success' => 'Pengajar berhasil dihapus!', 'tab' => 'pengajar']);
    }
}
