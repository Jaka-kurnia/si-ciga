"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TabIdentitas() {
  const [loading, setLoading] = useState(false);
  const [identitasList, setIdentitasList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/identitas").then(r => r.json());
      if (res.success) setIdentitasList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleIdentitasChange = (index: number, value: string) => {
    const updated = [...identitasList];
    updated[index].value = value;
    setIdentitasList(updated);
  };

  const handleSaveIdentitas = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/identitas", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(identitasList),
      }).then((r) => r.json());

      if (res.success) {
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data Identitas & Kontak sekolah berhasil disematkan ke MySQL!', timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: res.error || "Gagal menyimpan identitas." });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal menyimpan identitas." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSaveIdentitas} className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 max-w-3xl">
      <h3 className="text-xl font-poppins font-bold text-navy mb-2">Manajemen Profil & Kontak Sekolah</h3>
      <p className="text-sm font-roboto text-gray-500 mb-6">
        Atur informasi identitas seperti Akreditasi, NPSN, Telepon, dan Email resmi yang tampil di Footer & Tentang Kami.
      </p>

      {loading && identitasList.length === 0 ? (
        <div className="p-12 text-center text-gray-400 font-roboto">Memuat data dari database MySQL...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {identitasList.map((idItem, index) => (
            <div key={idItem.id || index} className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <label className="block text-xs font-poppins font-bold text-gray-500 uppercase mb-1">
                {idItem.label}
              </label>
              <input
                type="text"
                value={idItem.value}
                onChange={(e) => handleIdentitasChange(index, e.target.value)}
                required
                className="w-full font-poppins font-semibold text-navy text-base px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-navy transition-colors"
              />
            </div>
          ))}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || identitasList.length === 0}
        className="mt-8 bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Menyimpan ke MySQL..." : "Simpan Perubahan Identitas"}
      </button>
    </form>
  );
}
