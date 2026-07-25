"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-navy text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="shrink-0 flex items-center gap-3">
            <img src="/logo/logo.png" alt="Logo SDN 1 Cigalontang" className="h-10 w-auto" />
            <span className="font-poppins font-bold text-lg sm:text-xl text-gold">
              SDN 1 Cigalontang
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#beranda" className="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Beranda</a>
            <a href="#tentang" className="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Tentang Kami</a>
            <a href="#visimisi" className="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Visi & Misi</a>
            <a href="#prestasi" className="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Prestasi</a>
            <a href="#berita" className="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Berita</a>
            <a href="#galeri" className="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Galeri</a>
            <a href="#tim" className="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Tim Pengajar</a>
            <a href="#lokasi" className="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Lokasi</a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gold">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy/98 border-t border-white/10 py-4 px-6 space-y-3 font-inter">
          <a href="#beranda" onClick={() => setIsOpen(false)} className="block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Beranda</a>
          <a href="#tentang" onClick={() => setIsOpen(false)} className="block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Tentang Kami</a>
          <a href="#visimisi" onClick={() => setIsOpen(false)} className="block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Visi & Misi</a>
          <a href="#prestasi" onClick={() => setIsOpen(false)} className="block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Prestasi</a>
          <a href="#berita" onClick={() => setIsOpen(false)} className="block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Berita & Kegiatan</a>
          <a href="#galeri" onClick={() => setIsOpen(false)} className="block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Galeri</a>
          <a href="#tim" onClick={() => setIsOpen(false)} className="block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Tim Pengajar</a>
          <a href="#lokasi" onClick={() => setIsOpen(false)} className="block w-full text-base font-medium py-2 hover:text-gold transition-colors">Lokasi</a>
        </div>
      )}
    </nav>
  );
}
