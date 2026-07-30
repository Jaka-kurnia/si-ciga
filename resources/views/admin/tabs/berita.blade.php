<div class="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div>
      <h3 class="text-xl font-poppins font-bold text-navy mb-1">Manajemen Berita & Kegiatan</h3>
      <p class="text-sm font-montserrat text-gray-500">Kelola artikel berita dan dokumentasi kegiatan sekolah.</p>
    </div>
    <button 
      onclick="document.getElementById('modal-tambah-berita').classList.remove('hidden')"
      class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 text-sm"
    >
      <i data-lucide="plus" class="w-4 h-4"></i> Tambah Berita
    </button>
  </div>

  <div class="overflow-x-auto bg-gray-50 rounded-2xl border border-gray-200">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-100 text-gray-500 font-poppins text-xs uppercase tracking-wider">
          <th class="p-4 font-bold border-b border-gray-200">Foto</th>
          <th class="p-4 font-bold border-b border-gray-200">Judul Berita</th>
          <th class="p-4 font-bold border-b border-gray-200">Kategori</th>
          <th class="p-4 font-bold border-b border-gray-200">Tanggal</th>
          <th class="p-4 font-bold border-b border-gray-200 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 font-montserrat text-sm text-gray-700">
        @foreach($berita as $item)
          <tr class="hover:bg-white transition-colors">
            <td class="p-4">
              <div class="w-16 h-12 rounded-lg bg-gray-200 overflow-hidden relative border border-gray-200">
                <img src="{{ $item->image }}" class="object-cover w-full h-full" alt="img" />
              </div>
            </td>
            <td class="p-4 font-bold text-navy max-w-xs truncate">{{ $item->title }}</td>
            <td class="p-4">
              <span class="bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-full text-xs">
                {{ $item->category }}
              </span>
            </td>
            <td class="p-4">{{ $item->date }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <button type="button" onclick="editBerita({{ json_encode($item) }})" class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors mr-2 inline-block">
                  <i data-lucide="edit-2" class="w-4 h-4"></i>
              </button>
              <form id="del-berita-{{ $item->id }}" action="{{ route('admin.berita.destroy', $item->id) }}" method="POST" class="inline-block">
                  @csrf
                  @method('DELETE')
                  <button type="button" onclick="confirmDelete('del-berita-{{ $item->id }}', 'Apakah Anda yakin ingin menghapus berita ini?')" class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
              </form>
            </td>
          </tr>
        @endforeach
      </tbody>
    </table>
  </div>
</div>

<!-- Modal Tambah Berita -->
<div id="modal-tambah-berita" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-tambah-berita').classList.add('hidden')"></div>
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-poppins font-bold text-navy">Tambah Berita Baru</h3>
      <button onclick="document.getElementById('modal-tambah-berita').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>
    <form action="{{ route('admin.berita.store') }}" method="POST" enctype="multipart/form-data" class="space-y-4 text-sm font-montserrat">
      @csrf
      <div>
        <label class="block font-bold text-gray-700 mb-1">Judul Berita</label>
        <input type="text" name="title" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Tanggal</label>
          <input type="text" name="date" required placeholder="Contoh: 15 Juli 2026" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Kategori</label>
          <input type="text" name="category" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Kutipan Singkat (Excerpt)</label>
        <textarea name="excerpt" required rows="3" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none"></textarea>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Foto Berita</label>
        <input type="file" name="image" required accept="image/*" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-gold transition-colors" />
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <button type="button" onclick="document.getElementById('modal-tambah-berita').classList.add('hidden')" class="px-6 py-2.5 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-colors">Batal</button>
        <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Simpan Berita</button>
      </div>
    </form>
  </div>
</div>

<!-- Modal Edit Berita -->
<div id="modal-edit-berita" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-edit-berita').classList.add('hidden')"></div>
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-poppins font-bold text-navy">Edit Berita</h3>
      <button onclick="document.getElementById('modal-edit-berita').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>
    <form id="form-edit-berita" method="POST" enctype="multipart/form-data" class="space-y-4 text-sm font-montserrat">
      @csrf
      @method('PUT')
      <div>
        <label class="block font-bold text-gray-700 mb-1">Judul Berita</label>
        <input type="text" name="title" id="edit-b-title" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Tanggal</label>
          <input type="text" name="date" id="edit-b-date" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Kategori</label>
          <input type="text" name="category" id="edit-b-category" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Kutipan Singkat (Excerpt)</label>
        <textarea name="excerpt" id="edit-b-excerpt" required rows="3" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none"></textarea>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Foto Berita (Kosongkan jika tidak diubah)</label>
        <input type="file" name="image" accept="image/*" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-gold transition-colors" />
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <button type="button" onclick="document.getElementById('modal-edit-berita').classList.add('hidden')" class="px-6 py-2.5 rounded-full font-bold text-gray-500 hover:bg-gray-100 transition-colors">Batal</button>
        <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Update Berita</button>
      </div>
    </form>
  </div>
</div>

<script>
  function editBerita(data) {
    document.getElementById('form-edit-berita').action = `/admin/berita/${data.id}`;
    document.getElementById('edit-b-title').value = data.title;
    document.getElementById('edit-b-date').value = data.date;
    document.getElementById('edit-b-category').value = data.category;
    document.getElementById('edit-b-excerpt').value = data.excerpt;
    document.getElementById('modal-edit-berita').classList.remove('hidden');
    if(window.lucide) window.lucide.createIcons();
  }
</script>
