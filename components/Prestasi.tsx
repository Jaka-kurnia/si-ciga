"use client";
import { useState, useEffect } from "react";
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
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
          <div className="relative bg-white rounded-2xl sm:rounded-3xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl p-5 sm:p-8 md:p-12 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={handleClose}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-400 hover:text-navy transition-colors bg-gray-100 hover:bg-gray-200 p-2 rounded-full z-10"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            
            <div className="text-center mt-2 sm:mt-4">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gold/10 text-gold mb-4 sm:mb-6 shadow-sm border border-gold/20">
                <Trophy size={36} className="sm:w-12 sm:h-12" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-navy mb-4 sm:mb-6">
                SELAMAT & SUKSES
              </h3>
              
              <p className="font-roboto text-gray-700 leading-relaxed text-sm sm:text-lg mb-6 sm:mb-8 sm:px-8">
                {prestasi[selectedPrestasi].message}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-2xl mx-auto">
                {prestasi[selectedPrestasi].students?.split(",").map((name: string, idx: number) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl flex items-center shadow-sm text-xs sm:text-base">
                    <span className="text-gold mr-1.5 sm:mr-2 text-base sm:text-xl">✨</span>
                    <span className="font-poppins font-bold text-navy">{name.trim()}</span>
                  </div>
                ))}
              </div>
              
              <p className="font-roboto text-gray-700 leading-relaxed italic mb-8 sm:mb-10 text-sm sm:text-lg px-2">
                "{prestasi[selectedPrestasi].quote}"
              </p>
              
              <div className="w-16 sm:w-24 h-1 bg-gray-200 mx-auto mb-8 sm:mb-10 rounded-full"></div>
              
              <p className="font-roboto text-gray-500 leading-relaxed max-w-2xl mx-auto text-xs sm:text-base">
                {prestasi[selectedPrestasi].footer}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
