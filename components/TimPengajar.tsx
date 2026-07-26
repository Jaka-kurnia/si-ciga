"use client";

export default function TimPengajar() {
  const headMaster = {
    name: "AJAT SUDRAJAT, S.Pd., M.M.",
    jabatan: "Guru Pembina Utama Muda",
    nip: "197005061991031003",
    penugasan: "Pembimbing Guru Dalam PBM",
  };

  const staffList = [
    { name: "WINA OKTARI DEWI", nip: "199510062022212003", penugasan: "Pembina Pramuka Siaga Putri", sasaran: "Kls I-III" },
    { name: "IWA KARTIWA, S.Pd.", nip: "198607142023211009", penugasan: "Pembina Kesenian", sasaran: "Kls I-VI" },
    { name: "ECIN NURJANAH, S.Pd.", nip: "198409012024212012", penugasan: "Keagamaan & BTQ", sasaran: "Kls I-VI" },
    { name: "FITRI LISTIANI, S.Pd.", nip: "199604042024212057", penugasan: "Pembina Pramuka Penggalang Putri", sasaran: "Kls IV-VI" },
    { name: "OGIYANA, S.Pd.", nip: "-", penugasan: "Pramuka Penggalang Putra & Olahraga", sasaran: "Kls I-VI" },
    { name: "RESI RITADEWI, S.Pd.", nip: "-", penugasan: "Pembina Perpustakaan", sasaran: "Kls I-VI" },
    { name: "DODI IRMAWAN, S.Pd.", nip: "-", penugasan: "Pembina Pramuka Siaga Putra", sasaran: "Kls I-III" },
  ];

  return (
    <section id="tim" className="py-20 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl font-poppins font-bold text-navy">Struktur Tim Pengajar</h2>
          <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {/* TIER 1: Pimpinan (Rata Tengah) */}
        <div className="flex justify-center mb-12 sm:mb-16 relative" data-aos="fade-down" data-aos-delay="100">
          <div className="w-full sm:w-105 bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center relative mt-12 z-20 hover:-translate-y-1 transition-transform duration-300">
            {/* Foto Profil Pimpinan */}
            <div className="absolute -top-12 w-24 h-24 bg-gray-100 rounded-full border-4 border-white shadow-md overflow-hidden">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(headMaster.name)}&background=0D2B5E&color=E8A020&size=256&font-size=0.33`}
                alt={headMaster.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            
            <div className="pt-12 w-full">
              <h3 className="font-poppins font-bold text-navy text-lg sm:text-xl mb-1">{headMaster.name}</h3>
              <p className="text-gold font-bold text-xs uppercase tracking-widest mb-1">{headMaster.jabatan}</p>
              <p className="text-gray-400 font-roboto text-xs mb-6">NIP. {headMaster.nip}</p>
              
              <div className="bg-navy/5 rounded-2xl p-4 text-sm font-roboto border border-navy/5 text-left flex flex-col gap-3">
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wide">Tugas Membimbing</span>
                  <span className="font-semibold text-navy text-sm leading-tight">{headMaster.penugasan}</span>
                </div>
                <div>
                

                </div>
              </div>
            </div>
          </div>
          
          {/* Garis Penghubung (Hanya muncul di Desktop) */}
          <div className="hidden lg:block absolute left-1/2 -ml-px top-full w-0.5 h-12 bg-gray-200 z-10"></div>
        </div>

        {/* TIER 2: Anggota Staf (Flex Wrap: Baris otomatis center) */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-14 lg:gap-y-16 mt-16 lg:mt-8">
          {staffList.map((staff, index) => (
            <div 
              key={index} 
              data-aos="fade-up"
              data-aos-delay={200 + (index * 100)}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-70 xl:w-75 bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center text-center relative transition-all duration-300 group"
            >
              {/* Foto Profil Anggota */}
              <div className="absolute -top-10 w-20 h-20 bg-gray-100 rounded-full border-4 border-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(staff.name)}&background=f1f5f9&color=0D2B5E&size=256&font-size=0.33`}
                  alt={staff.name} 
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="pt-10 w-full flex flex-col h-full">
                <h4 className="font-poppins font-bold text-navy text-sm sm:text-base leading-snug mb-1 group-hover:text-gold transition-colors">{staff.name}</h4>
                <p className="text-gray-400 font-roboto text-[11px] sm:text-xs mb-5">
                  {staff.nip !== "-" ? `NIP. ${staff.nip}` : "Guru Pendamping"}
                </p>
                
                <div className="bg-gray-50 rounded-xl p-3 text-left border border-gray-100 mt-auto flex flex-col justify-between gap-2 h-full">
                  <div>
                    <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">Tugas Membimbing</span>
                    <span className="text-[13px] font-medium text-gray-700 leading-tight">{staff.penugasan}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] font-bold text-gold uppercase tracking-wider">Sasaran Kelas</span>
                    <span className="text-[13px] font-medium text-gray-700">{staff.sasaran}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
