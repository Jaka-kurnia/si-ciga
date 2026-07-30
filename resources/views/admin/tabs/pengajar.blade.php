<div class="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-100">
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
    <div>
      <h3 class="text-xl font-poppins font-bold text-navy mb-1">Tenaga Pengajar</h3>
      <p class="text-sm font-montserrat text-gray-500">Kelola daftar guru dan staf akademik sekolah.</p>
    </div>
    <button 
      onclick="document.getElementById('modal-tambah-pengajar').classList.remove('hidden')"
      class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-semibold px-5 py-2.5 rounded-full shadow-md transition-all flex items-center gap-2 text-sm"
    >
      <i data-lucide="plus" class="w-4 h-4"></i> Tambah Pengajar
    </button>
  </div>

  <div class="overflow-x-auto bg-gray-50 rounded-2xl border border-gray-200">
    <table class="w-full text-left border-collapse">
      <thead>
        <tr class="bg-gray-100 text-gray-500 font-poppins text-xs uppercase tracking-wider">
          <th class="p-4 font-bold border-b border-gray-200">Foto</th>
          <th class="p-4 font-bold border-b border-gray-200">Nama & NIP</th>
          <th class="p-4 font-bold border-b border-gray-200">Jabatan</th>
          <th class="p-4 font-bold border-b border-gray-200">Penugasan</th>
          <th class="p-4 font-bold border-b border-gray-200 text-right">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 font-montserrat text-sm text-gray-700">
        @foreach($pengajar as $item)
          <tr class="hover:bg-white transition-colors">
            <td class="p-4">
              <div class="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative border border-gray-200">
                <img src="{{ $item->image ?? '/logo/logo.png' }}" class="object-cover w-full h-full" alt="img" />
              </div>
            </td>
            <td class="p-4">
              <div class="font-bold text-navy">{{ $item->name }}</div>
              <div class="text-xs text-gray-500 mt-1">NIP: {{ $item->nip }}</div>
            </td>
            <td class="p-4">
              <span class="bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-full text-xs">
                {{ $item->jabatan }}
              </span>
              @if($item->isHeadmaster)
              <span class="bg-gold/20 text-yellow-700 font-bold px-2.5 py-1 rounded-full text-xs ml-1">
                Kepsek
              </span>
              @endif
            </td>
            <td class="p-4">
              <div>{{ $item->penugasan }}</div>
              <div class="text-xs text-gray-500">{{ $item->sasaran }}</div>
            </td>
            <td class="p-4 text-right whitespace-nowrap">
              <button type="button" onclick="editPengajar({{ json_encode($item) }})" class="p-2 bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-lg transition-colors mr-1 inline-block">
                <i data-lucide="edit" class="w-4 h-4"></i>
              </button>
              <form action="{{ route('admin.pengajar.destroy', $item->id) }}" method="POST" class="inline-block" onsubmit="return confirm('Hapus pengajar ini?');">
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

<!-- Modal Tambah Pengajar -->
<div id="modal-tambah-pengajar" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-tambah-pengajar').classList.add('hidden')"></div>
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-poppins font-bold text-navy">Tambah Tenaga Pengajar</h3>
      <button onclick="document.getElementById('modal-tambah-pengajar').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>
    <form action="{{ route('admin.pengajar.store') }}" method="POST" enctype="multipart/form-data" class="space-y-4 text-sm font-montserrat">
      @csrf
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
          <input type="text" name="name" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">NIP / NUPTK</label>
          <input type="text" name="nip" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Jabatan</label>
          <input type="text" name="jabatan" required placeholder="Contoh: Guru Kelas 1" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Penugasan</label>
          <input type="text" name="penugasan" required placeholder="Contoh: Wali Kelas" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Sasaran Kelas</label>
          <input type="text" name="sasaran" required placeholder="Contoh: Kelas 1A" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Urutan Tampil (Order)</label>
          <input type="number" name="order" value="1" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <input type="checkbox" name="isHeadmaster" value="1" id="isHeadmaster" class="w-4 h-4 text-navy rounded focus:ring-navy">
        <label for="isHeadmaster" class="font-bold text-gray-700">Tandai sebagai Kepala Sekolah</label>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Pas Foto</label>
        <input type="file" name="image" accept="image/*" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-gold transition-colors" />
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Simpan</button>
      </div>
    </form>
  </div>
</div>

<!-- Modal Edit Pengajar -->
<div id="modal-edit-pengajar" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm" onclick="document.getElementById('modal-edit-pengajar').classList.add('hidden')"></div>
  <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-poppins font-bold text-navy">Edit Tenaga Pengajar</h3>
      <button onclick="document.getElementById('modal-edit-pengajar').classList.add('hidden')" class="text-gray-400 hover:text-red-500 transition-colors">
        <i data-lucide="x" class="w-6 h-6"></i>
      </button>
    </div>
    <form id="form-edit-pengajar" method="POST" enctype="multipart/form-data" class="space-y-4 text-sm font-montserrat">
      @csrf
      @method('PUT')
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
          <input type="text" name="name" id="edit-p-name" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">NIP / NUPTK</label>
          <input type="text" name="nip" id="edit-p-nip" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Jabatan</label>
          <input type="text" name="jabatan" id="edit-p-jabatan" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Penugasan</label>
          <input type="text" name="penugasan" id="edit-p-penugasan" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-bold text-gray-700 mb-1">Sasaran Kelas</label>
          <input type="text" name="sasaran" id="edit-p-sasaran" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
        <div>
          <label class="block font-bold text-gray-700 mb-1">Urutan Tampil (Order)</label>
          <input type="number" name="order" id="edit-p-order" required class="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-navy outline-none" />
        </div>
      </div>
      <div class="flex items-center gap-2">
        <!-- Hidden input so unchecked checkbox sends 0 -->
        <input type="hidden" name="isHeadmaster" value="0">
        <input type="checkbox" name="isHeadmaster" value="1" id="edit-p-isHeadmaster" class="w-4 h-4 text-navy rounded focus:ring-navy">
        <label for="edit-p-isHeadmaster" class="font-bold text-gray-700">Tandai sebagai Kepala Sekolah</label>
      </div>
      <div>
        <label class="block font-bold text-gray-700 mb-1">Pas Foto (Kosongkan jika tidak diubah)</label>
        <input type="file" name="image" accept="image/*" class="w-full px-4 py-2.5 rounded-xl border border-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-navy file:text-white hover:file:bg-gold transition-colors" />
      </div>
      <div class="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
        <button type="submit" class="bg-navy hover:bg-gold hover:text-navy text-white font-poppins font-bold px-6 py-2.5 rounded-full shadow-lg transition-colors">Update</button>
      </div>
    </form>
  </div>
</div>

<script>
  function editPengajar(data) {
    document.getElementById('form-edit-pengajar').action = `/admin/pengajar/${data.id}`;
    document.getElementById('edit-p-name').value = data.name;
    document.getElementById('edit-p-nip').value = data.nip;
    document.getElementById('edit-p-jabatan').value = data.jabatan;
    document.getElementById('edit-p-penugasan').value = data.penugasan;
    document.getElementById('edit-p-sasaran').value = data.sasaran;
    document.getElementById('edit-p-order').value = data.order;
    document.getElementById('edit-p-isHeadmaster').checked = data.isHeadmaster == 1;
    document.getElementById('modal-edit-pengajar').classList.remove('hidden');
    if(window.lucide) window.lucide.createIcons();
  }
</script>
