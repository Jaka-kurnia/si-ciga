<section id="galeri" class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
    <h2 class="text-3xl font-poppins font-bold text-navy">Galeri Kegiatan</h2>
    <div class="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
  </div>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    @if($galeri->isEmpty())
      <div class="text-center py-10 text-gray-400 font-montserrat border border-gray-100 rounded-3xl">Belum ada foto galeri.</div>
    @else
      <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        @foreach($galeri as $index => $item)
          <div class="relative rounded-xl overflow-hidden group shadow-sm cursor-pointer break-inside-avoid">
            <img 
              src="{{ $item->image }}" 
              alt="Galeri Kegiatan {{ $index + 1 }}" 
              class="w-full h-auto transform group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300"></div>
          </div>
        @endforeach
      </div>
    @endif
  </div>
</section>
