<section id="berita" class="py-20 bg-white relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16" data-aos="fade-up">
    <h2 class="text-3xl font-poppins font-bold text-navy">Berita & Kegiatan Sekolah</h2>
    <div class="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
    <p class="font-montserrat text-gray-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
      Ikuti perkembangan informasi dan potret dokumentasi kegiatan terbaru di lingkungan SDN 1 Cigalontang
    </p>
  </div>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" data-aos="fade-up" data-aos-delay="200">
    <!-- Tombol Kontrol Kiri -->
    <button 
      id="berita-prev"
      aria-label="Berita Sebelumnya"
      class="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gold text-navy hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-hidden"
    >
      <i data-lucide="arrow-left" class="w-5 h-5"></i>
    </button>

    <!-- Tombol Kontrol Kanan -->
    <button 
      id="berita-next"
      aria-label="Berita Selanjutnya"
      class="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gold text-navy hover:text-white w-10 h-10 md:w-12 md:h-12 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center justify-center transition-all duration-300 transform hover:scale-110 focus:outline-hidden"
    >
      <i data-lucide="arrow-right" class="w-5 h-5"></i>
    </button>

    <!-- Carousel Viewport -->
    <div class="overflow-hidden px-1 py-4">
      <div 
        id="berita-track"
        class="flex transition-transform duration-700 ease-in-out -mx-3"
      >
        @foreach($berita as $item)
          <div class="berita-card shrink-0 px-3 transition-all duration-300">
            <div class="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 border border-gray-100 flex flex-col h-full group">
              <div class="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src="{{ $item->image }}" 
                  alt="{{ $item->title }}" 
                  class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="absolute top-4 left-4 bg-navy/90 text-gold font-poppins text-xs font-bold px-3 py-1.5 rounded-full uppercase shadow-md tracking-wider">
                  {{ $item->category }}
                </div>
              </div>

              <div class="p-6 sm:p-7 flex flex-col flex-1">
                <div class="flex items-center text-gray-500 text-xs font-montserrat mb-3 font-medium">
                  <i data-lucide="calendar" class="w-4 h-4 mr-2 text-gold shrink-0"></i>
                  <span>{{ $item->date }}</span>
                </div>

                <h3 class="text-lg font-poppins font-bold text-navy mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {{ $item->title }}
                </h3>

                <p class="font-montserrat text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {{ $item->excerpt }}
                </p>

                <div class="pt-4 border-t border-gray-100 flex items-center justify-between text-navy font-poppins font-semibold text-xs sm:text-sm group-hover:text-gold transition-colors">
                  <span>SDN 1 Cigalontang</span>
                  <span class="text-gold text-base font-bold transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </div>
        @endforeach
      </div>
    </div>

    <!-- Dots Indicators -->
    <div id="berita-dots" class="flex justify-center items-center space-x-2.5 mt-8">
      <!-- Dots will be generated via JS -->
    </div>
  </div>
</section>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('berita-track');
    const cards = document.querySelectorAll('.berita-card');
    const prevBtn = document.getElementById('berita-prev');
    const nextBtn = document.getElementById('berita-next');
    const dotsContainer = document.getElementById('berita-dots');
    
    if(!track || cards.length === 0) return;

    let currentIndex = 0;
    let cardsToShow = 3;

    const updateCardsToShow = () => {
      if (window.innerWidth < 640) {
        cardsToShow = 1;
      } else if (window.innerWidth < 1024) {
        cardsToShow = 2;
      } else {
        cardsToShow = 3;
      }
      
      cards.forEach(card => {
        card.style.width = `${100 / cardsToShow}%`;
      });
      
      updateCarousel();
    };

    const updateCarousel = () => {
      const maxIndex = Math.max(0, cards.length - cardsToShow);
      if (currentIndex > maxIndex) currentIndex = maxIndex;
      if (currentIndex < 0) currentIndex = 0;
      
      track.style.transform = `translateX(-${currentIndex * (100 / cardsToShow)}%)`;
      renderDots(maxIndex);
    };

    const renderDots = (maxIndex) => {
      dotsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.ariaLabel = `Slide ke ${i + 1}`;
        dot.className = `transition-all duration-300 rounded-full ${
          currentIndex === i 
            ? "w-9 h-2.5 bg-gold shadow-sm" 
            : "w-2.5 h-2.5 bg-gray-300 hover:bg-navy/40"
        }`;
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    };

    const handlePrev = () => {
      const maxIndex = Math.max(0, cards.length - cardsToShow);
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateCarousel();
    };

    const handleNext = () => {
      const maxIndex = Math.max(0, cards.length - cardsToShow);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateCarousel();
    };

    prevBtn.addEventListener('click', handlePrev);
    nextBtn.addEventListener('click', handleNext);

    window.addEventListener('resize', updateCardsToShow);
    updateCardsToShow();

    // Auto-play
    setInterval(() => {
      handleNext();
    }, 4500);
  });
</script>
