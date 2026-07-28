"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Trophy, Medal, Award, X } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Prestasi() {
  const [selectedPrestasi, setSelectedPrestasi] = useState<number | null>(null);
  const [prestasi, setPrestasi] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/prestasi")
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setPrestasi(result.data);
        }
      })
      .catch(err => console.error("Error fetching prestasi", err));
  }, []);

  const handleClose = () => setSelectedPrestasi(null);

  return (
    <section id="prestasi" className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-poppins font-bold text-navy">Prestasi Unggulan</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1">
          {prestasi.map((item, index) => (
              <div 
                key={index} 
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className={`bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-500 border-2 ${item.isSpecial ? 'border-gold/50' : 'border-gray-100'} group flex flex-col md:flex-row overflow-hidden relative cursor-pointer`}
                onClick={() => setSelectedPrestasi(index)}
              >
                {/* Bagian Foto Kiri */}
                <div className="md:w-5/12 h-64 md:h-auto min-h-75 relative overflow-hidden bg-gray-100 shrink-0">
                  {item.image ? (
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                      <Trophy size={64} className="text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-navy/80 via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute top-4 left-4 bg-gold text-navy font-bold px-4 py-1.5 rounded-full text-xs uppercase shadow-md flex items-center z-10">
                    <Trophy size={14} className="mr-1.5" /> 
                    Prestasi
                  </div>
                </div>

                {/* Bagian Teks Kanan */}
                <div className="md:w-3/5 p-6 sm:p-8 md:p-10 flex flex-col justify-center text-left">
                  <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-roboto text-gray-500 mb-8 text-base sm:text-lg">
                    {item.category}
                  </p>
                  
                  <div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedPrestasi(index); }}
                      className="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-navy text-white font-medium rounded-full hover:bg-gold transition-colors text-sm sm:text-base shadow-[0_4px_14px_0_rgba(13,43,94,0.39)] transform group-hover:-translate-y-1"
                    >
                      Baca Ucapan Selengkapnya
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {prestasi.length === 0 && (
              <div className="text-center py-10 bg-white rounded-3xl border border-gray-100">
                <p className="text-gray-500 font-roboto">Belum ada data prestasi.</p>
              </div>
            )}
          </div>
      </div>

      {/* Modal Detail Prestasi */}
      {selectedPrestasi !== null && prestasi[selectedPrestasi] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-navy/80 backdrop-blur-md transition-opacity" onClick={handleClose}></div>
          <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
            
            {/* Tombol Close */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-navy transition-colors bg-black/20 hover:bg-white backdrop-blur-md p-2.5 rounded-full z-20 shadow-lg"
            >
              <X size={24} />
            </button>
            
            {/* Cover Image / Banner */}
            <div className="relative h-64 sm:h-80 w-full shrink-0 bg-navy">
              {prestasi[selectedPrestasi].image ? (
                <Image 
                  src={prestasi[selectedPrestasi].image} 
                  alt="Foto Prestasi" 
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                   <Trophy size={80} className="text-white/10" />
                </div>
              )}
              {/* Gradient Masking */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full flex justify-center translate-y-1/2 z-10">
                 <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center">
                   <Trophy size={40} className="text-gold sm:w-12 sm:h-12" />
                 </div>
              </div>
            </div>

            {/* Konten Scrollable */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-10 pt-14 sm:pt-16 text-center relative z-10 bg-white">
              <h3 className="text-2xl sm:text-4xl font-poppins font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-navy to-gold mb-3 uppercase tracking-wider drop-shadow-sm">
                SELAMAT & SUKSES
              </h3>
              
              <h4 className="text-lg sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 font-poppins max-w-3xl mx-auto">
                {prestasi[selectedPrestasi].title}
              </h4>
              
              <p className="font-roboto text-gray-600 leading-relaxed text-base sm:text-lg mb-8 max-w-2xl mx-auto bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-inner">
                {prestasi[selectedPrestasi].message}
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 max-w-3xl mx-auto">
                {prestasi[selectedPrestasi].students?.split(",").map((name: string, idx: number) => (
                  <div key={idx} className="bg-white border-2 border-gold/30 px-5 py-2.5 sm:py-3 rounded-2xl flex items-center shadow-sm hover:shadow-lg hover:border-gold hover:-translate-y-1 transition-all duration-300">
                    <span className="text-gold mr-2 text-xl drop-shadow-sm">✨</span>
                    <span className="font-poppins font-bold text-navy text-sm sm:text-base">{name.trim()}</span>
                  </div>
                ))}
              </div>
              
              <div className="relative max-w-2xl mx-auto mb-10">
                <span className="absolute -top-6 -left-4 sm:-left-8 text-6xl text-gold/20 font-serif select-none">"</span>
                <p className="font-roboto text-gray-700 leading-relaxed italic text-lg sm:text-xl relative z-10 px-4">
                  {prestasi[selectedPrestasi].quote}
                </p>
                <span className="absolute -bottom-10 -right-4 sm:-right-8 text-6xl text-gold/20 font-serif select-none">"</span>
              </div>
              
              <div className="w-24 h-1.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto mb-8 rounded-full"></div>
              
              <p className="font-roboto text-gray-400 leading-relaxed max-w-2xl mx-auto text-xs sm:text-sm tracking-wide">
                {prestasi[selectedPrestasi].footer}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
