"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Newspaper, BarChart2, Building2, Check, X, ArrowRight, Users, FileText, Target, Trophy, Image as ImageIcon } from "lucide-react";
import Swal from "sweetalert2";
import TabProfil from "@/components/admin/TabProfil";
import TabVisiMisi from "@/components/admin/TabVisiMisi";
import TabPengajar from "@/components/admin/TabPengajar";
import TabPrestasi from "@/components/admin/TabPrestasi";
import TabBerita from "@/components/admin/TabBerita";
import TabStatistik from "@/components/admin/TabStatistik";
import TabIdentitas from "@/components/admin/TabIdentitas";
import TabGaleri from "@/components/admin/TabGaleri";

export default function AdminPage() {
  const getTabTitle = (tab: string) => {
    switch (tab) {
      case "berita": return "Manajemen Berita & Kegiatan";
      case "statistik": return "Manajemen Statistik Sekolah";
      case "identitas": return "Manajemen Identitas & Kontak";
      case "profil": return "Manajemen Profil (Tentang Kami)";
      case "visimisi": return "Manajemen Visi & Misi";
      case "pengajar": return "Manajemen Struktur Tim Pengajar";
      case "prestasi": return "Manajemen Prestasi Unggulan";
      case "galeri": return "Manajemen Galeri Kegiatan";
      default: return "Dashboard Administrator";
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [activeTab, setActiveTab] = useState<"berita" | "statistik" | "identitas" | "profil" | "visimisi" | "pengajar" | "prestasi" | "galeri">("berita");

  // Durasi sesi login: 12 jam (dalam milidetik)
  const SESSION_DURATION = 12 * 60 * 60 * 1000;

  // Update document title dynamically
  useEffect(() => {
    document.title = `${getTabTitle(activeTab)} | Admin CMS SDN 1 Cigalontang`;
  }, [activeTab]);

  // Cek otorisasi dengan validasi waktu kedaluwarsa sesi (Session Expiry)
  useEffect(() => {
    const savedAuth = localStorage.getItem("cms_auth_siciga");
    if (savedAuth) {
      try {
        const data = JSON.parse(savedAuth);
        if (data.auth && new Date().getTime() < data.expiry) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("cms_auth_siciga");
        }
      } catch (err) {
        localStorage.removeItem("cms_auth_siciga");
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim() || !passwordInput.trim()) {
      Swal.fire({ icon: 'warning', title: 'Perhatian', text: 'Username dan kata sandi tidak boleh kosong!' });
      return;
    }

    if (usernameInput === "superadmin.siciga" && passwordInput === "password") {
      const expiry = new Date().getTime() + SESSION_DURATION;
      localStorage.setItem("cms_auth_siciga", JSON.stringify({ auth: true, expiry }));
      Swal.fire({ icon: 'success', title: 'Login Berhasil', text: 'Selamat datang di panel Admin!', timer: 1500, showConfirmButton: false });
      setIsAuthenticated(true);
    } else {
      Swal.fire({ icon: 'error', title: 'Login Gagal', text: 'Username atau kata sandi salah!' });
      setUsernameInput("");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cms_auth_siciga");
    setIsAuthenticated(false);
    Swal.fire({ icon: 'success', title: 'Berhasil Keluar', text: 'Sesi Admin Anda telah diakhiri.', timer: 1500, showConfirmButton: false });
  };

  // Halaman Login Admin jika belum masuk
  if (!isAuthenticated) {
    return (
      <div 
        className="fixed inset-0 w-full h-full flex items-center justify-center p-4 z-50 overflow-hidden"
        style={{
          backgroundImage: "url('/img/hero3.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay Gelap */}
        <div className="absolute inset-0 bg-navy/60 backdrop-blur-[2px]"></div>

        <div className="bg-white/20 backdrop-blur-xl rounded-4xl p-8 sm:p-10 max-w-md w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/30 text-center animate-in fade-in zoom-in-95 duration-500 relative z-10 overflow-hidden">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-white/30 p-2 relative z-10">
            <Image src="/logo/logo.png" alt="Logo SD" width={96} height={96} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-poppins font-bold text-white mb-8 shadow-sm drop-shadow-md">Login Administrator</h2>
          
          <form onSubmit={handleLogin} className="space-y-5 text-left relative z-10">
            <div>
              <label className="block text-xs font-poppins font-semibold text-white uppercase tracking-wider mb-2 ml-1 drop-shadow-md">
                Username
              </label>
              <input
                type="text"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Masukkan username..."
                className="w-full px-5 py-3.5 rounded-2xl border border-white/30 bg-white/10 focus:bg-white/20 focus:border-white focus:ring-4 focus:ring-white/20 outline-none transition-all text-base font-roboto text-white placeholder-gray-300 shadow-inner"
              />
            </div>
            <div>
              <label className="block text-xs font-poppins font-semibold text-white uppercase tracking-wider mb-2 ml-1 drop-shadow-md">
                Password
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full px-5 py-3.5 rounded-2xl border border-white/30 bg-white/10 focus:bg-white/20 focus:border-white focus:ring-4 focus:ring-white/20 outline-none transition-all text-base font-roboto text-white placeholder-gray-300 shadow-inner"
              />
            </div>
            
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
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-navy p-5 sm:p-6 shadow-xl shrink-0 flex flex-col md:sticky md:top-0 md:h-screen overflow-y-auto z-50">
        <div className="pb-5 border-b border-white/10 mb-5 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
          <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0">
             <Image src="/logo/logo.png" alt="Logo" width={40} height={40} className="w-full h-full object-contain" />
          </div>
          <div className="hidden md:block">
            <h2 className="text-xl font-poppins font-bold text-white tracking-wide leading-tight">CMS</h2>
            <p className="text-gold text-[10px] font-roboto">SDN 1 Cigalontang</p>
          </div>
        </div>
        
        <nav className="flex flex-col space-y-3">
          <button
            onClick={() => setActiveTab("berita")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
              activeTab === "berita"
                ? "bg-gold text-navy shadow-md transform scale-[1.02]"
                : "bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20"
            }`}
          >
            <Newspaper size={18} className={activeTab === "berita" ? "text-navy" : "text-gray-400"} />
            <span>Berita & Kegiatan</span>
          </button>
          
          <button
            onClick={() => setActiveTab("statistik")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
              activeTab === "statistik"
                ? "bg-gold text-navy shadow-md transform scale-[1.02]"
                : "bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20"
            }`}
          >
            <BarChart2 size={18} className={activeTab === "statistik" ? "text-navy" : "text-gray-400"} />
            <span>Statistik Sekolah</span>
          </button>
          
          <button
            onClick={() => setActiveTab("identitas")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
              activeTab === "identitas"
                ? "bg-gold text-navy shadow-md transform scale-[1.02]"
                : "bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20"
            }`}
          >
            <Building2 size={18} className={activeTab === "identitas" ? "text-navy" : "text-gray-400"} />
            <span>Identitas & Kontak</span>
          </button>

          <button
            onClick={() => setActiveTab("profil")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
              activeTab === "profil"
                ? "bg-gold text-navy shadow-md transform scale-[1.02]"
                : "bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20"
            }`}
          >
            <FileText size={18} className={activeTab === "profil" ? "text-navy" : "text-gray-400"} />
            <span>Profil (Tentang Kami)</span>
          </button>

          <button
            onClick={() => setActiveTab("visimisi")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
              activeTab === "visimisi"
                ? "bg-gold text-navy shadow-md transform scale-[1.02]"
                : "bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20"
            }`}
          >
            <Target size={18} className={activeTab === "visimisi" ? "text-navy" : "text-gray-400"} />
            <span>Visi & Misi</span>
          </button>

          <button
            onClick={() => setActiveTab("pengajar")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
              activeTab === "pengajar"
                ? "bg-gold text-navy shadow-md transform scale-[1.02]"
                : "bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20"
            }`}
          >
            <Users size={18} className={activeTab === "pengajar" ? "text-navy" : "text-gray-400"} />
            <span>Struktur Tim Pengajar</span>
          </button>

          <button
            onClick={() => setActiveTab("prestasi")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
              activeTab === "prestasi"
                ? "bg-gold text-navy shadow-md transform scale-[1.02]"
                : "bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20"
            }`}
          >
            <Trophy size={18} className={activeTab === "prestasi" ? "text-navy" : "text-gray-400"} />
            <span>Prestasi Unggulan</span>
          </button>

          <button
            onClick={() => setActiveTab("galeri")}
            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 ${
              activeTab === "galeri"
                ? "bg-gold text-navy shadow-md transform scale-[1.02]"
                : "bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20"
            }`}
          >
            <ImageIcon size={18} className={activeTab === "galeri" ? "text-navy" : "text-gray-400"} />
            <span>Galeri Kegiatan</span>
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-poppins font-bold text-sm rounded-xl transition-colors border border-rose-500/20"
          >
            Keluar Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 w-full flex flex-col min-h-screen">
        {/* Topbar Main Content */}
        <div className="bg-white px-4 md:px-8 h-16 flex items-center justify-between border-b border-gray-100 shadow-sm sticky top-0 z-40 shrink-0">
           <h2 className="text-lg font-poppins font-bold text-navy hidden sm:block">Dashboard Administrator</h2>
           <div className="flex-1 sm:hidden"></div>
           <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-navy hover:bg-gold hover:text-navy text-white text-xs sm:text-sm font-poppins font-medium px-4 py-2 rounded-full transition-colors shadow-sm flex items-center gap-2"
            >
              🚀 <span className="hidden sm:inline">Lihat Website</span>
            </a>
        </div>
        
        <div className="p-4 md:p-8 lg:p-10 flex-1 relative z-0">
          {activeTab === "berita" && <TabBerita />}
          {activeTab === "statistik" && <TabStatistik />}
          {activeTab === "identitas" && <TabIdentitas />}
          {activeTab === "profil" && <TabProfil />}
          {activeTab === "visimisi" && <TabVisiMisi />}
          {activeTab === "pengajar" && <TabPengajar />}
          {activeTab === "prestasi" && <TabPrestasi />}
          {activeTab === "galeri" && <TabGaleri />}
        </div>
      </div>
    </div>
  );
}
