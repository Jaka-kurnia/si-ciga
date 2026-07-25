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
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold mb-6 leading-tight drop-shadow-lg">
          Selamat Datang di <br className="hidden md:block"/>
          <span className="text-gold">SDN 1 Cigalontang</span>
        </h1>
        <p className="text-lg md:text-xl font-roboto mb-10 text-gray-200 drop-shadow-md">
          Mencetak generasi cerdas, berkarakter, dan berprestasi untuk masa depan gemilang.
        </p>
        <a href="#tentang" className="inline-block bg-gold text-navy font-bold py-3 px-8 rounded-full hover:bg-white hover:text-navy transition-all duration-300 transform hover:scale-105 shadow-lg">
          Pelajari Lebih Lanjut
        </a>
      </div>
    </section>
  );
}
