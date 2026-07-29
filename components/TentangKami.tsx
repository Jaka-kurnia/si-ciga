"use client";
import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { Award, Building2, Hash, BookOpen, Phone, Mail } from "lucide-react";

export default function TentangKami() {
  const defaultIdentity = [
    { label: "Akreditasi", value: "B", icon: <Award size={18} /> },
    { label: "Status Sekolah", value: "Negeri", icon: <Building2 size={18} /> },
    { label: "NPSN", value: "20262428", icon: <Hash size={18} /> },
    { label: "Bentuk Pendidikan", value: "SD", icon: <BookOpen size={18} /> },
    { label: "Telepon", value: "085322363039", icon: <Phone size={18} /> },
    { label: "Email", value: "iwakartiwa52@gmail.com", icon: <Mail size={18} /> },
  ];

  const [identityData, setIdentityData] = useState(defaultIdentity);
  const [profilData, setProfilData] = useState({
    paragraf1: "Memuat profil...",
    paragraf2: "",
    image: "/fotoSekolah/foto2.jpg"
  });

  useEffect(() => {
    fetch("/api/identitas")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data && result.data.length > 0) {
          const iconMap: Record<string, ReactNode> = {
            "Akreditasi": <Award size={18} />,
            "Status Sekolah": <Building2 size={18} />,
            "NPSN": <Hash size={18} />,
            "Bentuk Pendidikan": <BookOpen size={18} />,
            "Telepon": <Phone size={18} />,
            "Email": <Mail size={18} />,
          };
          const dynamicData = result.data.map((item: any, index: number) => ({
            label: item.label,
            value: item.value,
            icon: iconMap[item.label] || defaultIdentity[index]?.icon || <Award size={18} />,
          }));
          setIdentityData(dynamicData);
        }
      })
      .catch((err) => console.error("Gagal mengambil data identitas", err));

    fetch("/api/profil")
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data) {
          const p1 = result.data.find((d: any) => d.key === "paragraf1")?.content;
          const p2 = result.data.find((d: any) => d.key === "paragraf2")?.content;
          const img = result.data.find((d: any) => d.key === "image")?.content;
          setProfilData(prev => ({
            paragraf1: p1 || prev.paragraf1,
            paragraf2: p2 || prev.paragraf2,
            image: img || prev.image
          }));
        }
      })
      .catch((err) => console.error("Gagal mengambil profil", err));
  }, []);

  return (
    <section id="tentang" className="py-20 bg-gray-50 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="w-full md:w-1/2" data-aos="fade-right">
            <div className="aspect-video bg-gray-300 rounded-2xl overflow-hidden shadow-xl relative group">
              <Image 
                src={profilData.image} 
                alt="Gedung Sekolah" 
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2" data-aos="fade-left">
            <h2 className="text-3xl font-poppins font-bold text-navy mb-4">
              Tentang Kami
            </h2>
            <div className="w-20 h-1 bg-gold mb-6 rounded-full"></div>
            <p className="font-roboto text-gray-600 mb-4 leading-relaxed whitespace-pre-wrap">
              {profilData.paragraf1}
            </p>
            <p className="font-roboto text-gray-600 leading-relaxed whitespace-pre-wrap">
              {profilData.paragraf2}
            </p>
          </div>
        </div>

        {/* Card Identitas Sekolah */}
        <div className="mt-10" data-aos="fade-up">
          <div className="text-center mb-12">
            <h3 className="text-sm font-poppins font-bold text-gold uppercase tracking-[0.2em] mb-2">Informasi Resmi</h3>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-navy">Identitas Sekolah</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {identityData.map((item, index) => (
              <div 
                key={index} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className="bg-[#F8FAFC] rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center mb-3 text-[#0284C7]">
                  {item.icon}
                </div>
                
                <span className="block text-lg sm:text-xl lg:text-2xl font-poppins font-extrabold text-[#0284C7] mb-1 break-words w-full" title={item.value}>
                  {item.value}
                </span>
                <span className="block text-[11px] sm:text-xs font-roboto font-medium text-slate-500">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
