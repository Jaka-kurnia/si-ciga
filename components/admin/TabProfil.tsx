"use client";
import { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

export default function TabProfil() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    paragraf1: "",
    paragraf2: "",
    image: "/fotoSekolah/foto2.jpg"
  });

  const fetchData = async () => {
    try {
      const res = await fetch("/api/profil").then(r => r.json());
      if (res.success && res.data) {
        const p1 = res.data.find((d: any) => d.key === "paragraf1")?.content || "";
        const p2 = res.data.find((d: any) => d.key === "paragraf2")?.content || "";
        const img = res.data.find((d: any) => d.key === "image")?.content || "/fotoSekolah/foto2.jpg";
        setForm({ paragraf1: p1, paragraf2: p2, image: img });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (key: string, content: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/profil", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, content })
      }).then(r => r.json());
      
      if (res.success) {
        setMessage("Berhasil disimpan!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      alert("Gagal menyimpan");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      }).then(r => r.json());
      
      if (res.success) {
        setForm({ ...form, image: res.url });
        handleSave("image", res.url);
      } else {
        alert(res.error || "Gagal upload");
      }
    } catch (err) {
      alert("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-poppins font-bold text-navy">Profil Tentang Kami</h3>
        {message && <span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full">{message}</span>}
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-2">Foto Profil (Upload)</label>
          {form.image && (
            <div className="mb-4 rounded-xl overflow-hidden max-w-xs border border-gray-200 shadow-sm">
              <img src={form.image} alt="Preview" className="w-full h-40 object-cover" />
            </div>
          )}
          <div className="flex gap-3 items-center">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleUploadImage}
              disabled={loading}
              className="flex-1 text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-navy file:text-white hover:file:bg-gold file:transition-colors file:cursor-pointer"
            />
            {loading && <span className="text-sm font-bold text-navy animate-pulse">Mengunggah...</span>}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-2">Paragraf 1</label>
          <textarea 
            rows={4}
            value={form.paragraf1}
            onChange={(e) => setForm({...form, paragraf1: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy mb-3"
          />
          <button 
            onClick={() => handleSave("paragraf1", form.paragraf1)}
            disabled={loading}
            className="px-6 py-2.5 bg-navy text-white rounded-xl font-bold hover:bg-gold transition-colors text-sm"
          >
            Simpan Paragraf 1
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <label className="block text-sm font-bold text-gray-700 mb-2">Paragraf 2</label>
          <textarea 
            rows={4}
            value={form.paragraf2}
            onChange={(e) => setForm({...form, paragraf2: e.target.value})}
            className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy mb-3"
          />
          <button 
            onClick={() => handleSave("paragraf2", form.paragraf2)}
            disabled={loading}
            className="px-6 py-2.5 bg-navy text-white rounded-xl font-bold hover:bg-gold transition-colors text-sm"
          >
            Simpan Paragraf 2
          </button>
        </div>
      </div>
    </div>
  );
}
