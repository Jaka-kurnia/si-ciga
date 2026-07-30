<div class="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div>
      <h3 class="text-xl font-poppins font-bold text-navy mb-1">Galeri Kegiatan</h3>
      <p class="text-sm font-montserrat text-gray-500">Kelola foto-foto galeri sekolah.</p>
    </div>
    <form action="{{ route('admin.galeri.store') }}" method="POST" enctype="multipart/form-data" class="flex gap-2" id="form-upload-galeri">
      @csrf
      <input type="file" name="image" required accept="image/*" class="hidden" id="galeri-upload" onchange="document.getElementById('form-upload-galeri').submit()" />
      <button 
        type="button"
        onclick="document.getElementById('galeri-upload').click()"
        class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 text-sm"
      >
        <i data-lucide="upload" class="w-4 h-4"></i> Upload Foto
      </button>
    </form>
  </div>

  <div class="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
    @foreach($galeri as $item)
      <div class="relative rounded-xl overflow-hidden group shadow-sm break-inside-avoid">
        <img src="{{ $item->image }}" class="w-full h-auto" />
        <div class="absolute inset-0 bg-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <form action="{{ route('admin.galeri.destroy', $item->id) }}" method="POST" onsubmit="return confirm('Hapus foto ini?');">
                @csrf
                @method('DELETE')
                <button type="submit" class="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg">
                    <i data-lucide="trash-2" class="w-5 h-5"></i>
                </button>
            </form>
        </div>
      </div>
    @endforeach
  </div>
</div>
