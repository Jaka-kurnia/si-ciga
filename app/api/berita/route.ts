import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/seed";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await ensureSeeded();
    const berita = await prisma.berita.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json({ success: true, data: berita });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date, category, image, excerpt } = body;
    
    if (!title || !excerpt) {
      return NextResponse.json({ success: false, error: "Judul dan deskripsi berita wajib diisi" }, { status: 400 });
    }

    const newBerita = await prisma.berita.create({
      data: {
        title,
        date: date || new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
        category: category || "Kegiatan Sekolah",
        image: image || "/fotoSekolah/foto2.jpg",
        excerpt,
      },
    });

    return NextResponse.json({ success: true, data: newBerita });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Internal server error" }, { status: 500 });
  }
}
