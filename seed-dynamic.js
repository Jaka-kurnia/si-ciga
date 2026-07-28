const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Profil...");
  await prisma.profil.upsert({
    where: { key: 'paragraf1' },
    update: {},
    create: { key: 'paragraf1', content: 'SD Negeri 1 Cigalontang adalah institusi pendidikan dasar yang berkomitmen memberikan pelayanan pendidikan terbaik bagi masyarakat. Kami berdiri dengan dedikasi untuk membina karakter dan potensi setiap siswa.' }
  });
  await prisma.profil.upsert({
    where: { key: 'paragraf2' },
    update: {},
    create: { key: 'paragraf2', content: 'Dengan lingkungan belajar yang kondusif dan tenaga pendidik yang profesional, kami siap mengantarkan putra-putri Anda menuju gerbang kesuksesan di masa depan, berlandaskan nilai-nilai luhur dan integritas tinggi.' }
  });
  await prisma.profil.upsert({
    where: { key: 'image' },
    update: {},
    create: { key: 'image', content: '/fotoSekolah/foto2.jpg' }
  });

  console.log("Seeding Visi Misi...");
  const visiCount = await prisma.visiMisi.count({ where: { type: 'visi' } });
  if (visiCount === 0) {
    await prisma.visiMisi.create({
      data: { type: 'visi', content: '“Meretas upaya mewujudkan peserta didik unggul berbasis nilai-nilai karakter pada tahun 2030”', order: 0 }
    });
    
    const misi = [
      "Meningkatkan disiplin dan kinerja pendidik dan tenaga kependidikan sesuai dengan tupoksi.",
      "Peningkatan kualitas pembelajaran untuk mengembangkan potensi yang dimiliki peserta didik.",
      "Menata lingkungan sekolah sebagai lingkungan pembelajaran.",
      "Penanaman nilai-nilai karakter sebagai basis yang mendukung keunggulan."
    ];
    for (let i = 0; i < misi.length; i++) {
      await prisma.visiMisi.create({
        data: { type: 'misi', content: misi[i], order: i }
      });
    }
  }

  console.log("Seeding Pengajar...");
  const pengajarCount = await prisma.pengajar.count();
  if (pengajarCount === 0) {
    await prisma.pengajar.create({
      data: {
        name: "AJAT SUDRAJAT, S.Pd., M.M.",
        jabatan: "Guru Pembina Utama Muda",
        nip: "197005061991031003",
        penugasan: "Pembimbing Guru Dalam PBM",
        sasaran: "1 Orang Guru",
        isHeadmaster: true,
        order: 0
      }
    });

    const staffList = [
      { name: "WINA OKTARI DEWI", nip: "199510062022212003", penugasan: "Pembina Pramuka Siaga Putri", sasaran: "Kls I-III" },
      { name: "IWA KARTIWA, S.Pd.", nip: "198607142023211009", penugasan: "Pembina Kesenian", sasaran: "Kls I-VI" },
      { name: "ECIN NURJANAH, S.Pd.", nip: "198409012024212012", penugasan: "Keagamaan & BTQ", sasaran: "Kls I-VI" },
      { name: "FITRI LISTIANI, S.Pd.", nip: "199604042024212057", penugasan: "Pembina Pramuka Penggalang Putri", sasaran: "Kls IV-VI" },
      { name: "OGIYANA, S.Pd.", nip: "-", penugasan: "Pramuka Penggalang Putra & Olahraga", sasaran: "Kls I-VI" },
      { name: "RESI RITADEWI, S.Pd.", nip: "-", penugasan: "Pembina Perpustakaan", sasaran: "Kls I-VI" },
      { name: "DODI IRMAWAN, S.Pd.", nip: "-", penugasan: "Pembina Pramuka Siaga Putra", sasaran: "Kls I-III" }
    ];

    for (let i = 0; i < staffList.length; i++) {
      const s = staffList[i];
      await prisma.pengajar.create({
        data: {
          name: s.name,
          nip: s.nip,
          jabatan: "Guru",
          penugasan: s.penugasan,
          sasaran: s.sasaran,
          isHeadmaster: false,
          order: i + 1
        }
      });
    }
  }
}

main().then(() => console.log("Seeding complete.")).catch(e => console.error(e));
