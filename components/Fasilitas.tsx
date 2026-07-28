import Image from "next/image";

export default function Fasilitas() {
  const fasilitas = [
    {
      name: "Ruang Kelas Nyaman",
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Perpustakaan Lengkap",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop",
    },
    {
      name: "Laboratorium Komputer",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop",
    },
    {
      name: "Lapangan Olahraga",
      image: "https://images.unsplash.com/photo-1576624417726-103328e1fc16?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <section id="fasilitas" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold text-navy">Fasilitas Sekolah</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fasilitas.map((item, index) => (
            <div key={index} className="relative rounded-2xl overflow-hidden group aspect-4/3 shadow-lg cursor-pointer">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-t from-navy/90 via-navy/40 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white font-poppins font-bold text-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">{item.name}</h3>
                <div className="w-0 h-1 bg-gold mt-2 group-hover:w-12 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
