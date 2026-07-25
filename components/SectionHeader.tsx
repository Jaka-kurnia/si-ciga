export default function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="relative bg-[#2563eb] text-white py-20 overflow-hidden w-full">
      <div className="absolute top-0 right-0 w-200 h-200 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/2 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-160 h-160 bg-navy opacity-10 rounded-full -translate-x-1/3 translate-y-1/3 blur-2xl pointer-events-none"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-4 drop-shadow-md">
          {title}
        </h2>

        <p className="text-lg md:text-xl font-roboto text-blue-100 drop-shadow">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
