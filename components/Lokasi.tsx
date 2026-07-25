import { MapPin, Navigation } from "lucide-react";

export default function Lokasi() {
  const mapLink = "https://www.google.com/maps?q=-7.327,108.0149";
  const embedUrl = "https://www.google.com/maps?q=-7.327,108.0149&hl=id&z=16&output=embed";

  return (
    <section id="lokasi" className="py-20 bg-gray-50 text-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl font-poppins font-bold text-navy">Lokasi Sekolah</h2>
        <div className="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        <p className="font-roboto text-gray-600 max-w-2xl mx-auto mt-4">
          Kp. Panyandungan, Kec. Cigalontang, Kab. Tasikmalaya, Prov. Jawa Barat
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 p-3 sm:p-6">
          <div className="w-full h-[280px] sm:h-[380px] md:h-[480px] rounded-2xl overflow-hidden relative bg-gray-200 shadow-inner">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi SDN 1 Cigalontang"
              className="w-full h-full"
            ></iframe>
          </div>
          
          <div className="mt-5 sm:mt-6 px-2 pb-2 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left text-navy font-roboto">
              <div className="w-12 h-12 rounded-xl bg-navy/10 flex items-center justify-center text-gold sm:mr-4 shrink-0 mb-2 sm:mb-0">
                <MapPin size={24} />
              </div>
              <div>
                <span className="block text-sm sm:text-base font-bold text-navy">Koordinat GPS & Alamat</span>
                <span className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-relaxed block mt-0.5">
                  Kp. Panyandungan, Kec. Cigalontang (-7.3270, 108.0149)
                </span>
              </div>
            </div>

            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-navy hover:bg-gold text-white font-poppins font-medium px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 shrink-0 text-sm sm:text-base"
            >
              <Navigation size={18} className="rotate-45" />
              <span>Buka di Google Maps</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
