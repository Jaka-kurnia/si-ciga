export default function TimPengajar() {
  const tim = [
    { name: "Ahmad Suherman, S.Pd.", role: "Kepala Sekolah" },
    { name: "Siti Aminah, M.Pd.", role: "Guru Kelas 6" },
    { name: "Budi Santoso, S.Pd.", role: "Guru PJOK" },
    { name: "Rina Marlina, S.Ag.", role: "Guru Agama" },
  ];

  return (
    <section id="tim" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-poppins font-bold text-navy">Tim Pengajar</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {tim.map((guru, index) => (
            <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <div className="aspect-square bg-gray-200 overflow-hidden relative">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(guru.name)}&background=0D2B5E&color=E8A020&size=512`} 
                  alt={guru.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 text-center border-b-4 border-transparent group-hover:border-gold transition-colors">
                <h3 className="font-poppins font-bold text-navy text-lg mb-1">{guru.name}</h3>
                <p className="font-roboto text-gray-500 text-sm">{guru.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
