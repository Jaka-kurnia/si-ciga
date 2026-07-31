<section id="beranda" class="relative bg-navy text-white h-[80vh] flex items-center justify-center overflow-hidden">
    <!-- Background Images Slider -->
    <div id="hero-slider" class="absolute inset-0 w-full h-full">
        <div class="hero-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-40"
            style="background-image: url('/img/hero1.jpeg')"></div>
        <div class="hero-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-0"
            style="background-image: url('/img/hero2.jpeg')"></div>
        <div class="hero-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-0"
            style="background-image: url('/img/hero3.jpeg')"></div>
        <div class="hero-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out opacity-0"
            style="background-image: url('/img/hero4.jpeg')"></div>
    </div>

    <!-- Content overlay -->
    <div class="relative z-10 text-center px-4 max-w-4xl" data-aos="fade-up" data-aos-duration="1200">
        <h1
            class="text-4xl md:text-6xl font-poppins font-bold mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] leading-tight">
            Selamat Datang di <span class="text-gold block mt-2">SD Negeri 1 Cigalontang</span>
        </h1>
        <p class="text-lg md:text-xl font-montserrat mb-10 text-gray-200 drop-shadow-md">
            Membangun Generasi Unggul, Berkarakter, dan Berprestasi untuk Masa Depan yang Gemilang.
        </p>
        <a href="#tentang"
            class="inline-block bg-gold hover:bg-yellow-500 text-navy font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-[0_4px_14px_0_rgba(232,160,32,0.39)]">
            Jelajahi Profil
        </a>
    </div>
</section>

<script>
    document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;

        let currentIndex = 0;
        setInterval(() => {
            slides[currentIndex].classList.remove('opacity-40');
            slides[currentIndex].classList.add('opacity-0');

            currentIndex = (currentIndex + 1) % slides.length;

            slides[currentIndex].classList.remove('opacity-0');
            slides[currentIndex].classList.add('opacity-40');
        }, 2000);
    });
</script>
