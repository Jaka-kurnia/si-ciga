"use client";
import { useState, useEffect } from "react";
import { Newspaper, BarChart2, Building2, Plus, Edit3, Trash2, Check, X, Upload, RefreshCw, Lock, ArrowRight, Users, FileText, Target, Trophy } from "lucide-react";
import TabProfil from "@/components/admin/TabProfil";
import TabVisiMisi from "@/components/admin/TabVisiMisi";
import TabPengajar from "@/components/admin/TabPengajar";
import TabPrestasi from "@/components/admin/TabPrestasi";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"berita" | "statistik" | "identitas" | "profil" | "visimisi" | "pengajar" | "prestasi">("berita");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  // Data States
  const [beritaList, setBeritaList] = useState<any[]>([]);
  const [statistikList, setStatistikList] = useState<any[]>([]);
  const [identitasList, setIdentitasList] = useState<any[]>([]);

  // Form Modal Berita State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [beritaForm, setBeritaForm] = useState({
    title: "",
    category: "Kegiatan Sekolah",
    date: "",
    image: "",
    excerpt: "",
  });
  const [uploading, setUploading] = useState(false);

  // Cek otorisasi simpel (bisa bypass di localStorage untuk kemudahan KKN)
  useEffect(() => {
    const savedAuth = localStorage.getItem("cms_auth_siciga");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === "superadmin.siciga" && passwordInput === "password") {
      localStorage.setItem("cms_auth_siciga", "true");
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Username atau Kata sandi salah!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cms_auth_siciga");
    setIsAuthenticated(false);
  };

  // Fetch semua data saat login berhasil / ganti tab
  const fetchAllData = async () => {
    setLoading(true);
    try {
      if (activeTab === "berita") {
        const res = await fetch("/api/berita").then((r) => r.json());
        if (res.success) setBeritaList(res.data);
      } else if (activeTab === "statistik") {
        const res = await fetch("/api/statistik").then((r) => r.json());
        if (res.success) setStatistikList(res.data);
      } else if (activeTab === "identitas") {
        const res = await fetch("/api/identitas").then((r) => r.json());
        if (res.success) setIdentitasList(res.data);
      }
    } catch (err) {
      console.error("Gagal mengambil data CMS dari MySQL:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAllData();
    }
  }, [isAuthenticated, activeTab]);

  const showNotification = (type: "success" | "error", text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: "", text: "" }), 4000);
  };

  // --- HANDLERS BERITA ---
  const handleOpenModal = (berita?: any) => {
    if (berita) {
      setEditingId(berita.id);
      setBeritaForm({
        title: berita.title,
        category: berita.category,
        date: berita.date,
        image: berita.image,
        excerpt: berita.excerpt,
      });
    } else {
      setEditingId(null);
      setBeritaForm({
        title: "",
        category: "Kegiatan Sekolah",
        date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        image: "/fotoBerita/upacar.jpeg",
        excerpt: "",
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
      const res = await fetch("/api/upload", { method: "POST", body: formData }).then((r) => r.json());
      if (res.success) {
        setBeritaForm((prev) => ({ ...prev, image: res.url }));
        showNotification("success", "Foto berhasil diunggah!");
      } else {
        showNotification("error", res.error || "Gagal upload foto.");
      }
    } catch (err) {
      showNotification("error", "Error saat upload foto.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveBerita = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingId ? `/api/berita/${editingId}` : "/api/berita";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(beritaForm),
      }).then((r) => r.json());

      if (res.success) {
        showNotification("success", editingId ? "Berita berhasil diperbarui!" : "Berita baru berhasil ditambahkan!");
        setIsModalOpen(false);
        fetchAllData();
      } else {
        showNotification("error", res.error || "Gagal menyimpan berita.");
      }
    } catch (err) {
      showNotification("error", "Terjadi kendala jaringan saat menyimpan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBerita = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini secara permanen dari MySQL?")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/berita/${id}`, { method: "DELETE" }).then((r) => r.json());
      if (res.success) {
        showNotification("success", "Berita berhasil dihapus!");
        fetchAllData();
      } else {
        showNotification("error", res.error || "Gagal menghapus.");
      }
    } catch {
      showNotification("error", "Error menghapus berita.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS STATISTIK ---
  const handleStatistikChange = (index: number, field: "count" | "label", val: string) => {
    const updated = [...statistikList];
    updated[index][field] = val;
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
        showNotification("success", "Angka statistik sekolah berhasil diupdate di database!");
      } else {
        showNotification("error", res.error || "Gagal menyimpan statistik.");
      }
    } catch {
      showNotification("error", "Gagal menyimpan statistik.");
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLERS IDENTITAS ---
  const handleIdentitasChange = (index: number, val: string) => {
    const updated = [...identitasList];
    updated[index].value = val;
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
        showNotification("success", "Data Identitas & Kontak sekolah berhasil disematkan ke MySQL!");
      } else {
        showNotification("error", res.error || "Gagal menyimpan identitas.");
      }
    } catch {
      showNotification("error", "Gagal menyimpan identitas.");
    } finally {
      setLoading(false);
    }
  };

  // Halaman Login Admin jika belum masuk
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100 text-center animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden">
          {/* Aksen Background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-navy/5 -z-10"></div>
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-white p-2 relative z-10">
            <img src="/logo/logo.png" alt="Logo SD" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-poppins font-bold text-navy mb-2">Login Administrator</h2>
          <p className="text-sm font-roboto text-gray-500 mb-8 px-2">
            Masuk menggunakan kredensial superadmin untuk mengelola konten website SDN 1 Cigalontang.
          </p>
          
          <form onSubmit={handleLogin} className="space-y-5 text-left relative z-10">
            <div>
              <label className="block text-xs font-poppins font-semibold text-gray-700 uppercase tracking-wider mb-2 ml-1">
                Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Masukkan username..."
                required
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-navy focus:ring-4 focus:ring-navy/10 outline-none transition-all text-base font-roboto"
              />
            </div>
            <div>
              <label className="block text-xs font-poppins font-semibold text-gray-700 uppercase tracking-wider mb-2 ml-1">
                Kata Sandi
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan kata sandi..."
                required
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 focus:bg-white focus:border-navy focus:ring-4 focus:ring-navy/10 outline-none transition-all text-base font-roboto"
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 text-red-500 text-sm font-medium py-3 px-4 rounded-xl text-center border border-red-100">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-navy hover:bg-gold text-white hover:text-navy font-poppins font-bold py-4 rounded-2xl shadow-[0_10px_20px_rgba(13,43,94,0.15)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 mt-4"
            >
              <span>Masuk Sistem</span>
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {statusMessage.text && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl text-white font-poppins font-medium flex items-center gap-3 animate-in slide-in-from-bottom duration-300 ${statusMessage.type === "success" ? "bg-emerald-600" : "bg-rose-600"}`}>
          {statusMessage.type === "success" ? <Check size={20} /> : <X size={20} />}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-72 bg-white rounded-3xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 shrink-0 flex flex-col md:sticky md:top-24">
          <div className="pb-5 border-b border-gray-100 mb-5">
            <h2 className="text-xl font-poppins font-bold text-navy">Modul CMS</h2>
           
          </div>
          
          <nav className="flex flex-col space-y-3">
            <button
              onClick={() => setActiveTab("berita")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
                activeTab === "berita"
                  ? "bg-navy text-white shadow-md transform scale-[1.02]"
                  : "bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200"
              }`}
            >
              <Newspaper size={18} className={activeTab === "berita" ? "text-gold" : "text-gray-400"} />
              <span>Berita & Kegiatan</span>
            </button>
            <button
              onClick={() => setActiveTab("statistik")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
                activeTab === "statistik"
                  ? "bg-navy text-white shadow-md transform scale-[1.02]"
                  : "bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200"
              }`}
            >
              <BarChart2 size={18} className={activeTab === "statistik" ? "text-gold" : "text-gray-400"} />
              <span>Statistik Sekolah</span>
            </button>
            <button
              onClick={() => setActiveTab("identitas")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
                activeTab === "identitas"
                  ? "bg-navy text-white shadow-md transform scale-[1.02]"
                  : "bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200"
              }`}
            >
              <Building2 size={18} className={activeTab === "identitas" ? "text-gold" : "text-gray-400"} />
              <span>Identitas & Kontak</span>
            </button>

            <button
              onClick={() => setActiveTab("profil")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
                activeTab === "profil"
                  ? "bg-navy text-white shadow-md transform scale-[1.02]"
                  : "bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200"
              }`}
            >
              <FileText size={18} className={activeTab === "profil" ? "text-gold" : "text-gray-400"} />
              <span>Profil (Tentang Kami)</span>
            </button>

            <button
              onClick={() => setActiveTab("visimisi")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
                activeTab === "visimisi"
                  ? "bg-navy text-white shadow-md transform scale-[1.02]"
                  : "bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200"
              }`}
            >
              <Target size={18} className={activeTab === "visimisi" ? "text-gold" : "text-gray-400"} />
              <span>Visi & Misi</span>
            </button>

            <button
              onClick={() => setActiveTab("pengajar")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
                activeTab === "pengajar"
                  ? "bg-navy text-white shadow-md transform scale-[1.02]"
                  : "bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200"
              }`}
            >
              <Users size={18} className={activeTab === "pengajar" ? "text-gold" : "text-gray-400"} />
              <span>Struktur Tim Pengajar</span>
            </button>

            <button
              onClick={() => setActiveTab("prestasi")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
                activeTab === "prestasi"
                  ? "bg-navy text-white shadow-md transform scale-[1.02]"
                  : "bg-transparent hover:bg-gray-50 text-gray-600 border border-transparent hover:border-gray-200"
              }`}
            >
              <Trophy size={18} className={activeTab === "prestasi" ? "text-gold" : "text-gray-400"} />
              <span>Prestasi Unggulan</span>
            </button>
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col gap-3">
            <button
              onClick={fetchAllData}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-navy font-poppins font-semibold text-sm transition-colors border border-gray-200 disabled:opacity-50"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              <span>Refresh Data</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-poppins font-bold text-sm rounded-xl transition-colors"
            >
              Keluar Admin
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 w-full bg-white rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 min-h-[600px]">
          {/* CONTENT: TAB BERITA */}
          {activeTab === "berita" && (
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

          {loading && beritaList.length === 0 ? (
            <div className="p-12 text-center text-gray-400 font-roboto">Memuat data dari database MySQL...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beritaList.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col justify-between h-full">
                  <div>
                    <div className="aspect-16/10 bg-gray-100 relative overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
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
                      onClick={() => handleDeleteBerita(item.id)}
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
        </div>
      )}

      {/* CONTENT: TAB STATISTIK */}
      {activeTab === "statistik" && (
        <form onSubmit={handleSaveStatistik} className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 max-w-3xl">
          <h3 className="text-xl font-poppins font-bold text-navy mb-2">Manajemen Angka Statistik Sekolah</h3>
          <p className="text-sm font-roboto text-gray-500 mb-6">
            Ubah jumlah siswa, guru, atau ruang kelas. Perubahan akan langsung disinkronkan ke halaman beranda!
          </p>
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
                    className="w-full font-poppins font-bold text-navy px-4 py-2.5 rounded-xl border border-gray-200 bg-white"
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
                    className="w-full font-poppins font-bold text-lg text-blue-600 px-4 py-2.5 rounded-xl border border-gray-200 bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading || statistikList.length === 0}
            className="mt-8 bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300"
          >
            {loading ? "Menyimpan ke MySQL..." : "Simpan Perubahan Statistik"}
          </button>
        </form>
      )}

      {/* CONTENT: TAB IDENTITAS */}
      {activeTab === "identitas" && (
        <form onSubmit={handleSaveIdentitas} className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 max-w-3xl">
          <h3 className="text-xl font-poppins font-bold text-navy mb-2">Manajemen Profil & Kontak Sekolah</h3>
          <p className="text-sm font-roboto text-gray-500 mb-6">
            Atur informasi identitas seperti Akreditasi, NPSN, Telepon, dan Email resmi yang tampil di Footer & Tentang Kami.
          </p>
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
                  className="w-full font-poppins font-semibold text-navy text-base px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-navy"
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading || identitasList.length === 0}
            className="mt-8 bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300"
          >
            {loading ? "Menyimpan ke MySQL..." : "Simpan Perubahan Identitas"}
          </button>
        </form>
      )}

      {/* MODAL FORM TAMBAH / EDIT BERITA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/70 backdrop-blur-xs">
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

            <form onSubmit={handleSaveBerita} className="space-y-5">
              <div>
                <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">
                  Judul Berita
                </label>
                <input
                  type="text"
                  required
                  value={beritaForm.title}
                  onChange={(e) => setBeritaForm({ ...beritaForm, title: e.target.value })}
                  placeholder="Contoh: Juara Lomba Calistung Tingkat Kabupaten..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-roboto text-base focus:border-navy outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">
                    Kategori
                  </label>
                  <select
                    value={beritaForm.category}
                    onChange={(e) => setBeritaForm({ ...beritaForm, category: e.target.value })}
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
                  <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">
                    Tanggal Tampilkan
                  </label>
                  <input
                    type="text"
                    required
                    value={beritaForm.date}
                    onChange={(e) => setBeritaForm({ ...beritaForm, date: e.target.value })}
                    placeholder="Contoh: 26 Juli 2026"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 font-roboto text-base focus:border-navy outline-none"
                  />
                </div>
              </div>

              {/* Upload Foto */}
              <div>
                <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">
                  Foto Dokumentasi
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <input
                    type="text"
                    value={beritaForm.image}
                    onChange={(e) => setBeritaForm({ ...beritaForm, image: e.target.value })}
                    placeholder="/fotoBerita/solatduha.jpeg atau /uploads/..."
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 font-roboto text-sm text-gray-600 outline-none"
                  />
                  <label className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-4 py-3 rounded-xl font-poppins font-semibold text-xs cursor-pointer flex items-center justify-center gap-2 shrink-0 transition-colors">
                    <Upload size={16} />
                    <span>{uploading ? "Mengunggah..." : "Upload Komputer"}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} className="hidden" />
                  </label>
                </div>
                {beritaForm.image && (
                  <div className="mt-3 h-32 w-full sm:w-48 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={beritaForm.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-poppins font-bold text-gray-700 uppercase mb-2">
                  Deskripsi / Ringkasan Berita
                </label>
                <textarea
                  required
                  rows={4}
                  value={beritaForm.excerpt}
                  onChange={(e) => setBeritaForm({ ...beritaForm, excerpt: e.target.value })}
                  placeholder="Tuliskan isi ringkasan berita di sini..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 font-roboto text-base focus:border-navy outline-none leading-relaxed"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-poppins font-semibold rounded-full text-sm"
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
      
      {activeTab === "profil" && <TabProfil />}
      {activeTab === "visimisi" && <TabVisiMisi />}
      {activeTab === "pengajar" && <TabPengajar />}
      {activeTab === "prestasi" && <TabPrestasi />}
      
      {/* Penutup Main Content Wrapper */}
      </div>
      
      {/* Penutup Flex Sidebar Container */}
      </div>

    </div>
  );
}
