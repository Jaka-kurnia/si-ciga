<div>
    <form action="{{ route('admin.identitas.update') }}" method="POST" class="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 max-w-3xl">
        @csrf
        @method('PUT')
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h3 class="text-xl font-poppins font-bold text-navy mb-1">Manajemen Profil & Kontak Sekolah</h3>
                <p class="text-sm font-montserrat text-gray-500">
                    Atur informasi identitas seperti Akreditasi, NPSN, Telepon, dan Email resmi yang tampil di Footer & Tentang Kami.
                </p>
            </div>
            <button 
                type="button"
                onclick="document.getElementById('modal-tambah-identitas').classList.remove('hidden')"
                class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 text-sm whitespace-nowrap"
            >
                <i data-lucide="plus" class="w-4 h-4"></i> Tambah Identitas
            </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            @foreach($identitas as $index => $item)
                <div class="p-4 bg-gray-50 rounded-2xl border border-gray-200 relative">
                    <input type="hidden" name="identitas[{{ $index }}][id]" value="{{ $item->id }}">
                    
                    <button type="button" onclick="if(confirm('Hapus identitas ini?')) { document.getElementById('del-identitas-{{ $item->id }}').submit(); }" class="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>

                    <label class="block text-xs font-poppins font-bold text-gray-500 uppercase mb-1 pr-6">
                        {{ $item->label }} ({{ $item->key }})
                    </label>
                    <input
                        type="text"
                        name="identitas[{{ $index }}][value]"
                        value="{{ $item->value }}"
                        required
                        class="w-full font-poppins font-semibold text-navy text-base px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-navy transition-colors"
                    />
                </div>
            @endforeach
        </div>

        <button
            type="submit"
            class="mt-8 bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300"
        >
            Simpan Perubahan Identitas
        </button>
    </form>

    <!-- Hidden Delete Forms -->
    @foreach($identitas as $item)
        <form id="del-identitas-{{ $item->id }}" action="{{ route('admin.identitas.destroy', $item->id) }}" method="POST" class="hidden">
            @csrf
            @method('DELETE')
        </form>
    @endforeach

    <!-- Modal Tambah Identitas -->
    <div id="modal-tambah-identitas" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-tambah-identitas').classList.add('hidden')"></div>
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-poppins font-bold text-navy">Tambah Identitas</h3>
                <button onclick="document.getElementById('modal-tambah-identitas').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors"><i data-lucide="x" class="w-6 h-6"></i></button>
            </div>
            <form action="{{ route('admin.identitas.store') }}" method="POST" class="space-y-4 text-sm font-montserrat">
                @csrf
                <div>
                    <label class="block font-bold text-gray-700 mb-1">Label (Contoh: Instagram)</label>
                    <input type="text" name="label" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
                </div>
                <div>
                    <label class="block font-bold text-gray-700 mb-1">Key unik (Contoh: instagram)</label>
                    <input type="text" name="key" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
                </div>
                <div>
                    <label class="block font-bold text-gray-700 mb-1">Nilai / Value</label>
                    <input type="text" name="value" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
                </div>
                <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                    <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>
