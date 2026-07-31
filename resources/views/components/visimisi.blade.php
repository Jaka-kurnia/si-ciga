<section id="visimisi" class="py-20 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16" data-aos="fade-up">
        <h2 class="text-3xl font-poppins font-bold text-navy">Visi & Misi</h2>
        <div class="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">
        <div class="flex-1 bg-navy text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            data-aos="fade-right">
            <div
                class="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i data-lucide="target" class="w-8 h-8 text-gold"></i>
            </div>
            <h3 class="text-2xl font-montserrat font-bold mb-4 text-gold">Visi</h3>
            <p class="font-montserrat leading-relaxed text-gray-200 whitespace-pre-wrap">{{ $visiMisi->where('type', 'visi')->first()?->content ?? 'Memuat Visi...' }}</p>
        </div>

        <div class="flex-1 bg-white border border-gray-200 text-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-gold/50 transition-all duration-300 transform hover:-translate-y-2 group"
            data-aos="fade-left">
            <div
                class="w-16 h-16 bg-navy/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i data-lucide="lightbulb" class="w-8 h-8 text-navy"></i>
            </div>
            <h3 class="text-2xl font-montserrat font-bold text-navy mb-4">Misi</h3>
            <ul class="font-montserrat leading-relaxed text-gray-600 list-none space-y-3">
                @foreach ($visiMisi->where('type', 'misi') as $misi)
                    <li class="flex items-start">
                        <span class="text-gold mr-2 mt-1">•</span>
                        {{ $misi->content }}
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
</section>
