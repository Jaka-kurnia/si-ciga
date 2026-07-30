<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Admin CMS SDN 1 Cigalontang</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
        rel="stylesheet">

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://unpkg.com/lucide@latest"></script>
</head>

<body class="antialiased min-h-screen flex items-center justify-center p-4 relative"
    style="background-image: url('/img/hero1.jpeg'); background-size: cover; background-position: center; background-attachment: fixed;">
    <div class="absolute inset-0 bg-navy/60 backdrop-blur-sm z-0"></div>
    <div
        class="bg-white/10 backdrop-blur-xl max-w-md w-full rounded-3xl shadow-2xl p-8 sm:p-10 border border-white/20 relative z-10">
        <div class="text-center mb-8">
            <div
                class="w-20 h-20 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl border border-white/20">
                <img src="/logo/logo.png" alt="Logo SDN" class="w-14 h-14 object-contain filter drop-shadow-sm">
            </div>
            <h1 class="text-2xl font-poppins font-bold text-white">Admin Login</h1>
            <p class="text-gray-200 font-montserrat text-sm mt-2">Silakan masuk untuk mengelola website</p>
        </div>

        <form id="loginForm" action="{{ route('login.post') }}" method="POST" class="space-y-6" novalidate>
            @csrf

            <div>
                <label for="email" class="block text-sm font-poppins font-bold text-white mb-2">Email Address</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i data-lucide="mail" class="h-5 w-5 text-gray-300"></i>
                    </div>
                    <input type="email" name="email" id="email" value="{{ old('email') }}" required autofocus
                        class="block w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl font-montserrat text-sm text-white placeholder-gray-300 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="email">
                </div>
            </div>

            <div>
                <label for="password" class="block text-sm font-poppins font-bold text-white mb-2">Password</label>
                <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <i data-lucide="lock" class="h-5 w-5 text-gray-300"></i>
                    </div>
                    <input type="password" name="password" id="password" required
                        class="block w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl font-montserrat text-sm text-white placeholder-gray-300 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
                        placeholder="••••••••">
                </div>
            </div>

            <button type="submit"
                class="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-gold hover:bg-white text-navy font-poppins font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <span>Masuk Dashboard</span>
                <i data-lucide="arrow-right" class="w-5 h-5"></i>
            </button>
        </form>

        <div class="mt-8 pt-6 border-t border-white/10 text-center">
            <a href="/"
                class="text-sm font-montserrat font-medium text-gray-300 hover:text-white transition-colors inline-flex items-center gap-2">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Kembali ke Beranda
            </a>
        </div>
    </div>

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
   @include('auth.script')
</body>

</html>
