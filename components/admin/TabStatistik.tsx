"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TabStatistik() {
  const [loading, setLoading] = useState(false);
  const [statistikList, setStatistikList] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/statistik").then(r => r.json());
      if (res.success) setStatistikList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatistikChange = (index: number, field: "label" | "count", value: string) => {
    const updated = [...statistikList];
    updated[index][field] = value;
    setStatistikList(updated);
  };

  const handleSaveStatistik = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/statistik", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statistikList),
      }).then((r) => r.json());

      if (res.success) {
        Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data Statistik berhasil disematkan ke MySQL!', timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire({ icon: 'error', title: 'Gagal', text: res.error || "Gagal menyimpan statistik." });
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Gagal', text: "Gagal menyimpan statistik." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSaveStatistik} className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 max-w-3xl">
      <h3 className="text-xl font-poppins font-bold text-navy mb-2">Manajemen Angka Statistik Sekolah</h3>
      <p className="text-sm font-roboto text-gray-500 mb-6">
        Ubah jumlah siswa, guru, atau ruang kelas. Perubahan akan langsung disinkronkan ke halaman beranda!
      </p>
      
      {loading && statistikList.length === 0 ? (
        <div className="p-12 text-center text-gray-400 font-roboto">Memuat data dari database MySQL...</div>
      ) : (
        <div className="space-y-5">
          {statistikList.map((stat, index) => (
            <div key={stat.id || index} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="w-full sm:w-1/2">
                <label className="block text-xs font-poppins font-bold text-gray-500 uppercase mb-1">
                  Label Statistik
                </label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatistikChange(index, "label", e.target.value)}
                  required
                  className="w-full font-poppins font-bold text-navy px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-navy transition-colors"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="block text-xs font-poppins font-bold text-gray-500 uppercase mb-1">
                  Angka / Jumlah
                </label>
                <input
                  type="text"
                  value={stat.count}
                  onChange={(e) => handleStatistikChange(index, "count", e.target.value)}
                  required
                  className="w-full font-poppins font-bold text-lg text-blue-600 px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-navy transition-colors"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading || statistikList.length === 0}
        className="mt-8 bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Menyimpan ke MySQL..." : "Simpan Perubahan Statistik"}
      </button>
    </form>
  );
}
