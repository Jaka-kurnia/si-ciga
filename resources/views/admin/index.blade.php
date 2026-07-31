<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex, nofollow">
    <title>Admin CMS SDN 1 Cigalontang</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://unpkg.com/lucide@latest"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</head>
<body class="antialiased bg-gray-50">
    <!-- Session Alerts -->
    @if(session('success'))
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: '{{ session('success') }}',
                    timer: 2000,
                    showConfirmButton: false
                });
            });
        </script>
    @endif

    <div id="app-root">
        <!-- Dashboard Layout -->
        <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            <!-- Sidebar -->
            <aside class="w-full md:w-72 bg-navy p-5 sm:p-6 shadow-xl shrink-0 flex flex-col md:sticky md:top-0 md:h-screen overflow-y-auto z-50">
                <div class="pb-5 border-b border-white/10 mb-5 text-center md:text-left flex items-center justify-center md:justify-start gap-3">
                    <div class="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0">
                        <img src="/logo/logo.png" alt="Logo" width="40" height="40" class="w-full h-full object-contain" />
                    </div>
                    <div class="hidden md:block">
                        <h2 class="text-xl font-poppins font-bold text-white tracking-wide leading-tight">CMS</h2>
                        <p class="text-gold text-[10px] font-montserrat">SDN 1 Cigalontang</p>
                    </div>
                </div>
                
                <nav class="flex flex-col space-y-3 w-full">
                    <a href="?tab=berita" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 w-full text-left {{ $tab === 'berita' ? 'bg-gold text-navy shadow-md transform scale-[1.02]' : 'bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20' }}">
                        <i data-lucide="megaphone" class="w-4.5 h-4.5 {{ $tab === 'berita' ? 'text-navy' : 'text-gray-400' }}"></i> Berita & Kegiatan
                    </a>
                    <a href="?tab=statistik" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 w-full text-left {{ $tab === 'statistik' ? 'bg-gold text-navy shadow-md transform scale-[1.02]' : 'bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20' }}">
                        <i data-lucide="bar-chart-2" class="w-4.5 h-4.5 {{ $tab === 'statistik' ? 'text-navy' : 'text-gray-400' }}"></i> Statistik Sekolah
                    </a>
                    <a href="?tab=identitas" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 w-full text-left {{ $tab === 'identitas' ? 'bg-gold text-navy shadow-md transform scale-[1.02]' : 'bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20' }}">
                        <i data-lucide="chart-column-big" class="w-4.5 h-4.5 {{ $tab === 'identitas' ? 'text-navy' : 'text-gray-400' }}"></i> Identitas & Kontak
                    </a>
                    <a href="?tab=profil" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 w-full text-left {{ $tab === 'profil' ? 'bg-gold text-navy shadow-md transform scale-[1.02]' : 'bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20' }}">
                        <i data-lucide="file-text" class="w-4.5 h-4.5 {{ $tab === 'profil' ? 'text-navy' : 'text-gray-400' }}"></i> Profil (Tentang Kami)
                    </a>
                    <a href="?tab=visimisi" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 w-full text-left {{ $tab === 'visimisi' ? 'bg-gold text-navy shadow-md transform scale-[1.02]' : 'bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20' }}">
                        <i data-lucide="target" class="w-4.5 h-4.5 {{ $tab === 'visimisi' ? 'text-navy' : 'text-gray-400' }}"></i> Visi & Misi
                    </a>
                    <a href="?tab=pengajar" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 w-full text-left {{ $tab === 'pengajar' ? 'bg-gold text-navy shadow-md transform scale-[1.02]' : 'bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20' }}">
                        <i data-lucide="users" class="w-4.5 h-4.5 {{ $tab === 'pengajar' ? 'text-navy' : 'text-gray-400' }}"></i> Struktur Tim Pengajar
                    </a>
                    <a href="?tab=prestasi" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 w-full text-left {{ $tab === 'prestasi' ? 'bg-gold text-navy shadow-md transform scale-[1.02]' : 'bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20' }}">
                        <i data-lucide="trophy" class="w-4.5 h-4.5 {{ $tab === 'prestasi' ? 'text-navy' : 'text-gray-400' }}"></i> Prestasi Unggulan
                    </a>
                    <a href="?tab=galeri" class="flex items-center gap-3 px-4 py-3.5 rounded-2xl font-poppins font-semibold text-sm transition-all duration-300 w-full text-left {{ $tab === 'galeri' ? 'bg-gold text-navy shadow-md transform scale-[1.02]' : 'bg-transparent hover:bg-white/10 text-gray-300 border border-transparent hover:border-white/20' }}">
                        <i data-lucide="image" class="w-4.5 h-4.5 {{ $tab === 'galeri' ? 'text-navy' : 'text-gray-400' }}"></i> Galeri Kegiatan
                    </a>
                </nav>

                <div class="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-poppins font-bold text-sm rounded-xl transition-colors border border-rose-500/20">
                            Keluar Admin
                        </button>
                    </form>
                </div>
            </aside>

            <!-- Main Content Area -->
            <div class="flex-1 w-full flex flex-col min-h-screen">
                <div class="bg-white px-4 md:px-8 h-16 flex items-center justify-between border-b border-gray-100 shadow-sm sticky top-0 z-40 shrink-0">
                    <h2 class="text-lg font-poppins font-bold text-navy hidden sm:block">Dashboard Administrator</h2>
                    <div class="flex-1 sm:hidden"></div>
                    <a href="/" target="_blank" rel="noopener noreferrer" class="bg-navy hover:bg-gold hover:text-navy text-white text-xs sm:text-sm font-poppins font-medium px-4 py-2 rounded-full transition-colors shadow-sm flex items-center gap-2">
                        🚀 <span class="hidden sm:inline">Lihat Website</span>
                    </a>
                </div>
                
                <div id="tab-content" class="p-4 md:p-8 lg:p-10 flex-1 relative z-0">
                    @if($tab === 'berita')
                        @include('admin.tabs.berita')
                    @elseif($tab === 'statistik')
                        @include('admin.tabs.statistik')
                    @elseif($tab === 'identitas')
                        @include('admin.tabs.identitas')
                    @elseif($tab === 'profil')
                        @include('admin.tabs.profil')
                    @elseif($tab === 'visimisi')
                        @include('admin.tabs.visimisi')
                    @elseif($tab === 'pengajar')
                        @include('admin.tabs.pengajar')
                    @elseif($tab === 'prestasi')
                        @include('admin.tabs.prestasi')
                    @elseif($tab === 'galeri')
                        @include('admin.tabs.galeri')
                    @else
                        <div class="p-12 text-center text-gray-400 font-montserrat">Modul belum diimplementasikan.</div>
                    @endif
                </div>
            </div>
        </div>
    </div>
    <script>
        lucide.createIcons();
        
        function confirmDelete(formId, message) {
            Swal.fire({
                title: 'Apakah Anda Yakin?',
                text: message || "Data ini akan dihapus secara permanen!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: '#0D2B5E',
                confirmButtonText: 'Ya, Hapus!',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    document.getElementById(formId).submit();
                }
            });
        }
    </script>
</body>
</html>
