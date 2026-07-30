<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Identitas;

class IdentitasController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['label' => 'required', 'key' => 'required', 'value' => 'required']);
        Identitas::create($request->all());
        return redirect()->back()->with(['success' => 'Identitas berhasil ditambahkan!', 'tab' => 'identitas']);
    }

    public function update(Request $request)
    {
        if ($request->has('identitas')) {
            foreach ($request->identitas as $idData) {
                if (isset($idData['id'])) {
                    Identitas::where('id', $idData['id'])->update([
                        'value' => $idData['value'],
                    ]);
                }
            }
        }
        return redirect()->back()->with(['success' => 'Identitas berhasil diperbarui!', 'tab' => 'identitas']);
    }

    public function destroy($id)
    {
        Identitas::findOrFail($id)->delete();
        return redirect()->back()->with(['success' => 'Identitas berhasil dihapus!', 'tab' => 'identitas']);
    }
}
