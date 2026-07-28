"use client";
import { useState, useEffect, ReactNode } from "react";
import Image from "next/image";
import { Award, Building2, Hash, BookOpen, Phone, Mail } from "lucide-react";

export default function TentangKami() {
  const defaultIdentity = [
    { label: "Akreditasi", value: "B", icon: <Award size={24} className="text-gold" /> },
    { label: "Status Sekolah", value: "Negeri", icon: <Building2 size={24} className="text-gold" /> },
    { label: "NPSN", value: "20262428", icon: <Hash size={24} className="text-gold" /> },
    { label: "Bentuk Pendidikan", value: "SD", icon: <BookOpen size={24} className="text-gold" /> },
    { label: "Telepon", value: "085322363039", icon: <Phone size={24} className="text-gold" /> },
    { label: "Email", value: "iwakartiwa52@gmail.com", icon: <Mail size={24} className="text-gold" /> },
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
            "Akreditasi": <Award size={24} className="text-gold" />,
            "Status Sekolah": <Building2 size={24} className="text-gold" />,
            "NPSN": <Hash size={24} className="text-gold" />,
            "Bentuk Pendidikan": <BookOpen size={24} className="text-gold" />,
            "Telepon": <Phone size={24} className="text-gold" />,
            "Email": <Mail size={24} className="text-gold" />,
          };
          const dynamicData = result.data.map((item: any, index: number) => ({
            label: item.label,
            value: item.value,
            icon: iconMap[item.label] || defaultIdentity[index]?.icon || <Award size={24} className="text-gold" />,
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
        <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100" data-aos="fade-up">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-poppins font-bold text-navy">Identitas Sekolah</h3>
            <div className="w-16 h-1 bg-gold mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {identityData.map((item, index) => (
              <div 
                key={index} 
                data-aos="fade-up" 
                data-aos-delay={index * 100}
                className="flex items-start sm:items-center p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gold/50 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center mr-3 sm:mr-4 shrink-0 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="block text-xs sm:text-sm text-gray-400 font-roboto font-medium mb-0.5">{item.label}</span>
                  <span className="block text-sm sm:text-base md:text-lg font-poppins font-bold text-navy break-all sm:break-normal" title={item.value}>
                    {item.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
