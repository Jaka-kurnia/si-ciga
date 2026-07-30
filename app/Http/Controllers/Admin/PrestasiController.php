<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Prestasi;

class PrestasiController extends Controller
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
        $data = $request->all();
        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadImage($request, 'image', 'prestasi');
        }
        Prestasi::create($data);
        return redirect()->back()->with(['success' => 'Prestasi berhasil ditambahkan!', 'tab' => 'prestasi']);
    }

    public function update(Request $request, $id)
    {
        $data = $request->except(['_token', '_method', 'image']);
        if ($request->hasFile('image')) {
            $data['image'] = $this->uploadImage($request, 'image', 'prestasi');
        }
        Prestasi::findOrFail($id)->update($data);
        return redirect()->back()->with(['success' => 'Prestasi berhasil diupdate!', 'tab' => 'prestasi']);
    }

    public function destroy($id)
    {
        Prestasi::findOrFail($id)->delete();
        return redirect()->back()->with(['success' => 'Prestasi berhasil dihapus!', 'tab' => 'prestasi']);
    }
}
