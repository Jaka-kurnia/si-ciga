import { Metadata } from "next";
import Link from "lucide-react";

export const metadata: Metadata = {
  title: "Admin CMS Dashboard | SDN 1 Cigalontang",
  description: "Panel pengelola konten website SDN 1 Cigalontang (Berita, Statistik, Identitas)",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f1f5f9] font-inter text-slate-800 flex flex-col">
      {/* Top Navbar untuk Admin */}
      <header className="bg-navy text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center shadow-md overflow-hidden">
              <img src="/logo/logo.png" alt="Logo SDN 1 Cigalontang" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-base sm:text-lg leading-tight text-white">
                CMS Dashboard
              </h1>
              <p className="text-gold text-xs font-roboto">SDN 1 Cigalontang</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-gold hover:text-navy text-white text-xs sm:text-sm font-poppins font-medium px-4 py-2 rounded-full transition-colors border border-white/10"
            >
              🚀 Lihat Website
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
