<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profil;

class ProfilController extends Controller
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
        $request->validate(['key' => 'required', 'content' => 'required']);
        Profil::create($request->all());
        return redirect()->back()->with(['success' => 'Profil berhasil ditambahkan!', 'tab' => 'profil']);
    }

    public function update(Request $request)
    {
        if ($request->has('profil')) {
            foreach ($request->profil as $profData) {
                if (isset($profData['id'])) {
                    Profil::where('id', $profData['id'])->update([
                        'content' => $profData['content'],
                    ]);
                }
            }
        }
        if ($request->hasFile('image')) {
            $path = $this->uploadImage($request, 'image', 'profil');
            Profil::updateOrCreate(['key' => 'image'], ['content' => $path]);
        }
        return redirect()->back()->with(['success' => 'Profil berhasil diperbarui!', 'tab' => 'profil']);
    }

    public function destroy($id)
    {
        Profil::findOrFail($id)->delete();
        return redirect()->back()->with(['success' => 'Profil berhasil dihapus!', 'tab' => 'profil']);
    }
}
