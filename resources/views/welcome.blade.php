<!DOCTYPE html>
<html lang="id" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Primary Meta Tags -->
    <title>SDN 1 Cigalontang | Sekolah Dasar Tasikmalaya</title>
    <meta name="title" content="SDN 1 Cigalontang | Sekolah Dasar Tasikmalaya">
    <meta name="description"
        content="Website resmi SD Negeri 1 Cigalontang Tasikmalaya. Temukan profil sekolah, visi misi, daftar guru, prestasi unggulan, ekstrakurikuler, dan berita kegiatan terbaru kami.">
    <meta name="keywords"
        content="SDN 1 Cigalontang, SD Negeri 1 Cigalontang, SD di Tasikmalaya, Sekolah Dasar Cigalontang, Pendidikan Dasar, SD Terbaik, Berita Sekolah, Guru SDN 1 Cigalontang">
    <meta name="author" content="SDN 1 Cigalontang">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="language" content="Indonesian">
    <link rel="canonical" href="{{ url('/') }}" />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:title" content="SDN 1 Cigalontang | Cerdas, Terampil, Beriman">
    <meta property="og:description"
        content="Website resmi SD Negeri 1 Cigalontang Tasikmalaya. Temukan profil sekolah, visi misi, daftar guru, prestasi, dan berita terbaru kami.">
    <meta property="og:image" content="{{ asset('logo/logo.png') }}">
    <meta property="og:site_name" content="SDN 1 Cigalontang">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="{{ url('/') }}">
    <meta name="twitter:title" content="SDN 1 Cigalontang | Cerdas, Terampil, Beriman">
    <meta name="twitter:description"
        content="Website resmi SD Negeri 1 Cigalontang Tasikmalaya. Temukan profil sekolah, daftar guru, dan berita terbaru kami.">
    <meta name="twitter:image" content="{{ asset('logo/logo.png') }}">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('logo/logo.png') }}">
    <link rel="apple-touch-icon" href="{{ asset('logo/logo.png') }}">

    <!-- Structured Data / JSON-LD -->
    <script type="application/ld+json">
    {
      "@@context": "https://schema.org",
      "@@type": "EducationalOrganization",
      "name": "SDN 1 Cigalontang",
      "description": "Sekolah Dasar Negeri 1 Cigalontang, Tasikmalaya",
      "image": "{{ asset('logo/logo.png') }}",
      "url": "{{ url('/') }}",
      "address": {
        "@@type": "PostalAddress",
        "addressLocality": "Cigalontang",
        "addressRegion": "Jawa Barat",
        "addressCountry": "ID"
      }
    }
    </script>
    <!-- AOS CSS -->
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body class="antialiased">
    @include('components.navbar')
    <main>
        @include('components.hero')
        @include('components.statistik')
        @include('components.tentangkami')
        @include('components.visimisi')
        @include('components.prestasi')
        @include('components.berita')
        @include('components.galeri')
        @include('components.timpengajar')
        @include('components.lokasi')
    </main>
    @include('components.footer')

    <!-- AOS JS -->
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <script>
        AOS.init({
            once: true
        });
        lucide.createIcons();
    </script>
</body>

</html>
