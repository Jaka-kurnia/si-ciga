"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Trash2, X, Upload, Image as ImageIcon } from "lucide-react";
import Swal from "sweetalert2";

export default function TabGaleri() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    image: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/galeri").then(r => r.json());
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

  const handleOpenModal = () => {
    setForm({ image: "" });
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
        setForm({ ...form, image: res.url || res.filePath });
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
    if (!form.image) {
      Swal.fire({ icon: 'error', title: 'Oops', text: 'Foto harus diunggah!' });
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch("/api/galeri", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      }).then(r => r.json());

      if (res.success) {
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Foto berhasil disematkan ke MySQL!', timer: 1500, showConfirmButton: false });
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
      text: "Data foto ini akan dihapus permanen dari MySQL!",
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
        const res = await fetch(`/api/galeri?id=${id}`, {
          method: "DELETE"
        }).then(r => r.json());

        if (res.success) {
          Swal.fire({ icon: 'success', title: 'Terhapus!', text: 'Foto berhasil dihapus.', timer: 1500, showConfirmButton: false });
          fetchData();
        }
      } catch {
        Swal.fire({ icon: 'error', title: 'Gagal', text: 'Gagal menghapus foto.' });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-poppins font-bold text-navy">Manajemen Galeri Kegiatan</h3>
        <button
          onClick={() => handleOpenModal()}
          className="bg-navy hover:bg-gold text-white hover:text-navy font-poppins font-bold px-6 py-3 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 text-sm"
        >
          <Plus size={18} />
          <span>Tambah Foto Baru</span>
        </button>
      </div>

      {loading && items.length === 0 ? (
        <div className="p-12 text-center text-gray-400 font-roboto">Memuat data dari database MySQL...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <div key={item.id} className="relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 aspect-square">
              <Image 
                src={item.image} 
                alt="Galeri" 
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700" 
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-white/20 hover:bg-rose-600 text-white backdrop-blur-md rounded-full transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transform translate-y-8 group-hover:translate-y-0"
                  title="Hapus Foto"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && !loading && (
             <div className="col-span-full p-16 text-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 text-gray-400">
                 <ImageIcon size={32} />
               </div>
               <h4 className="text-navy font-poppins font-bold text-lg mb-2">Belum Ada Foto</h4>
               <p className="text-gray-500 font-roboto text-sm">Tambahkan foto baru untuk ditampilkan di galeri publik.</p>
             </div>
          )}
        </div>
      )}

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl font-poppins font-bold text-navy">
                Tambah Foto Galeri Baru
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
                <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">Foto Dokumentasi</label>
                <div className="flex flex-col gap-3">
                  <label className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-4 py-3 rounded-xl font-poppins font-semibold text-sm cursor-pointer flex items-center justify-center gap-2 transition-colors">
                    <Upload size={18} />
                    <span>{uploading ? "Mengunggah..." : "Pilih Foto dari Komputer"}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
                  </label>
                </div>
                {form.image && (
                  <div className="mt-4 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative aspect-video">
                    <Image src={form.image} alt="Preview" fill className="object-cover" sizes="400px" />
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-poppins font-semibold rounded-full text-sm transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading || !form.image}
                  className="px-8 py-3 bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold rounded-full text-sm shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : "Simpan Foto"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
