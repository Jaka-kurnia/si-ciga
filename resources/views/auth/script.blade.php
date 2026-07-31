 <script>
     lucide.createIcons();

     document.getElementById('loginForm').addEventListener('submit', function(e) {
         const email = document.getElementById('email').value.trim();
         const password = document.getElementById('password').value.trim();

         if (!email) {
             e.preventDefault();
             Swal.fire({
                 icon: 'warning',
                 title: 'Email Kosong',
                 text: 'Harap masukkan alamat email Anda!',
                 confirmButtonColor: '#1e293b',
                 confirmButtonText: 'Mengerti',
                 customClass: {
                     popup: 'rounded-2xl',
                     title: 'font-poppins font-bold',
                     htmlContainer: 'font-montserrat',
                     confirmButton: 'font-poppins font-bold rounded-xl px-6 py-2.5 text-white'
                 }
             });
             return;
         }

         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!emailRegex.test(email)) {
             e.preventDefault();
             Swal.fire({
                 icon: 'warning',
                 title: 'Format Email Salah',
                 text: 'Harap masukkan alamat email yang benar!',
                 confirmButtonColor: '#1e293b',
                 confirmButtonText: 'Mengerti',
                 customClass: {
                     popup: 'rounded-2xl',
                     title: 'font-poppins font-bold',
                     htmlContainer: 'font-montserrat',
                     confirmButton: 'font-poppins font-bold rounded-xl px-6 py-2.5 text-white'
                 }
             });
             return;
         }

         if (!password) {
             e.preventDefault();
             Swal.fire({
                 icon: 'warning',
                 title: 'Password Kosong',
                 text: 'Harap masukkan password Anda!',
                 confirmButtonColor: '#1e293b',
                 confirmButtonText: 'Mengerti',
                 customClass: {
                     popup: 'rounded-2xl',
                     title: 'font-poppins font-bold',
                     htmlContainer: 'font-montserrat',
                     confirmButton: 'font-poppins font-bold rounded-xl px-6 py-2.5 text-white'
                 }
             });
             return;
         }
     });

     @if ($errors->any())
         Swal.fire({
             icon: 'error',
             title: 'Akses Ditolak',
             text: '{{ $errors->first() }}',
             confirmButtonColor: '#1e293b',
             confirmButtonText: 'Coba Lagi',
             customClass: {
                 popup: 'rounded-2xl',
                 title: 'font-poppins font-bold',
                 htmlContainer: 'font-montserrat',
                 confirmButton: 'font-poppins font-bold rounded-xl px-6 py-2.5 text-white'
             }
         });
     @endif
 </script>
