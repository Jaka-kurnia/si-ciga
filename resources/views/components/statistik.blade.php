<div class="bg-[#f5f7fb] w-full px-4 sm:px-6 lg:px-8 pb-12 pt-8 md:pt-0">
    <div class="max-w-7xl mx-auto md:-mt-16 relative z-20">
        <div class="bg-white rounded-3xl p-5 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-12"
            data-aos="fade-up" data-aos-delay="200">
            @foreach ($statistik as $index => $stat)
                <div
                    class="flex flex-col items-center flex-1 min-w-[7.5rem] p-2 sm:p-0 group {{ $index === 4 ? 'col-span-2 sm:col-span-1' : '' }}">
                    <div
                        class="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-[#2563eb] to-[#60a5fa] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-md transform group-hover:-translate-y-2 group-hover:shadow-lg transition-all duration-300">
                        <i data-lucide="{{ $stat->iconName }}" class="w-7 h-7 text-white"></i>
                    </div>
                    <h3 class="text-2xl sm:text-3xl font-poppins font-bold text-navy">{{ $stat->count }}</h3>
                    <p class="font-montserrat text-gray-500 text-xs sm:text-base font-medium mt-1 text-center">
                        {{ $stat->label }}</p>
                </div>
            @endforeach
        </div>
    </div>
</div>
