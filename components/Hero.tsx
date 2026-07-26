"use client";

import { useState, useEffect } from "react";

const images = [
  "/img/hero1.jpeg",
  "/img/hero2.jpeg",
  "/img/hero3.jpeg",
  "/img/hero4.jpeg",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="beranda" className="relative bg-navy text-white h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Images Slider */}
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-40" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      ))}
      
      {/* Content overlay */}
      <div className="relative z-10 text-center px-4 max-w-4xl" data-aos="fade-up" data-aos-duration="1200">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-tight">
          Selamat Datang di <span className="text-gold block mt-2">SD Negeri 1 Cigalontang</span>
        </h1>
        <p className="text-lg md:text-xl font-roboto mb-10 text-gray-200 drop-shadow-md">
          Membangun Generasi Unggul, Berkarakter, dan Berprestasi untuk Masa Depan yang Gemilang.
        </p>
        <a 
          href="#tentang" 
          className="inline-block bg-gold hover:bg-yellow-500 text-navy font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-[0_4px_14px_0_rgba(232,160,32,0.39)]"
        >
          Jelajahi Profil
        </a>
      </div>
    </section>
  );
}
