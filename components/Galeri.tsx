export default function Galeri() {
  const photos = Array.from({ length: 10 }, (_, i) => `/galeri/${i + 1}.jpeg`);

  return (
    <section id="galeri" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold text-navy">Galeri Kegiatan</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {photos.map((src, index) => (
            <div key={index} className="relative rounded-xl overflow-hidden group shadow-sm cursor-pointer break-inside-avoid">
              <img 
                src={src} 
                alt={`Galeri Kegiatan ${index + 1}`} 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
