"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, Edit3, X, Upload } from "lucide-react";
import Swal from "sweetalert2";

export default function TabBerita() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    title: "",
    category: "Kegiatan Sekolah",
    date: "",
    image: "",
    excerpt: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/berita").then(r => r.json());
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
        title: item.title,
        category: item.category,
        date: item.date,
        image: item.image,
        excerpt: item.excerpt,
      });
    } else {
      setEditingId(null);
      setForm({ 
        title: "", 
        category: "Kegiatan Sekolah", 
        date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }), 
        image: "/fotoBerita/upacar.jpeg", 
        excerpt: "" 
      });
    }
    setIsModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      }).then(r => r.json());

      if (res.success) {
        setForm({ ...form, image: res.filePath });
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Foto telah diunggah!', timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: res.error || "Gagal mengunggah foto." });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal', text: 'Terjadi kesalahan sistem saat mengunggah foto.' });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const method = editingId ? "PUT" : "POST";
      const payload = editingId ? { ...form, id: editingId } : form;
      
      const res = await fetch("/api/berita", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(r => r.json());

      if (res.success) {
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data Berita berhasil disematkan ke MySQL!', timer: 1500, showConfirmButton: false });
        setIsModalOpen(false);
        fetchData();
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: res.error || "Gagal menyimpan data." });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal', text: 'Terjadi kesalahan pada server.' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data berita ini akan dihapus permanen dari MySQL!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const res = await fetch("/api/berita", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id })
        }).then(r => r.json());

        if (res.success) {
          Swal.fire({ icon: 'success', title: 'Terhapus!', text: 'Data berita berhasil dihapus.', timer: 1500, showConfirmButton: false });
          fetchData();
        }
      } catch {
        Swal.fire({ icon: 'error', title: 'Gagal', text: 'Gagal menghapus berita.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-poppins font-bold text-navy">Daftar Berita & Dokumentasi</h3>
        <button
          onClick={() => handleOpenModal()}
          className="bg-navy hover:bg-gold text-white hover:text-navy font-poppins font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 text-sm"
        >
          <Plus size={18} />
          <span>Tambah Berita Baru</span>
        </button>
      </div>

      {loading && items.length === 0 ? (
        <div className="p-12 text-center text-gray-400 font-roboto">Memuat data dari database MySQL...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between h-full">
              <div>
                <div className="aspect-16/10 bg-gray-100 relative overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <span className="absolute top-3 left-3 bg-navy/90 text-gold text-xs font-poppins font-bold px-3 py-1 rounded-full uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="p-6">
                  <span className="text-xs text-gray-400 font-roboto block mb-1">{item.date}</span>
                  <h4 className="font-poppins font-bold text-navy text-lg leading-snug mb-2 line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 font-roboto text-xs leading-relaxed line-clamp-3">
                    {item.excerpt}
                  </p>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end space-x-2">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="p-2 bg-white hover:bg-amber-50 text-amber-600 border border-gray-200 rounded-xl transition-colors shadow-xs"
                  title="Edit Berita"
                >
                  <Edit3 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-white hover:bg-rose-50 text-rose-600 border border-gray-200 rounded-xl transition-colors shadow-xs"
                  title="Hapus Berita"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl font-poppins font-bold text-navy">
                {editingId ? "Edit Berita Sekolah" : "Tambah Berita & Kegiatan Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-navy rounded-full bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">Judul Berita</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Juara Lomba Calistung Tingkat Kabupaten..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-roboto text-base focus:border-navy outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">Kategori</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-roboto text-base focus:border-navy outline-none bg-white"
                  >
                    <option value="Kegiatan Sekolah">Kegiatan Sekolah</option>
                    <option value="Kedisiplinan">Kedisiplinan</option>
                    <option value="Akademik & Staf">Akademik & Staf</option>
                    <option value="Komite Sekolah">Komite Sekolah</option>
                    <option value="Prestasi Siswa">Prestasi Siswa</option>
                    <option value="Kegiatan Religius">Kegiatan Religius</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">Tanggal Tampilkan</label>
                  <input
                    type="text"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="Contoh: 26 Juli 2026"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-roboto text-base focus:border-navy outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">Foto Dokumentasi</label>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="/fotoBerita/solatduha.jpeg atau /uploads/..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-roboto text-sm text-gray-600 outline-none"
                  />
                  <label className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-4 py-3 rounded-xl font-poppins font-semibold text-xs cursor-pointer flex items-center justify-center gap-2 shrink-0 transition-colors">
                    <Upload size={16} />
                    <span>{uploading ? "Mengunggah..." : "Upload Komputer"}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
                  </label>
                </div>
                {form.image && (
                  <div className="mt-3 h-32 w-full sm:w-48 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <div className="relative w-full h-full">
                      <Image src={form.image} alt="Preview" fill className="object-cover" sizes="192px" />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">Ringkasan Berita (Excerpt)</label>
                <textarea
                  required
                  rows={4}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  placeholder="Tulis ringkasan berita singkat di sini..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-roboto text-base focus:border-navy outline-none resize-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-poppins font-semibold rounded-full text-sm transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold rounded-full text-sm shadow-lg transition-all duration-300"
                >
                  {loading ? "Menyimpan..." : "Simpan ke Database MySQL"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
