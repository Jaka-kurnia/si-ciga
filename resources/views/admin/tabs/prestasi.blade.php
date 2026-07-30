<div class="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div>
      <h3 class="text-xl font-poppins font-bold text-navy mb-1">Prestasi Sekolah</h3>
      <p class="text-sm font-montserrat text-gray-500">Kelola riwayat kejuaraan dan pencapaian.</p>
    </div>
    <button 
      onclick="document.getElementById('modal-tambah-prestasi').classList.remove('hidden')"
      class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 text-sm"
    >
      <i data-lucide="plus" class="w-4 h-4"></i> Tambah Prestasi
    </button>
  </div>

  <div class="overflow-x-auto bg-gray-50 rounded-2xl border border-gray-200">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-100 text-gray-500 font-poppins text-xs uppercase tracking-wider">
          <th class="p-4 font-bold border-b border-gray-200">Dokumentasi</th>
          <th class="p-4 font-bold border-b border-gray-200">Nama Prestasi</th>
          <th class="p-4 font-bold border-b border-gray-200">Kategori</th>
          <th class="p-4 font-bold border-b border-gray-200">Siswa</th>
          <th class="p-4 font-bold border-b border-gray-200 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 font-montserrat text-sm text-gray-700">
        @foreach($prestasi as $item)
          <tr class="hover:bg-white transition-colors">
            <td class="p-4">
              <div class="w-16 h-12 rounded-lg bg-gray-200 overflow-hidden relative border border-gray-200">
                <img src="{{ $item->image }}" class="object-cover w-full h-full" alt="img" />
              </div>
            </td>
            <td class="p-4 font-bold text-navy max-w-xs truncate">{{ $item->title }}</td>
            <td class="p-4">
              <span class="bg-gold/20 text-yellow-700 font-bold px-2.5 py-1 rounded-full text-xs">
                {{ $item->category }}
              </span>
            </td>
            <td class="p-4">{{ $item->students }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <button type="button" onclick="editPrestasi({{ json_encode($item) }})" class="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 p-2 rounded-lg transition-colors mr-2 inline-block">
                  <i data-lucide="edit-2" class="w-4 h-4"></i>
              </button>
              <form id="del-prestasi-{{ $item->id }}" action="{{ route('admin.prestasi.destroy', $item->id) }}" method="POST" class="inline-block">
                  @csrf
                  @method('DELETE')
                  <button type="button" onclick="confirmDelete('del-prestasi-{{ $item->id }}', 'Hapus prestasi ini?')" class="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors">
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

<!-- Modal Tambah Prestasi -->
<div id="modal-tambah-prestasi" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-tambah-prestasi').classList.add('hidden')"></div>
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-poppins font-bold text-navy">Tambah Prestasi Baru</h3>
      <button onclick="document.getElementById('modal-tambah-prestasi').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>
    <form action="{{ route('admin.prestasi.store') }}" method="POST" enctype="multipart/form-data" class="space-y-4 text-sm font-montserrat">
      @csrf
      <div>
        <label class="block font-bold text-gray-700 mb-1">Judul / Nama Prestasi</label>
        <input type="text" name="title" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Kategori</label>
          <input type="text" name="category" required placeholder="Contoh: Akademik" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Nama Siswa / Tim</label>
          <input type="text" name="students" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Pesan / Apresiasi Singkat</label>
        <textarea name="message" required rows="2" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none"></textarea>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Kutipan Inspiratif (Quote)</label>
          <input type="text" name="quote" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Pengutip (Footer)</label>
          <input type="text" name="footer" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Foto Dokumentasi</label>
        <input type="file" name="image" required accept="image/*" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-gold transition-colors" />
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Simpan</button>
      </div>
    </form>
  </div>
</div>

<!-- Modal Edit Prestasi -->
<div id="modal-edit-prestasi" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-edit-prestasi').classList.add('hidden')"></div>
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-poppins font-bold text-navy">Edit Prestasi</h3>
      <button onclick="document.getElementById('modal-edit-prestasi').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>
    <form id="form-edit-prestasi" method="POST" enctype="multipart/form-data" class="space-y-4 text-sm font-montserrat">
      @csrf
      @method('PUT')
      <div>
        <label class="block font-bold text-gray-700 mb-1">Judul / Nama Prestasi</label>
        <input type="text" name="title" id="edit-pr-title" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Kategori</label>
          <input type="text" name="category" id="edit-pr-category" required placeholder="Contoh: Akademik" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Nama Siswa / Tim</label>
          <input type="text" name="students" id="edit-pr-students" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Pesan / Apresiasi Singkat</label>
        <textarea name="message" id="edit-pr-message" required rows="2" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none"></textarea>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Kutipan Inspiratif (Quote)</label>
          <input type="text" name="quote" id="edit-pr-quote" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Pengutip (Footer)</label>
          <input type="text" name="footer" id="edit-pr-footer" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Foto Dokumentasi (Kosongkan jika tidak diubah)</label>
        <input type="file" name="image" accept="image/*" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-gold transition-colors" />
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Update</button>
      </div>
    </form>
  </div>
</div>

<script>
  function editPrestasi(data) {
    document.getElementById('form-edit-prestasi').action = `/admin/prestasi/${data.id}`;
    document.getElementById('edit-pr-title').value = data.title;
    document.getElementById('edit-pr-category').value = data.category;
    document.getElementById('edit-pr-students').value = data.students;
    document.getElementById('edit-pr-message').value = data.message;
    document.getElementById('edit-pr-quote').value = data.quote;
    document.getElementById('edit-pr-footer').value = data.footer;
    document.getElementById('modal-edit-prestasi').classList.remove('hidden');
    if(window.lucide) window.lucide.createIcons();
  }
</script>
