<div class="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div>
      <h3 class="text-xl font-poppins font-bold text-navy mb-1">Visi & Misi</h3>
      <p class="text-sm font-montserrat text-gray-500">Kelola Visi dan poin-poin Misi sekolah.</p>
    </div>
    <button 
      onclick="document.getElementById('modal-tambah-visimisi').classList.remove('hidden')"
      class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 text-sm"
    >
      <i data-lucide="plus" class="w-4 h-4"></i> Tambah Visi/Misi
    </button>
  </div>

  <div class="overflow-x-auto bg-gray-50 rounded-2xl border border-gray-200">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-100 text-gray-500 font-poppins text-xs uppercase tracking-wider">
          <th class="p-4 font-bold border-b border-gray-200">Tipe</th>
          <th class="p-4 font-bold border-b border-gray-200">Urutan</th>
          <th class="p-4 font-bold border-b border-gray-200">Konten</th>
          <th class="p-4 font-bold border-b border-gray-200 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 font-montserrat text-sm text-gray-700">
        @foreach($visiMisi as $item)
          <tr class="hover:bg-white transition-colors">
            <td class="p-4 font-bold uppercase">{{ $item->type }}</td>
            <td class="p-4">{{ $item->order }}</td>
            <td class="p-4 max-w-md">{{ $item->content }}</td>
            <td class="p-4 text-right whitespace-nowrap">
              <button type="button" onclick="editVisiMisi({{ json_encode($item) }})" class="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors mr-1 inline-block">
                <i data-lucide="edit" class="w-4 h-4"></i>
              </button>
              <form action="{{ route('admin.visimisi.destroy', $item->id) }}" method="POST" class="inline-block" onsubmit="return confirm('Hapus item ini?');">
                @csrf
                @method('DELETE')
                <button type="submit" class="p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors">
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

<!-- Modal Tambah Visi Misi -->
<div id="modal-tambah-visimisi" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-tambah-visimisi').classList.add('hidden')"></div>
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative z-10">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-poppins font-bold text-navy">Tambah Visi / Misi</h3>
      <button onclick="document.getElementById('modal-tambah-visimisi').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors"><i data-lucide="x" class="w-6 h-6"></i></button>
    </div>
    <form action="{{ route('admin.visimisi.store') }}" method="POST" class="space-y-4 text-sm font-montserrat">
      @csrf
      <div>
        <label class="block font-bold text-gray-700 mb-1">Tipe</label>
        <select name="type" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none bg-white">
          <option value="visi">Visi</option>
          <option value="misi">Misi</option>
        </select>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Urutan</label>
        <input type="number" name="order" value="1" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Konten</label>
        <textarea name="content" required rows="3" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none"></textarea>
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Simpan</button>
      </div>
    </form>
  </div>
</div>

<!-- Modal Edit Visi Misi -->
<div id="modal-edit-visimisi" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-edit-visimisi').classList.add('hidden')"></div>
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative z-10">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-poppins font-bold text-navy">Edit Visi / Misi</h3>
      <button onclick="document.getElementById('modal-edit-visimisi').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors"><i data-lucide="x" class="w-6 h-6"></i></button>
    </div>
    <form id="form-edit-visimisi" method="POST" class="space-y-4 text-sm font-montserrat">
      @csrf
      @method('PUT')
      <div>
        <label class="block font-bold text-gray-700 mb-1">Tipe</label>
        <select name="type" id="edit-vm-type" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none bg-white">
          <option value="visi">Visi</option>
          <option value="misi">Misi</option>
        </select>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Urutan</label>
        <input type="number" name="order" id="edit-vm-order" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Konten</label>
        <textarea name="content" id="edit-vm-content" required rows="3" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none"></textarea>
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Update</button>
      </div>
    </form>
  </div>
</div>

<script>
  function editVisiMisi(data) {
    document.getElementById('form-edit-visimisi').action = `/admin/visimisi/${data.id}`;
    document.getElementById('edit-vm-type').value = data.type;
    document.getElementById('edit-vm-order').value = data.order;
    document.getElementById('edit-vm-content').value = data.content;
    document.getElementById('modal-edit-visimisi').classList.remove('hidden');
    if(window.lucide) window.lucide.createIcons();
  }
</script>
