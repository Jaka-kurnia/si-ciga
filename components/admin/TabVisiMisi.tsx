"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function TabVisiMisi() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [visi, setVisi] = useState("");
  
  const [newMisi, setNewMisi] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/visimisi").then(r => r.json());
      if (res.success) {
        setItems(res.data);
        const visiItem = res.data.find((d: any) => d.type === "visi");
        if (visiItem) setVisi(visiItem.content);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveVisi = async () => {
    try {
      const existing = items.find(i => i.type === "visi");
      if (existing) {
        await fetch("/api/visimisi", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: existing.id, type: "visi", content: visi, order: 0 })
        });
      } else {
        await fetch("/api/visimisi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "visi", content: visi, order: 0 })
        });
      }
      alert("Visi berhasil disimpan!");
      fetchData();
    } catch (err) {
      alert("Gagal");
    }
  };

  const handleAddMisi = async () => {
    if (!newMisi) return;
    try {
      await fetch("/api/visimisi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "misi", content: newMisi, order: items.length })
      });
      setNewMisi("");
      fetchData();
    } catch (err) {
      alert("Gagal menambahkan misi");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus item ini?")) return;
    try {
      await fetch(`/api/visimisi?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      alert("Gagal menghapus");
    }
  };

  const misiList = items.filter(i => i.type === "misi");

  return (
    <div className="space-y-8">
      {/* VISI */}
      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
        <h3 className="text-xl font-poppins font-bold text-navy mb-4">Visi Sekolah</h3>
        <textarea 
          rows={3}
          value={visi}
          onChange={(e) => setVisi(e.target.value)}
          placeholder="Tuliskan Visi sekolah..."
          className="w-full p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy mb-4"
        />
        <button 
          onClick={handleSaveVisi}
          className="px-8 py-3 bg-navy text-white rounded-xl font-bold hover:bg-gold transition-colors"
        >
          Simpan Visi
        </button>
      </div>

      {/* MISI */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-poppins font-bold text-navy mb-4">Misi Sekolah</h3>
        
        <div className="flex gap-3 mb-6">
          <input 
            type="text" 
            value={newMisi}
            onChange={(e) => setNewMisi(e.target.value)}
            placeholder="Tambahkan Misi baru..."
            className="flex-1 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy"
          />
          <button 
            onClick={handleAddMisi}
            className="px-6 bg-gold text-navy rounded-xl font-bold hover:bg-yellow-500 transition-colors flex items-center gap-2"
          >
            <Plus size={18} /> Tambah
          </button>
        </div>

        <ul className="space-y-3">
          {misiList.map((misi, index) => (
            <li key={misi.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
              <span className="flex-1 mr-4"><strong>{index + 1}.</strong> {misi.content}</span>
              <button 
                onClick={() => handleDelete(misi.id)}
                className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
          {misiList.length === 0 && <p className="text-gray-400 text-sm">Belum ada misi ditambahkan.</p>}
        </ul>
      </div>
    </div>
  );
}
