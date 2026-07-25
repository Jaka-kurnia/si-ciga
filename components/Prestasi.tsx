"use client";
import { useState } from "react";
import { Trophy, Medal, Award, X } from "lucide-react";
import SectionHeader from "./SectionHeader";

export default function Prestasi() {
  const [selectedPrestasi, setSelectedPrestasi] = useState<number | null>(null);

  const prestasi = [
    {
      icon: <Trophy size={40} className="text-gold" />,
      title: "Juara 1 Bola Voli Putra (O2SN)",
      desc: "Tingkat Kecamatan Cigalontang Tahun 2026",
      isSpecial: true,
      details: {
        students: [
          "AYANDI",
          "DAFA ARSADIL PRATAMA",
          "RAFI FAUZAN",
          "RAIHAN",
          "REHAN HERDIAN"
        ],
        message: "Keluarga besar SDN 1 Cigalontang mengucapkan selamat dan sukses kepada Ananda yang telah meraih Juara 1 Bola Voli Putra pada Olimpiade Olahraga Siswa Nasional (O2SN) Tingkat Kecamatan Cigalontang Tahun 2026.",
        quote: "Semoga prestasi ini menjadi motivasi untuk terus berkembang, berprestasi, dan meraih keberhasilan yang lebih tinggi di masa mendatang.",
        footer: "SDN 1 Cigalontang terus berkomitmen dalam membentuk murid yang berakhlak mulia, mandiri, kreatif, dan berjiwa Pancasila melalui pembelajaran yang aman, nyaman, dan menyenangkan."
      }
    },
    {
      icon: <Medal size={40} className="text-gold" />,
      title: "Juara 2 Olimpiade Sains",
      desc: "Tingkat Provinsi Tahun 2024",
      isSpecial: false,
      details: null
    },
    {
      icon: <Award size={40} className="text-gold" />,
      title: "Sekolah Adiwiyata",
      desc: "Penghargaan Lingkungan Hidup 2022",
      isSpecial: false,
      details: null
    },
  ];

  const handleClose = () => setSelectedPrestasi(null);

  return (
    <section id="prestasi" className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold text-navy">Prestasi Unggulan</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {prestasi.map((item, index) => (
              <div key={index} className={`bg-white p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 border border-gray-50 border-t-4 ${item.isSpecial ? 'border-t-gold' : 'border-t-navy'} group text-center flex flex-col`}>
                <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-poppins font-bold text-navy mb-2">{item.title}</h3>
                <p className="font-roboto text-gray-500 mb-6 grow">{item.desc}</p>
                
                {item.details ? (
                  <button 
                    onClick={() => setSelectedPrestasi(index)}
                    className="mt-auto mx-auto px-6 py-2 bg-navy text-white font-medium rounded-full hover:bg-gold transition-colors text-sm shadow-md"
                  >
                    Lihat Detail
                  </button>
                ) : (
                  <div className="mt-auto mx-auto px-6 py-2 bg-gray-100 text-gray-400 font-medium rounded-full text-sm">
                    Detail Menyusul
                  </div>
                )}
              </div>
            ))}
          </div>
      </div>

      {/* Modal Detail Prestasi */}
      {selectedPrestasi !== null && prestasi[selectedPrestasi].details && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">
          <div className="absolute inset-0 bg-red/60 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
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
                {prestasi[selectedPrestasi].details!.message}
              </p>
              
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-2xl mx-auto">
                {prestasi[selectedPrestasi].details!.students.map((name, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl flex items-center shadow-sm text-xs sm:text-base">
                    <span className="text-gold mr-1.5 sm:mr-2 text-base sm:text-xl">✨</span>
                    <span className="font-poppins font-bold text-navy">{name}</span>
                  </div>
                ))}
              </div>
              
              <p className="font-roboto text-gray-700 leading-relaxed italic mb-8 sm:mb-10 text-sm sm:text-lg px-2">
                "{prestasi[selectedPrestasi].details!.quote}"
              </p>
              
              <div className="w-16 sm:w-24 h-1 bg-gray-200 mx-auto mb-8 sm:mb-10 rounded-full"></div>
              
              <p className="font-roboto text-gray-500 leading-relaxed max-w-2xl mx-auto text-xs sm:text-base">
                {prestasi[selectedPrestasi].details!.footer}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
