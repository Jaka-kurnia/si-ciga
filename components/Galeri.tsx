"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Galeri() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/galeri")
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setPhotos(result.data);
        }
      })
      .catch(err => console.error("Gagal mengambil data galeri:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="galeri" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold text-navy">Galeri Kegiatan</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-10 text-gray-400 font-roboto">Memuat galeri...</div>
        ) : photos.length === 0 ? (
          <div className="text-center py-10 text-gray-400 font-roboto border border-gray-100 rounded-3xl">Belum ada foto galeri.</div>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {photos.map((item, index) => (
              <div key={item.id} className="relative rounded-xl overflow-hidden group shadow-sm cursor-pointer break-inside-avoid">
                <Image 
                  src={item.image} 
                  alt={`Galeri Kegiatan ${index + 1}`} 
                  width={600}
                  height={400}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
