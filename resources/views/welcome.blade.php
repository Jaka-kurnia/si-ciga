<!DOCTYPE html>
<html lang="id" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Primary Meta Tags -->
    <title>SDN 1 Cigalontang | Cerdas, Terampil, Beriman</title>
    <meta name="title" content="SDN 1 Cigalontang | Cerdas, Terampil, Beriman">
    <meta name="description"
        content="Website resmi SD Negeri 1 Cigalontang. Menampilkan profil, visi misi, data statistik, prestasi unggulan, serta berita terbaru seputar pendidikan dan kegiatan sekolah.">
    <meta name="keywords"
        content="SDN 1 Cigalontang, Sekolah Dasar Cigalontang, SD Tasikmalaya, Pendidikan, Sekolah Dasar, KKN LP3I Tasik 01">
    <meta name="author" content="Tim KKN LP3I Tasik 01">
    <meta name="robots" content="index, follow">
    <meta name="language" content="Indonesian">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url('/') }}">
    <meta property="og:title" content="SDN 1 Cigalontang | Cerdas, Terampil, Beriman">
    <meta property="og:description"
        content="Website resmi SD Negeri 1 Cigalontang. Menampilkan profil, visi misi, data statistik, prestasi unggulan, serta berita terbaru.">
    <meta property="og:image" content="{{ asset('logo/logo.png') }}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{ url('/') }}">
    <meta property="twitter:title" content="SDN 1 Cigalontang | Cerdas, Terampil, Beriman">
    <meta property="twitter:description"
        content="Website resmi SD Negeri 1 Cigalontang. Menampilkan profil, visi misi, data statistik, prestasi unggulan, serta berita terbaru.">
    <meta property="twitter:image" content="{{ asset('logo/logo.png') }}">

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
