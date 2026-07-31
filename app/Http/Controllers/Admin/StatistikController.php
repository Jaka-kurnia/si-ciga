<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Statistik;

class StatistikController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(['label' => 'required', 'count' => 'required']);
        // Default iconName if not provided
        $data = $request->all();
        if(!isset($data['iconName'])) $data['iconName'] = 'circle';
        Statistik::create($data);
        return redirect()->back()->with(['success' => 'Statistik berhasil ditambahkan!', 'tab' => 'statistik']);
    }

    public function update(Request $request)
    {
        if ($request->has('statistik')) {
            $request->validate([
                'statistik.*.label' => 'required|string',
                'statistik.*.count' => 'required|string',
            ]);
            foreach ($request->statistik as $statData) {
                if (isset($statData['id'])) {
                    Statistik::where('id', $statData['id'])->update([
                        'label' => $statData['label'],
                        'count' => $statData['count'],
                    ]);
                }
            }
        }
        return redirect()->back()->with(['success' => 'Statistik berhasil diperbarui!', 'tab' => 'statistik']);
    }

    public function destroy($id)
    {
        Statistik::findOrFail($id)->delete();
        return redirect()->back()->with(['success' => 'Statistik berhasil dihapus!', 'tab' => 'statistik']);
    }
}
