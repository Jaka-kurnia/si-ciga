<section id="prestasi" class="py-20 bg-gray-50 relative">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16" data-aos="fade-up">
    <h2 class="text-3xl font-poppins font-bold text-navy">Prestasi Unggulan</h2>
    <div class="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
  </div>
  
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1">
      @forelse($prestasi as $index => $item)
          <div 
            data-aos="fade-up"
            data-aos-delay="{{ $index * 100 }}"
            class="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 group flex flex-col md:flex-row overflow-hidden relative cursor-pointer"
            onclick="openPrestasiModal({{ $index }})"
          >
            <!-- Bagian Foto Kiri -->
            <div class="md:w-5/12 h-64 md:h-auto min-h-[300px] relative overflow-hidden bg-gray-100 shrink-0">
              @if($item->image)
                <img 
                  src="{{ $item->image }}" 
                  alt="{{ $item->title }}"
                  class="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              @else
                <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <i data-lucide="trophy" class="w-16 h-16 text-gray-400"></i>
                </div>
              @endif
              <div class="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-60"></div>
              
              <div class="absolute top-4 left-4 bg-gold text-navy font-bold px-4 py-1.5 rounded-full text-xs uppercase shadow-md flex items-center z-10">
                <i data-lucide="trophy" class="w-3.5 h-3.5 mr-1.5"></i>
                Prestasi
              </div>
            </div>

            <!-- Bagian Teks Kanan -->
            <div class="md:w-3/5 p-6 sm:p-8 md:p-10 flex flex-col justify-center text-left">
              <h3 class="text-2xl sm:text-3xl font-poppins font-bold text-navy mb-3 group-hover:text-gold transition-colors">
                {{ $item->title }}
              </h3>
              <p class="font-montserrat text-gray-500 mb-8 text-base sm:text-lg">
                {{ $item->category }}
              </p>
              
              <div>
                <button 
                  onclick="event.stopPropagation(); openPrestasiModal({{ $index }})"
                  class="inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 bg-navy text-white font-medium rounded-full hover:bg-gold transition-colors text-sm sm:text-base shadow-[0_4px_14px_0_rgba(13,43,94,0.39)] transform group-hover:-translate-y-1"
                >
                  Baca Ucapan Selengkapnya
                </button>
              </div>
            </div>
          </div>
        @empty
          <div class="text-center py-10 bg-white rounded-3xl border border-gray-100">
            <p class="text-gray-500 font-montserrat">Belum ada data prestasi.</p>
          </div>
        @endforelse
      </div>
  </div>

  <!-- Modal Detail Prestasi -->
  <div id="prestasi-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
    <div class="absolute inset-0 bg-navy/80 backdrop-blur-md transition-opacity" onclick="closePrestasiModal()"></div>
    <div class="relative bg-white rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col">
      
      <!-- Tombol Close -->
      <button 
        onclick="closePrestasiModal()"
        class="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-navy transition-colors bg-black/20 hover:bg-white backdrop-blur-md p-2.5 rounded-full z-20 shadow-lg"
      >
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
      
      <!-- Cover Image / Banner -->
      <div class="relative h-64 sm:h-80 w-full shrink-0 bg-navy">
        <img id="modal-prestasi-image" src="" alt="Foto Prestasi" class="w-full h-full object-cover hidden" />
        <div id="modal-prestasi-placeholder" class="absolute inset-0 flex items-center justify-center">
           <i data-lucide="trophy" class="w-20 h-20 text-white/10"></i>
        </div>
        
        <!-- Gradient Masking -->
        <div class="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent"></div>
        
        <div class="absolute bottom-0 left-0 w-full flex justify-center translate-y-1/2 z-10">
           <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-xl border-4 border-white flex items-center justify-center">
             <i data-lucide="trophy" class="w-10 h-10 sm:w-12 sm:h-12 text-gold"></i>
           </div>
        </div>
      </div>

      <!-- Konten Scrollable -->
      <div class="overflow-y-auto flex-1 p-6 sm:p-10 pt-14 sm:pt-16 text-center relative z-10 bg-white">
        <h3 class="text-2xl sm:text-4xl font-poppins font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-navy to-gold mb-3 uppercase tracking-wider drop-shadow-sm">
          SELAMAT & SUKSES
        </h3>
        
        <h4 id="modal-prestasi-title" class="text-lg sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 font-poppins max-w-3xl mx-auto">
        </h4>
        
        <p id="modal-prestasi-message" class="font-montserrat text-gray-600 leading-relaxed text-base sm:text-lg mb-8 max-w-2xl mx-auto bg-gray-50 p-6 rounded-3xl border border-gray-100 shadow-inner">
        </p>
        
        <div id="modal-prestasi-students" class="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10 max-w-3xl mx-auto">
        </div>
        
        <div class="relative max-w-2xl mx-auto mb-10">
          <span class="absolute -top-6 -left-4 sm:-left-8 text-6xl text-gold/20 font-serif select-none">"</span>
          <p id="modal-prestasi-quote" class="font-montserrat text-gray-700 leading-relaxed italic text-lg sm:text-xl relative z-10 px-4">
          </p>
          <span class="absolute -bottom-10 -right-4 sm:-right-8 text-6xl text-gold/20 font-serif select-none">"</span>
        </div>
        
        <div class="w-24 h-1.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-auto mb-8 rounded-full"></div>
        
        <p id="modal-prestasi-footer" class="font-montserrat text-gray-400 leading-relaxed max-w-2xl mx-auto text-xs sm:text-sm tracking-wide">
        </p>
      </div>
    </div>
  </div>
</section>

<script>
  const prestasiData = @json($prestasi);

  function openPrestasiModal(index) {
    const item = prestasiData[index];
    if (!item) return;

    const modal = document.getElementById('prestasi-modal');
    const image = document.getElementById('modal-prestasi-image');
    const placeholder = document.getElementById('modal-prestasi-placeholder');
    const title = document.getElementById('modal-prestasi-title');
    const message = document.getElementById('modal-prestasi-message');
    const studentsContainer = document.getElementById('modal-prestasi-students');
    const quote = document.getElementById('modal-prestasi-quote');
    const footer = document.getElementById('modal-prestasi-footer');

    if (item.image) {
      image.src = item.image;
      image.classList.remove('hidden');
      placeholder.classList.add('hidden');
    } else {
      image.src = "";
      image.classList.add('hidden');
      placeholder.classList.remove('hidden');
    }

    title.textContent = item.title;
    message.textContent = item.message;
    quote.textContent = item.quote;
    footer.textContent = item.footer;

    studentsContainer.innerHTML = '';
    if (item.students) {
      item.students.split(',').forEach(name => {
        const div = document.createElement('div');
        div.className = "bg-white border-2 border-gold/30 px-5 py-2.5 sm:py-3 rounded-2xl flex items-center shadow-sm hover:shadow-lg hover:border-gold hover:-translate-y-1 transition-all duration-300";
        div.innerHTML = `<span class="text-gold mr-2 text-xl drop-shadow-sm">✨</span><span class="font-poppins font-bold text-navy text-sm sm:text-base">${name.trim()}</span>`;
        studentsContainer.appendChild(div);
      });
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closePrestasiModal() {
    const modal = document.getElementById('prestasi-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
</script>
