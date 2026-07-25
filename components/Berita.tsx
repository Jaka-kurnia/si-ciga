"use client";
import { useState, useEffect } from "react";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

export default function Berita() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  const [beritaList, setBeritaList] = useState([
    {
      title: "Pembiasaan Shalat Dhuha & Doa Bersama Pagi",
      date: "24 Juli 2026",
      category: "Kegiatan Religius",
      image: "/fotoBerita/solatduha.jpeg",
      excerpt: "Kegiatan rutin setiap pagi sebelum pembelajaran dimulai guna menanamkan nilai-nilai karakter religius dan akhlak mulia kepada para siswa."
    },
    {
      title: "Upacara Bendera Hari Senin di Lapangan Sekolah",
      date: "21 Juli 2026",
      category: "Kedisiplinan",
      image: "/fotoBerita/upacar.jpeg",
      excerpt: "Membentuk jiwa kepemimpinan, kedisiplinan, serta rasa cinta tanah air (Nasionalisme) seluruh warga sekolah di lapangan SDN 1 Cigalontang."
    },
    {
      title: "Kegiatan & Koordinasi Dewan Guru",
      date: "18 Juli 2026",
      category: "Akademik & Staf",
      image: "/fotoBerita/guru.jpeg",
      excerpt: "Upaya peningkatan kompetensi pedagogik serta profesionalisme pendidik guna memberikan layanan pembelajaran yang aman, nyaman, dan bermakna."
    },
    {
      title: "Rapat Koordinasi Sekolah & Wali Murid",
      date: "15 Juli 2026",
      category: "Komite Sekolah",
      image: "/fotoBerita/rapat.jpeg",
      excerpt: "Membangun sinergi kolaboratif yang solid antara pihak sekolah, dewan guru, dan orang tua/wali murid untuk mendukung kemajuan siswa."
    },
    {
      title: "Semangat Kebersamaan Saat Upacara Pagi",
      date: "10 Juli 2026",
      category: "Kedisiplinan",
      image: "/fotoBerita/upacara1.jpeg",
      excerpt: "Antusiasme dan ketertiban seluruh peserta didik dalam mengikuti rangkaian khidmat upacara bendera dan penyampaian amanat pembina."
    },
    {
      title: "Pembentukan Karakter Pelajar Pancasila",
      date: "5 Juli 2026",
      category: "Kegiatan Siswa",
      image: "/fotoBerita/upacara2.jpeg",
      excerpt: "Implementasi nyata profil pelajar Pancasila melalui kegiatan kebersamaan dan kedisiplinan di lingkungan sekolah SDN 1 Cigalontang."
    }
  ]);

  // Ambil data dinamis dari database MySQL
  useEffect(() => {
    fetch("/api/berita")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data && result.data.length > 0) {
          setBeritaList(result.data);
        }
      })
      .catch((err) => console.error("Error fetching berita from MySQL:", err));
  }, []);

  // Sesuaikan jumlah card berdasarkan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize(); // Inisialisasi awal
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, beritaList.length - cardsToShow);

  // Koreksi index jika ukuran layar berubah
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsToShow, maxIndex, currentIndex]);

  // Geser otomatis (Auto-play Carousel)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500); // Bergeser setiap 4.5 detik
    return () => clearInterval(timer);
  }, [maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section id="berita" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold text-navy">Berita & Kegiatan Sekolah</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        <p className="font-roboto text-gray-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
          Ikuti perkembangan informasi dan potret dokumentasi kegiatan terbaru di lingkungan SDN 1 Cigalontang
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Tombol Kontrol Kiri */}
        <button 
          onClick={handlePrev}
          aria-label="Berita Sebelumnya"
          className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gold text-navy hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-hidden"
        >
          <ArrowLeft size={22} />
        </button>

        {/* Tombol Kontrol Kanan */}
        <button 
          onClick={handleNext}
          aria-label="Berita Selanjutnya"
          className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gold text-navy hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-hidden"
        >
          <ArrowRight size={22} />
        </button>

        {/* Carousel Viewport */}
        <div className="overflow-hidden px-1 py-4">
          <div 
            className="flex transition-transform duration-700 ease-in-out -mx-3"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` 
            }}
          >
            {beritaList.map((item, index) => (
              <div 
                key={index} 
                className="shrink-0 px-3 transition-all duration-300"
                style={{ width: `${100 / cardsToShow}%` }}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100 flex flex-col h-full group">
                  <div className="relative aspect-16/10 sm:aspect-4/3 overflow-hidden bg-gray-100">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 bg-navy/90 text-gold font-poppins text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-md tracking-wider">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className="flex items-center text-gray-500 text-xs font-roboto mb-3 font-medium">
                      <Calendar size={15} className="mr-2 text-gold shrink-0" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-lg font-poppins font-bold text-navy mb-3 group-hover:text-gold transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="font-roboto text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                      {item.excerpt}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-navy font-poppins font-semibold text-xs sm:text-sm group-hover:text-gold transition-colors">
                      <span>SDN 1 Cigalontang</span>
                      <span className="text-gold text-base font-bold transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicators */}
        <div className="flex justify-center items-center space-x-2.5 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index 
                  ? "w-9 h-2.5 bg-gold shadow-sm" 
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-navy/40"
              }`}
              aria-label={`Slide ke ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
