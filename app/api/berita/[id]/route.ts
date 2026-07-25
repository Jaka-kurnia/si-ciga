import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);
    const body = await request.json();
    const { title, date, category, image, excerpt } = body;

    const updated = await prisma.berita.update({
      where: { id },
      data: {
        title,
        date,
        category,
        image,
        excerpt,
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Gagal memperbarui berita" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);

    await prisma.berita.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Berita berhasil dihapus" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Gagal menghapus berita" }, { status: 500 });
  }
}
