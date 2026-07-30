<div>
    <form action="{{ route('admin.profil.update') }}" method="POST" enctype="multipart/form-data" class="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 max-w-3xl">
        @csrf
        @method('PUT')
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h3 class="text-xl font-poppins font-bold text-navy">Profil Tentang Kami</h3>
            </div>
            <button 
                type="button"
                onclick="document.getElementById('modal-tambah-profil').classList.remove('hidden')"
                class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 text-sm whitespace-nowrap"
            >
                <i data-lucide="plus" class="w-4 h-4"></i> Tambah Paragraf
            </button>
        </div>

        <div class="space-y-6">
            @php
                $imgProfil = $profil->where('key', 'image')->first()?->content ?? '/fotoSekolah/foto2.jpg';
            @endphp
            
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <label class="block text-sm font-bold text-gray-700 mb-2">Foto Profil (Upload)</label>
                <div class="mb-4 rounded-xl overflow-hidden max-w-xs border border-gray-200 shadow-sm">
                    <div class="relative w-full h-40">
                        <img src="{{ $imgProfil }}" class="object-cover w-full h-full" alt="Preview" />
                    </div>
                </div>
                <input 
                    type="file" 
                    name="image" 
                    accept="image/*" 
                    class="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:font-bold file:bg-navy file:text-white hover:file:bg-gold file:transition-colors file:cursor-pointer" 
                />
            </div>

            @foreach($profil->where('key', '!=', 'image') as $index => $item)
                <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 relative">
                    <input type="hidden" name="profil[{{ $index }}][id]" value="{{ $item->id }}">
                    <!-- Delete Button Form embedded -->
                    <button type="button" onclick="confirmDelete('del-profil-{{ $item->id }}', 'Hapus paragraf ini?')" class="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>

                    <label class="block text-sm font-bold text-gray-700 mb-2 pr-8">
                        {{ ucwords(str_replace('_', ' ', $item->key)) }}
                    </label>
                    <textarea
                        name="profil[{{ $index }}][content]"
                        required rows="4"
                        class="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-navy focus:border-navy outline-none mb-3 transition-colors"
                    >{{ $item->content }}</textarea>
                </div>
            @endforeach
        </div>

        <button 
            type="submit" 
            class="mt-6 px-6 py-2.5 bg-navy text-white rounded-xl font-bold hover:bg-gold transition-colors text-sm"
        >
            Simpan Seluruh Profil
        </button>
    </form>

    <!-- Hidden Delete Forms -->
    @foreach($profil->where('key', '!=', 'image') as $item)
        <form id="del-profil-{{ $item->id }}" action="{{ route('admin.profil.destroy', $item->id) }}" method="POST" class="hidden">
            @csrf
            @method('DELETE')
        </form>
    @endforeach

    <!-- Modal Tambah Profil -->
    <div id="modal-tambah-profil" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-tambah-profil').classList.add('hidden')"></div>
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative z-10">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-poppins font-bold text-navy">Tambah Paragraf Profil</h3>
                <button onclick="document.getElementById('modal-tambah-profil').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors"><i data-lucide="x" class="w-6 h-6"></i></button>
            </div>
            <form action="{{ route('admin.profil.store') }}" method="POST" class="space-y-4 text-sm font-montserrat">
                @csrf
                <div>
                    <label class="block font-bold text-gray-700 mb-1">Kunci (Key) / Judul Paragraf</label>
                    <input type="text" name="key" required placeholder="Contoh: visi_utama" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
                </div>
                <div>
                    <label class="block font-bold text-gray-700 mb-1">Isi Konten Paragraf</label>
                    <textarea name="content" required rows="4" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none"></textarea>
                </div>
                <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                    <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>
