import { LayoutDashboard, GraduationCap, User, UserCircle, Trophy } from "lucide-react";

export default function Statistik() {
  const stats = [
    { label: "Ruang Kelas", count: "6", icon: <LayoutDashboard size={28} className="text-white" /> },
    { label: "Guru & Staf", count: "7", icon: <GraduationCap size={28} className="text-white" /> },
    { label: "Siswa", count: "87", icon: <User size={28} className="text-white" /> },
    { label: "Siswi", count: "47", icon: <UserCircle size={28} className="text-white" /> },
    { label: "Prestasi", count: "45+", icon: <Trophy size={28} className="text-white" /> },
  ];

  return (
    <div className="bg-[#f5f7fb] w-full px-4 sm:px-6 lg:px-8 pb-12 pt-8 md:pt-0">
      <div className="max-w-7xl mx-auto md:-mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className={`flex flex-col items-center flex-1 min-w-[120px] p-2 sm:p-0 group ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-[#2563eb] to-[#60a5fa] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-md transform group-hover:-translate-y-2 group-hover:shadow-lg transition-all duration-300">
                {stat.icon}
              </div>
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-navy">{stat.count}</h3>
              <p className="font-roboto text-gray-500 text-xs sm:text-base font-medium mt-1 text-center">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
