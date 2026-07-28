"use client";
import { useState, useEffect } from "react";
import { Target, Lightbulb } from "lucide-react";

export default function VisiMisi() {
  const [visi, setVisi] = useState("Memuat Visi...");
  const [misiList, setMisiList] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/visimisi")
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data && result.data.length > 0) {
          const v = result.data.find((d: any) => d.type === "visi");
          if (v) setVisi(v.content);
          
          const m = result.data.filter((d: any) => d.type === "misi").map((d: any) => d.content);
          if (m.length > 0) setMisiList(m);
        }
      })
      .catch(err => console.error("Gagal mengambil data Visi Misi", err));
  }, []);

  return (
    <section id="visimisi" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16" data-aos="fade-up">
        <h2 className="text-3xl font-poppins font-bold text-navy">Visi & Misi</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        {/* Card Visi */}
        <div className="flex-1 bg-navy text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group" data-aos="fade-right">
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Target size={32} className="text-gold" />
          </div>
          <h3 className="text-2xl font-montserrat font-bold mb-4 text-gold">Visi</h3>
          <p className="font-roboto leading-relaxed text-gray-200 whitespace-pre-wrap">
            {visi}
          </p>
        </div>

        {/* Card Misi */}
        <div className="flex-1 bg-white border border-gray-200 text-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-gold/50 transition-all duration-300 transform hover:-translate-y-2 group" data-aos="fade-left">
          <div className="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Lightbulb size={32} className="text-navy" />
          </div>
          <h3 className="text-2xl font-montserrat font-bold text-navy mb-4">Misi</h3>
          <ul className="font-roboto leading-relaxed text-gray-600 list-none space-y-3">
            {misiList.map((m, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-gold mr-2 mt-1">•</span>
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
