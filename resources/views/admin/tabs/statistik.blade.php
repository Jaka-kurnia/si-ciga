<div>
    <form action="{{ route('admin.statistik.update') }}" method="POST" class="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100 max-w-3xl">
        @csrf
        @method('PUT')
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
                <h3 class="text-xl font-poppins font-bold text-navy mb-1">Manajemen Angka Statistik Sekolah</h3>
                <p class="text-sm font-montserrat text-gray-500">
                    Ubah jumlah siswa, guru, atau ruang kelas. Perubahan akan langsung disinkronkan ke halaman beranda!
                </p>
            </div>
            <button 
                type="button"
                onclick="document.getElementById('modal-tambah-statistik').classList.remove('hidden')"
                class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 text-sm whitespace-nowrap"
            >
                <i data-lucide="plus" class="w-4 h-4"></i> Tambah Statistik
            </button>
        </div>

        <div class="space-y-5">
            @foreach($statistik as $index => $stat)
                <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 relative">
                    <input type="hidden" name="statistik[{{ $index }}][id]" value="{{ $stat->id }}">
                    
                    <!-- Delete Button Form embedded -->
                    <button type="button" onclick="confirmDelete('del-stat-{{ $stat->id }}', 'Hapus statistik ini?')" class="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors">
                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>

                    <div class="w-full sm:w-1/2 pr-6">
                        <label class="block text-xs font-poppins font-bold text-gray-500 uppercase mb-1">
                            Label Statistik
                        </label>
                        <input
                            type="text"
                            name="statistik[{{ $index }}][label]"
                            value="{{ $stat->label }}"
                            required
                            class="w-full font-poppins font-bold text-navy px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-navy transition-colors"
                        />
                    </div>
                    <div class="w-full sm:w-1/2">
                        <label class="block text-xs font-poppins font-bold text-gray-500 uppercase mb-1">
                            Angka / Jumlah
                        </label>
                        <input
                            type="text"
                            name="statistik[{{ $index }}][count]"
                            value="{{ $stat->count }}"
                            required
                            class="w-full font-poppins font-bold text-lg text-blue-600 px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-navy transition-colors"
                        />
                    </div>
                </div>
            @endforeach
        </div>

        <button
            type="submit"
            class="mt-8 bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-8 py-3.5 rounded-full shadow-lg transition-all duration-300"
        >
            Simpan Perubahan Statistik
        </button>
    </form>

    <!-- Hidden Delete Forms -->
    @foreach($statistik as $stat)
        <form id="del-stat-{{ $stat->id }}" action="{{ route('admin.statistik.destroy', $stat->id) }}" method="POST" class="hidden">
            @csrf
            @method('DELETE')
        </form>
    @endforeach

    <!-- Modal Tambah Statistik -->
    <div id="modal-tambah-statistik" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-tambah-statistik').classList.add('hidden')"></div>
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative z-10">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-xl font-poppins font-bold text-navy">Tambah Statistik</h3>
                <button onclick="document.getElementById('modal-tambah-statistik').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors"><i data-lucide="x" class="w-6 h-6"></i></button>
            </div>
            <form action="{{ route('admin.statistik.store') }}" method="POST" class="space-y-4 text-sm font-montserrat">
                @csrf
                <div>
                    <label class="block font-bold text-gray-700 mb-1">Label Statistik</label>
                    <input type="text" name="label" required placeholder="Contoh: Jumlah Guru" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
                </div>
                <div>
                    <label class="block font-bold text-gray-700 mb-1">Angka / Jumlah</label>
                    <input type="number" name="count" required placeholder="Contoh: 25" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
                </div>
                <div>
                    <label class="block font-bold text-gray-700 mb-1">Ikon (Opsional Lucide Name)</label>
                    <input type="text" name="iconName" placeholder="Contoh: users" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
                </div>
                <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                    <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Simpan</button>
                </div>
            </form>
        </div>
    </div>
</div>
