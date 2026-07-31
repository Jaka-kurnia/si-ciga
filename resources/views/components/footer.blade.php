@php
    $phone = $identitas->where('key', 'telepon')->first()?->value ?? '085322363039';
    $email = $identitas->where('key', 'email')->first()?->value ?? 'iwakartiwa52@gmail.com';
@endphp

<footer class="bg-navy text-white pt-16 pb-8 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <!-- Info -->
            <div data-aos="fade-up">
                <h3 class="text-2xl font-poppins font-bold text-gold mb-6">SDN 1 Cigalontang</h3>
                <p class="font-montserrat text-gray-300 leading-relaxed mb-6 text-sm">
                    Mencetak generasi unggul yang beriman, cerdas, terampil, dan berwawasan lingkungan menuju masa depan
                    yang gemilang.
                </p>
            </div>

            <!-- Quick Links -->
            <div data-aos="fade-up" data-aos-delay="100">
                <h4 class="text-xl font-montserrat font-bold mb-6 text-white flex items-center gap-2">
                    Tautan Cepat
                </h4>
                <ul class="space-y-3 font-montserrat text-gray-300 text-sm">
                    <li><a href="#beranda" class="hover:text-gold transition-colors">Beranda</a></li>
                    <li><a href="#tentang" class="hover:text-gold transition-colors">Tentang Kami</a></li>
                    <li><a href="#visimisi" class="hover:text-gold transition-colors">Visi & Misi</a></li>
                    <li><a href="#prestasi" class="hover:text-gold transition-colors">Prestasi</a></li>
                    <li><a href="#berita" class="hover:text-gold transition-colors">Berita</a></li>
                    <li><a href="#galeri" class="hover:text-gold transition-colors">Galeri</a></li>
                    <li><a href="#tim" class="hover:text-gold transition-colors">Tim Pengajar</a></li>
                    <li><a href="#lokasi" class="hover:text-gold transition-colors">Lokasi</a></li>
                </ul>
            </div>

            <!-- Kontak -->
            <div data-aos="fade-up" data-aos-delay="200">
                <h4 class="text-xl font-montserrat font-bold mb-6 text-white flex items-center gap-2">
                    Hubungi Kami
                </h4>
                <ul class="space-y-4 font-montserrat text-gray-300 text-sm">
                    <li class="flex items-start">
                        <i data-lucide="map-pin" class="w-5 h-5 text-gold mr-3 mt-0.5 shrink-0"></i>
                        <a href="https://www.google.com/maps?q=-7.327,108.0149" target="_blank"
                            rel="noopener noreferrer" class="hover:text-gold transition-colors leading-relaxed">
                            Kp. Panyandungan, Kec. Cigalontang, Kab. Tasikmalaya, Prov. Jawa Barat
                        </a>
                    </li>
                    <li class="flex items-center">
                        <i data-lucide="phone" class="w-5 h-5 text-gold mr-3 shrink-0"></i>
                        <span>{{ $phone }}</span>
                    </li>
                    <li class="flex items-center">
                        <i data-lucide="mail" class="w-5 h-5 text-gold mr-3 shrink-0"></i>
                        <span>{{ $email }}</span>
                    </li>
                </ul>
            </div>

            <!-- Kolaborasi -->
            <div data-aos="fade-up" data-aos-delay="300">
                <h4 class="text-xl font-montserrat font-bold mb-6 text-white flex items-center gap-2">
                    Kolaborasi
                </h4>
                <div
                    class="bg-navy border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-gold/30 transition-colors group">
                    <img src="/logo/logokkn.png" alt="KKN LP3I Tasik 01"
                        class="w-28 h-auto object-contain mb-4 filter drop-shadow-md group-hover:scale-105 transition-transform duration-300">
                    <span class="text-gold font-poppins font-bold text-[10px] tracking-widest uppercase mb-1">LP3I
                        Tasikmalaya</span>
                    <span class="text-white font-poppins font-bold text-sm leading-snug">KKN LP3I Tasik 01 <br><span
                            class="text-gray-400 font-medium">×</span><br> SDN 1 Cigalontang</span>
                </div>
            </div>
        </div>

        <div
            class="border-t border-white/10 pt-8 flex flex-col items-center justify-center text-center text-gray-400 font-montserrat text-sm space-y-1">
            <p>&copy; {{ date('Y') }} SD Negeri 1 Cigalontang. Hak Cipta Dilindungi.</p>
            <p class="text-xs text-gray-500">Dikembangkan oleh Tim KKN LP3I Tasik 01 {{ date('Y') }}</p>
        </div>
    </div>
</footer>
