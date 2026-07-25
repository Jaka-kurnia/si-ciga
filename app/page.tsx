import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statistik from "@/components/Statistik";
import TentangKami from "@/components/TentangKami";
import VisiMisi from "@/components/VisiMisi";
import Prestasi from "@/components/Prestasi";
import Berita from "@/components/Berita";
import Galeri from "@/components/Galeri";
import TimPengajar from "@/components/TimPengajar";
import Lokasi from "@/components/Lokasi";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Statistik />
        <TentangKami />
        <VisiMisi />
        <Prestasi />
        <Berita />
        <Galeri />
        <TimPengajar />
        <Lokasi />
      </main>
      <Footer />
    </>
  );
}
