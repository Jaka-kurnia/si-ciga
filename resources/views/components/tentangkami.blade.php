<section id="tentang" class="py-20 bg-gray-50 text-gray-800 overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col md:flex-row items-center gap-12 mb-16">
      <div class="w-full md:w-1/2" data-aos="fade-right">
        <div class="aspect-video bg-gray-300 rounded-2xl overflow-hidden shadow-xl relative group">
          @php
              $imgProfil = $profil->where('key', 'image')->first()?->content ?? '/fotoSekolah/foto2.jpg';
          @endphp
          <img 
            src="{{ $imgProfil }}" 
            alt="Gedung Sekolah" 
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>
      <div class="w-full md:w-1/2" data-aos="fade-left">
        <h2 class="text-3xl font-poppins font-bold text-navy mb-4">Tentang Kami</h2>
        <div class="w-20 h-1 bg-gold mb-6 rounded-full"></div>
        
        @php
            $paragraphs = $profil->where('key', '!=', 'image');
        @endphp

        @forelse($paragraphs as $item)
            <p class="font-montserrat text-gray-600 mb-4 leading-relaxed whitespace-pre-wrap">{{ $item->content }}</p>
        @empty
            <p class="font-montserrat text-gray-600 mb-4 leading-relaxed whitespace-pre-wrap">Memuat profil...</p>
        @endforelse
      </div>
    </div>

    <!-- Card Identitas Sekolah -->
    <div class="mt-10" data-aos="fade-up">
      <div class="text-center mb-12">
        <h3 class="text-sm font-poppins font-bold text-gold uppercase tracking-[0.2em] mb-2">Informasi Resmi</h3>
        <h2 class="text-3xl md:text-4xl font-poppins font-bold text-navy">Identitas Sekolah</h2>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        @php
            $defaultIcons = [
                'Akreditasi' => 'award',
                'Status Sekolah' => 'building-2',
                'NPSN' => 'hash',
                'Bentuk Pendidikan' => 'book-open',
                'Telepon' => 'phone',
                'Email' => 'mail',
            ];
        @endphp
        @foreach($identitas as $index => $item)
          <div data-aos="fade-up" data-aos-delay="{{ $index * 100 }}" class="bg-[#F8FAFC] rounded-3xl p-4 sm:p-5 flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300">
            <div class="w-10 h-10 rounded-xl bg-[#E0F2FE] flex items-center justify-center mb-3 text-[#0284C7]">
              <i data-lucide="{{ $defaultIcons[$item->label] ?? 'award' }}" class="w-4.5 h-4.5"></i>
            </div>
            <span class="block text-lg sm:text-xl lg:text-2xl font-poppins font-extrabold text-[#0284C7] mb-1 break-words w-full" title="{{ $item->value }}">
              {{ $item->value }}
            </span>
            <span class="block text-[11px] sm:text-xs font-montserrat font-medium text-slate-500">
              {{ $item->label }}
            </span>
          </div>
        @endforeach
      </div>
    </div>
  </div>
</section>
