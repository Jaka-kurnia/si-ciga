"use client";
import { useState, useEffect, ReactNode } from "react";
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
      .catch((err) => console.error("Error fetching identitas from MySQL:", err));
  }, []);

  return (
    <section id="tentang" className="py-20 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
          <div className="w-full md:w-1/2">
            <div className="aspect-video bg-gray-300 rounded-2xl overflow-hidden shadow-xl relative group">
              <img 
                src="/fotoSekolah/foto2.jpg" 
                alt="Gedung Sekolah" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-poppins font-bold text-navy mb-4">
              Tentang Kami
            </h2>
            <div className="w-20 h-1 bg-gold mb-6 rounded-full"></div>
            <p className="font-roboto text-gray-600 mb-4 leading-relaxed">
              SD Negeri 1 Cigalontang adalah institusi pendidikan dasar yang berkomitmen memberikan pelayanan pendidikan terbaik bagi masyarakat. Kami berdiri dengan dedikasi untuk membina karakter dan potensi setiap siswa.
            </p>
            <p className="font-roboto text-gray-600 leading-relaxed">
              Dengan lingkungan belajar yang kondusif dan tenaga pendidik yang profesional, kami siap mengantarkan putra-putri Anda menuju gerbang kesuksesan di masa depan, berlandaskan nilai-nilai luhur dan integritas tinggi.
            </p>
          </div>
        </div>

        {/* Card Identitas Sekolah */}
        <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-poppins font-bold text-navy">Identitas Sekolah</h3>
            <div className="w-16 h-1 bg-gold mx-auto mt-2 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {identityData.map((item, index) => (
              <div key={index} className="flex items-start sm:items-center p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gold/50 hover:shadow-md transition-all duration-300 group">
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
