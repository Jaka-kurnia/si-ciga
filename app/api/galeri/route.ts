import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Ambil semua galeri
export async function GET() {
  try {
    const galeri = await prisma.galeri.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: galeri });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal mengambil data galeri" }, { status: 500 });
  }
}

// POST - Tambah foto galeri
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image } = body;
    if (!image) {
      return NextResponse.json({ success: false, error: "Image URL harus diisi" }, { status: 400 });
    }
    const result = await prisma.galeri.create({
      data: { image },
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal menambah foto galeri" }, { status: 500 });
  }
}

// DELETE - Hapus foto galeri
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (id) {
      // DELETE by URL query param (e.g. /api/galeri?id=1)
      await prisma.galeri.delete({
        where: { id: Number(id) }
      });
      return NextResponse.json({ success: true, message: "Foto galeri dihapus" });
    }

    // fallback to JSON body if not in query param
    const body = await req.json();
    if (!body.id) {
       return NextResponse.json({ success: false, error: "ID dibutuhkan" }, { status: 400 });
    }

    await prisma.galeri.delete({
      where: { id: Number(body.id) },
    });
    return NextResponse.json({ success: true, message: "Foto galeri dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal menghapus foto galeri" }, { status: 500 });
  }
}
