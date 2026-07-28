"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, X, Trophy } from "lucide-react";
import Swal from "sweetalert2";

export default function TabPrestasi() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "",
    image: "",
    message: "",
    students: "",
    quote: "",
    footer: ""
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/prestasi").then(r => r.json());
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
      setForm({
        ...item,
        image: item.image || ""
      });
    } else {
      setEditingId(null);
      setForm({ title: "", category: "", image: "", message: "", students: "", quote: "", footer: "" });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId ? { ...form, id: editingId } : form;
      
      await fetch("/api/prestasi", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      setIsModalOpen(false);
      fetchData();
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data berhasil disimpan!', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: 'Gagal menyimpan data.' });
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0D2B5E',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    if (!result.isConfirmed) return;
    
    try {
      await fetch(`/api/prestasi?id=${id}`, { method: "DELETE" });
      fetchData();
      Swal.fire({ icon: 'success', title: 'Terhapus!', text: 'Data telah dihapus.', timer: 1500, showConfirmButton: false });
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: 'Gagal menghapus data!' });
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
        Swal.fire({ icon: 'error', title: 'Gagal', text: res.error || "Gagal upload" });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Gagal', text: 'Error uploading file' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-poppins font-bold text-navy">Manajemen Prestasi</h3>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-navy text-white px-5 py-2.5 rounded-full font-bold flex items-center gap-2 hover:bg-gold transition-colors"
        >
          <Plus size={18} /> Tambah Prestasi
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map(item => (
          <div key={item.id} className="p-5 rounded-2xl border-2 border-gray-100 bg-white shadow-sm flex flex-col justify-between">
            <div>
              {item.image && (
                <div className="relative w-full h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden">
                  <Image src={item.image} alt="Prestasi" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              )}
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={18} className="text-gold" />
                <h4 className="font-poppins font-bold text-navy text-lg line-clamp-2">{item.title}</h4>
              </div>
              <span className="inline-block bg-gold/10 text-gold text-xs font-bold px-3 py-1 rounded-full mb-3">{item.category}</span>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4">{item.message}</p>
            </div>
            
            <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
              <button onClick={() => handleOpenModal(item)} className="flex-1 bg-gray-100 hover:bg-gray-200 text-navy py-2 rounded-xl text-sm font-bold flex justify-center items-center gap-1 transition-colors">
                <Edit3 size={14} /> Edit
              </button>
              <button onClick={() => handleDelete(item.id)} className="px-4 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="col-span-2 text-center text-gray-400 py-10">Belum ada prestasi ditambahkan.</p>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/50">
          <div className="bg-white rounded-3xl w-full max-w-3xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingId ? "Edit" : "Tambah"} Prestasi</h3>
              <button onClick={() => setIsModalOpen(false)}><X/></button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              
              <div>
                <label className="block text-sm font-bold mb-2">Foto Prestasi (Opsional)</label>
                {form.image && (
                  <div className="mb-3 rounded-xl overflow-hidden w-full max-w-sm h-48 border border-gray-200 shadow-sm relative">
                    <Image src={form.image} alt="Preview" fill className="object-cover" sizes="384px" />
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Judul Prestasi</label>
                  <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full p-3 border rounded-xl" placeholder="Contoh: Juara 1 Voli Putra" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Tingkat / Kategori / Tahun</label>
                  <input required type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full p-3 border rounded-xl" placeholder="Contoh: Tingkat Kecamatan 2026" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Daftar Nama Siswa (Pisahkan dengan koma)</label>
                <textarea required rows={2} value={form.students} onChange={e => setForm({...form, students: e.target.value})} className="w-full p-3 border rounded-xl" placeholder="Contoh: AYANDI, DAFA ARSADIL PRATAMA, RAFI FAUZAN" />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Pesan Ucapan Selamat</label>
                <textarea required rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="w-full p-3 border rounded-xl" placeholder="Tuliskan ucapan selamat..." />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Pesan Motivasi (Quote)</label>
                  <textarea required rows={3} value={form.quote} onChange={e => setForm({...form, quote: e.target.value})} className="w-full p-3 border rounded-xl" placeholder="Semoga prestasi ini menjadi motivasi..." />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Catatan Tambahan (Footer)</label>
                  <textarea required rows={3} value={form.footer} onChange={e => setForm({...form, footer: e.target.value})} className="w-full p-3 border rounded-xl" placeholder="SDN 1 Cigalontang terus berkomitmen..." />
                </div>
              </div>
              
              <button type="submit" className="w-full py-3 bg-navy text-white rounded-xl font-bold mt-4 hover:bg-gold transition-colors">Simpan Prestasi</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
