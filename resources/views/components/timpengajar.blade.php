@php
    $headMaster = $pengajar->firstWhere('isHeadmaster', true);
    $staffList = $pengajar->where('isHeadmaster', false);
@endphp

<section id="tim" class="py-20 bg-[#f8fafc] relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <!-- Header Section -->
        <div class="text-center mb-16" data-aos="fade-up">
            <h2 class="text-3xl font-poppins font-bold text-navy">Struktur Tim Pengajar</h2>
            <div class="w-24 h-1 bg-gold mx-auto mt-4 rounded-full"></div>
        </div>

        <!-- TIER 1: Pimpinan (Rata Tengah) -->
        @if ($headMaster)
            <div class="flex justify-center mb-12 sm:mb-16 relative" data-aos="fade-down" data-aos-delay="100">
                <div
                    class="w-full sm:w-[26.25rem] bg-white rounded-3xl p-6 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col items-center text-center relative mt-12 z-20 hover:-translate-y-1 transition-transform duration-300">
                    <!-- Foto Profil Pimpinan -->
                    <div
                        class="absolute -top-12 w-24 h-24 bg-gray-100 rounded-full border-4 border-white shadow-md overflow-hidden">
                        @php
                            $headImageUrl =
                                $headMaster->image ??
                                'https://ui-avatars.com/api/?name=' .
                                    urlencode($headMaster->name) .
                                    '&background=0D2B5E&color=E8A020&size=256&font-size=0.33';
                        @endphp
                        <img src="{{ $headImageUrl }}" alt="{{ $headMaster->name }}"
                            class="w-full h-full object-cover" />
                    </div>

                    <div class="pt-12 w-full">
                        <h3 class="font-poppins font-bold text-navy text-lg sm:text-xl mb-1">{{ $headMaster->name }}
                        </h3>
                        <p class="text-gold font-bold text-xs uppercase tracking-widest mb-1">{{ $headMaster->jabatan }}
                        </p>
                        <p class="text-gray-400 font-montserrat text-xs mb-6">NIP. {{ $headMaster->nip }}</p>

                        <div
                            class="bg-navy/5 rounded-2xl p-4 text-sm font-montserrat border border-navy/5 text-left flex flex-col gap-3">
                            <div>
                                <span class="block text-[10px] font-bold text-gray-500 uppercase tracking-wide">Tugas
                                    Membimbing</span>
                                <span
                                    class="font-semibold text-navy text-sm leading-tight">{{ $headMaster->penugasan }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Garis Penghubung (Hanya muncul di Desktop) -->
                <div class="hidden lg:block absolute left-1/2 -ml-px top-full w-0.5 h-12 bg-gray-200 z-10"></div>
            </div>
        @endif

        <!-- TIER 2: Anggota Staf (Flex Wrap: Baris otomatis center) -->
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-14 lg:gap-y-16 mt-16 lg:mt-8">
            @foreach ($staffList as $index => $staff)
                <div data-aos="fade-up" data-aos-delay="{{ 200 + $index * 100 }}"
                    class="w-full sm:w-[calc(50%-1rem)] lg:w-[17.5rem] xl:w-[18.75rem] bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center text-center relative transition-all duration-300 group">
                    <!-- Foto Profil Anggota -->
                    <div
                        class="absolute -top-10 w-20 h-20 bg-gray-100 rounded-full border-4 border-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        @php
                            $staffImageUrl =
                                $staff->image ??
                                'https://ui-avatars.com/api/?name=' .
                                    urlencode($staff->name) .
                                    '&background=f1f5f9&color=0D2B5E&size=256&font-size=0.33';
                        @endphp
                        <img src="{{ $staffImageUrl }}" alt="{{ $staff->name }}" class="w-full h-full object-cover" />
                    </div>

                    <div class="pt-10 w-full flex flex-col h-full">
                        <h4
                            class="font-poppins font-bold text-navy text-sm sm:text-base leading-snug mb-1 group-hover:text-gold transition-colors">
                            {{ $staff->name }}</h4>
                        <p class="text-gray-400 font-montserrat text-[11px] sm:text-xs mb-5">
                            {{ $staff->nip !== '-' ? 'NIP. ' . $staff->nip : 'Guru Pendamping' }}
                        </p>

                        <div
                            class="bg-gray-50 rounded-xl p-3 text-left border border-gray-100 mt-auto flex flex-col justify-between gap-2 h-full">
                            <div>
                                <span class="block text-[9px] font-bold text-gold uppercase tracking-wider">Tugas
                                    Membimbing</span>
                                <span
                                    class="text-[13px] font-medium text-gray-700 leading-tight">{{ $staff->penugasan }}</span>
                            </div>
                            <div>
                                <span class="block text-[9px] font-bold text-gold uppercase tracking-wider">Sasaran
                                    Kelas</span>
                                <span class="text-[13px] font-medium text-gray-700">{{ $staff->sasaran }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
