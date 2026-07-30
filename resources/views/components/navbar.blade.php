<nav class="sticky top-0 z-50 bg-navy text-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16 items-center">
      <div class="shrink-0 flex items-center gap-3">
        <img src="/logo/logo.png" alt="Logo SDN 1 Cigalontang" width="40" height="40" class="h-10 w-auto" />
        <span class="font-poppins font-bold text-lg sm:text-xl text-gold">
          SDN 1 Cigalontang
        </span>
      </div>
      <div class="hidden md:flex space-x-8">
        <a href="#beranda" class="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Beranda</a>
        <a href="#visimisi" class="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Visi & Misi</a>
        <a href="#prestasi" class="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Prestasi</a>
        <a href="#berita" class="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Berita</a>
        <a href="#galeri" class="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Galeri</a>
        <a href="#tim" class="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Tim Pengajar</a>
        <a href="#lokasi" class="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">Lokasi</a>
        <a href="/admin" class="relative hover:text-gold transition-colors py-1 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left">
          Login
        </a>
      </div>
      <div class="md:hidden flex items-center">
        <button id="mobile-menu-btn" class="text-white hover:text-gold">
          <i data-lucide="menu" id="menu-icon"></i>
        </button>
      </div>
    </div>
  </div>
  <!-- Mobile Menu -->
  <div id="mobile-menu" class="hidden md:hidden bg-navy/98 border-t border-white/10 py-4 px-6 space-y-3 font-inter">
    <a href="#beranda" class="mobile-link block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Beranda</a>
    <a href="#tentang" class="mobile-link block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Tentang Kami</a>
    <a href="#visimisi" class="mobile-link block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Visi & Misi</a>
    <a href="#prestasi" class="mobile-link block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Prestasi</a>
    <a href="#berita" class="mobile-link block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Berita & Kegiatan</a>
    <a href="#galeri" class="mobile-link block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Galeri</a>
    <a href="#tim" class="mobile-link block w-full text-base font-medium py-2 hover:text-gold transition-colors border-b border-white/5">Tim Pengajar</a>
    <a href="#lokasi" class="mobile-link block w-full text-base font-medium py-2 hover:text-gold transition-colors">Lokasi</a>
    <div class="pt-2">
      <a href="/admin" class="flex items-center justify-center gap-2 w-full text-base font-bold py-3 bg-gold hover:bg-yellow-500 text-navy rounded-full transition-colors shadow-md mt-2">
        🔒 Login Admin
      </a>
    </div>
  </div>
</nav>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');
    
    let isOpen = false;
    
    const toggleMenu = () => {
      isOpen = !isOpen;
      if (isOpen) {
        menu.classList.remove('hidden');
        btn.innerHTML = '<i data-lucide="x" id="menu-icon"></i>';
      } else {
        menu.classList.add('hidden');
        btn.innerHTML = '<i data-lucide="menu" id="menu-icon"></i>';
      }
      if(window.lucide) {
          window.lucide.createIcons();
      }
    };

    btn.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', () => {
      if(isOpen) toggleMenu();
    }));
  });
</script>
