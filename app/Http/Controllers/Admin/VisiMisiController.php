<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\VisiMisi;

class VisiMisiController extends Controller
{
    public function store(Request $request)
    {
        VisiMisi::create($request->all());
        return redirect()->back()->with(['success' => 'Data berhasil ditambahkan!', 'tab' => 'visimisi']);
    }

    public function update(Request $request, $id)
    {
        VisiMisi::findOrFail($id)->update($request->except(['_token', '_method']));
        return redirect()->back()->with(['success' => 'Data berhasil diupdate!', 'tab' => 'visimisi']);
    }

    public function destroy($id)
    {
        VisiMisi::findOrFail($id)->delete();
        return redirect()->back()->with(['success' => 'Data berhasil dihapus!', 'tab' => 'visimisi']);
    }
}
