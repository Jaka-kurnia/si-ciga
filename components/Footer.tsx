import { MapPin, Phone, Mail,  } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Info */}
          <div>
            <h3 className="text-2xl font-poppins font-bold text-gold mb-6">SDN 1 Cigalontang</h3>
            <p className="font-roboto text-gray-300 leading-relaxed mb-6">
              Mencetak generasi unggul yang beriman, cerdas, terampil, dan berwawasan lingkungan menuju masa depan yang gemilang.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-montserrat font-bold mb-6 text-white">Tautan Cepat</h4>
            <ul className="space-y-3 font-roboto text-gray-300">
              <li><a href="#beranda" className="hover:text-gold transition-colors">Beranda</a></li>
              <li><a href="#tentang" className="hover:text-gold transition-colors">Tentang Kami</a></li>
              <li><a href="#visimisi" className="hover:text-gold transition-colors">Visi & Misi</a></li>
              <li><a href="#prestasi" className="hover:text-gold transition-colors">Prestasi</a></li>
              <li><a href="#berita" className="hover:text-gold transition-colors">Berita</a></li>
              <li><a href="#galeri" className="hover:text-gold transition-colors">Galeri</a></li>
              <li><a href="#tim" className="hover:text-gold transition-colors">Tim Pengajar</a></li>
              <li><a href="#lokasi" className="hover:text-gold transition-colors">Lokasi</a></li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-xl font-montserrat font-bold mb-6 text-white">Hubungi Kami</h4>
            <ul className="space-y-4 font-roboto text-gray-300">
              <li className="flex items-start">
                <MapPin size={20} className="text-gold mr-3 mt-1 shrink-0" />
                <a href="https://www.google.com/maps?q=-7.327,108.0149" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors underline decoration-dotted underline-offset-4">
                  Kp. Panyandungan, Kec. Cigalontang, Kab. Tasikmalaya, Prov. Jawa Barat
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-gold mr-3 shrink-0" />
                <span>085322363039</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-gold mr-3 shrink-0" />
                <span>iwakartiwa52@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center text-gray-400 font-roboto text-sm">
          <p>&copy; {new Date().getFullYear()} SD Negeri 1 Cigalontang. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
