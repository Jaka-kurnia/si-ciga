import { prisma } from "./db";

export async function ensureSeeded() {
  try {
    // 1. Seed Statistik
    const countStat = await prisma.statistik.count();
    if (countStat === 0) {
      const defaultStats = [
        { label: "Ruang Kelas", count: "6", iconName: "LayoutDashboard" },
        { label: "Guru & Staf", count: "7", iconName: "GraduationCap" },
        { label: "Siswa", count: "87", iconName: "User" },
        { label: "Siswi", count: "47", iconName: "UserCircle" },
        { label: "Prestasi", count: "45+", iconName: "Trophy" },
      ];
      for (const item of defaultStats) {
        await prisma.statistik.create({ data: item });
      }
      console.log("Seeded Statistik to MySQL");
    }

    // 2. Seed Identitas
    const countId = await prisma.identitas.count();
    if (countId === 0) {
      const defaultIdentitas = [
        { key: "akreditasi", label: "Akreditasi", value: "B" },
        { key: "status", label: "Status Sekolah", value: "Negeri" },
        { key: "npsn", label: "NPSN", value: "20262428" },
        { key: "pendidikan", label: "Bentuk Pendidikan", value: "SD" },
        { key: "telepon", label: "Telepon", value: "085322363039" },
        { key: "email", label: "Email", value: "iwakartiwa52@gmail.com" },
      ];
      for (const item of defaultIdentitas) {
        await prisma.identitas.create({ data: item });
      }
      console.log("Seeded Identitas to MySQL");
    }

    // 3. Seed Berita
    const countBerita = await prisma.berita.count();
    if (countBerita === 0) {
      const defaultBerita = [
        {
          title: "Pembiasaan Shalat Dhuha & Doa Bersama Pagi",
          date: "24 Juli 2026",
          category: "Kegiatan Religius",
          image: "/fotoBerita/solatduha.jpeg",
          excerpt: "Kegiatan rutin setiap pagi sebelum pembelajaran dimulai guna menanamkan nilai-nilai karakter religius dan akhlak mulia kepada para siswa."
        },
        {
          title: "Upacara Bendera Hari Senin di Lapangan Sekolah",
          date: "21 Juli 2026",
          category: "Kedisiplinan",
          image: "/fotoBerita/upacar.jpeg",
          excerpt: "Membentuk jiwa kepemimpinan, kedisiplinan, serta rasa cinta tanah air (Nasionalisme) seluruh warga sekolah di lapangan SDN 1 Cigalontang."
        },
        {
          title: "Kegiatan & Koordinasi Dewan Guru",
          date: "18 Juli 2026",
          category: "Akademik & Staf",
          image: "/fotoBerita/guru.jpeg",
          excerpt: "Upaya peningkatan kompetensi pedagogik serta profesionalisme pendidik guna memberikan layanan pembelajaran yang aman, nyaman, dan bermakna."
        },
        {
          title: "Rapat Koordinasi Sekolah & Wali Murid",
          date: "15 Juli 2026",
          category: "Komite Sekolah",
          image: "/fotoBerita/rapat.jpeg",
          excerpt: "Membangun sinergi kolaboratif yang solid antara pihak sekolah, dewan guru, dan orang tua/wali murid untuk mendukung kemajuan siswa."
        },
        {
          title: "Semangat Kebersamaan Saat Upacara Pagi",
          date: "10 Juli 2026",
          category: "Kedisiplinan",
          image: "/fotoBerita/upacara1.jpeg",
          excerpt: "Antusiasme dan ketertiban seluruh peserta didik dalam mengikuti rangkaian khidmat upacara bendera dan penyampaian amanat pembina."
        },
        {
          title: "Pembentukan Karakter Pelajar Pancasila",
          date: "5 Juli 2026",
          category: "Kegiatan Siswa",
          image: "/fotoBerita/upacara2.jpeg",
          excerpt: "Implementasi nyata profil pelajar Pancasila melalui kegiatan kebersamaan dan kedisiplinan di lingkungan sekolah SDN 1 Cigalontang."
        }
      ];
      for (const item of defaultBerita) {
        await prisma.berita.create({ data: item });
      }
      console.log("Seeded Berita to MySQL");
    }

    // 4. Seed Prestasi
    const countPrestasi = await prisma.prestasi.count();
    if (countPrestasi === 0) {
      await prisma.prestasi.create({
        data: {
          title: "Juara 1 Bola Voli Putra (O2SN)",
          category: "Olahraga / O2SN 2026",
          message: "Keluarga besar SDN 1 Cigalontang mengucapkan selamat dan sukses kepada Ananda yang telah meraih Juara 1 Bola Voli Putra pada Olimpiade Olahraga Siswa Nasional (O2SN) Tingkat Kecamatan Cigalontang Tahun 2026:",
          students: JSON.stringify(["AYANDI", "DAFA ARSADIL PRATAMA", "RAFI FAUZAN", "RAIHAN", "REHAN HERDIAN"]),
          quote: "Semoga prestasi ini menjadi motivasi untuk terus berkembang, berprestasi, dan meraih keberhasilan yang lebih tinggi di masa mendatang.",
          footer: "SDN 1 Cigalontang terus berkomitmen dalam membentuk murid yang berakhlak mulia, mandiri, kreatif, dan berjiwa Pancasila melalui pembelajaran yang aman, nyaman, dan menyenangkan."
        }
      });
      console.log("Seeded Prestasi to MySQL");
    }
  } catch (error) {
    console.error("Error ensuring MySQL database seeding:", error);
  }
}
