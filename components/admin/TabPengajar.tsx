"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit3, X } from "lucide-react";

export default function TabPengajar() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    nip: "",
    jabatan: "",
    penugasan: "",
    sasaran: "",
    image: "",
    isHeadmaster: false,
    order: 0
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pengajar").then(r => r.json());
      if (res.success) setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setForm(item);
    } else {
      setEditingId(null);
      setForm({ name: "", nip: "", jabatan: "", penugasan: "", sasaran: "", image: "", isHeadmaster: false, order: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId ? { ...form, id: editingId } : form;
      
      await fetch("/api/pengajar", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      alert("Gagal menyimpan");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Hapus pengajar ini?")) return;
    try {
      await fetch(`/api/pengajar?id=${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      alert("Gagal menghapus");
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      }).then(r => r.json());
      
      if (res.success) {
        setForm({ ...form, image: res.url });
      } else {
        alert(res.error || "Gagal upload");
      }
    } catch (err) {
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-poppins font-bold text-navy">Struktur Tim Pengajar</h3>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-navy text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-gold transition-colors"
        >
          <Plus size={18} /> Tambah Staf
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className={`p-5 rounded-2xl border-2 bg-white relative ${item.isHeadmaster ? 'border-gold shadow-lg' : 'border-gray-100 shadow-sm'}`}>
            {item.isHeadmaster && (
              <span className="absolute top-0 right-0 bg-gold text-navy text-[10px] font-bold px-2 py-1 rounded-bl-xl rounded-tr-xl">KEPALA SEKOLAH</span>
            )}
            <h4 className="font-poppins font-bold text-navy">{item.name}</h4>
            <p className="text-xs text-gray-500 mb-2">NIP. {item.nip}</p>
            <div className="text-sm bg-gray-50 p-3 rounded-xl mb-4">
              <p className="font-bold text-gray-700">{item.jabatan}</p>
              <p className="text-xs text-gray-500 mt-1">{item.penugasan} ({item.sasaran})</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleOpenModal(item)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-navy py-1.5 rounded-lg text-sm font-bold flex justify-center items-center gap-1 transition-colors">
                <Edit3 size={14} /> Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="px-3 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-lg transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-3 text-center text-gray-400 py-10">Belum ada staf ditambahkan.</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/50">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingId ? "Edit" : "Tambah"} Staf Pengajar</h3>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Nama Lengkap & Gelar</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full p-3 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">NIP</label>
                  <input required type="text" value={form.nip} onChange={e => setForm({...form, nip: e.target.value})} className="w-full p-3 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Jabatan</label>
                <input required type="text" value={form.jabatan} onChange={e => setForm({...form, jabatan: e.target.value})} className="w-full p-3 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Penugasan</label>
                  <input required type="text" value={form.penugasan} onChange={e => setForm({...form, penugasan: e.target.value})} className="w-full p-3 border rounded-xl" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Sasaran</label>
                  <input required type="text" value={form.sasaran} onChange={e => setForm({...form, sasaran: e.target.value})} className="w-full p-3 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Foto Profile (Upload)</label>
                {form.image && (
                  <div className="mb-3 rounded-xl overflow-hidden w-24 h-24 border border-gray-200 shadow-sm">
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex gap-3 items-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleUploadImage}
                    disabled={uploading}
                    className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 file:transition-colors file:cursor-pointer"
                  />
                  {uploading && <span className="text-xs font-bold text-navy animate-pulse">Mengunggah...</span>}
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gold/10 rounded-xl">
                <input type="checkbox" id="headmaster" checked={form.isHeadmaster} onChange={e => setForm({...form, isHeadmaster: e.target.checked})} className="w-5 h-5 accent-navy" />
                <label htmlFor="headmaster" className="font-bold text-navy cursor-pointer">Jadikan Kepala Sekolah / Pimpinan Utama (Tier 1)</label>
              </div>
              
              <button type="submit" className="w-full py-3 bg-navy text-white rounded-xl font-bold mt-4 hover:bg-gold transition-colors">Simpan Staf</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
