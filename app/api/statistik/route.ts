import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/seed";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await ensureSeeded();
    const statistik = await prisma.statistik.findMany();
    return NextResponse.json({ success: true, data: statistik });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const items: { id: number; count: string; label: string }[] = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ success: false, error: "Format data tidak valid" }, { status: 400 });
    }

    const updates = await Promise.all(
      items.map((item) =>
        prisma.statistik.update({
          where: { id: item.id },
          data: { count: item.count, label: item.label },
        })
      )
    );

    return NextResponse.json({ success: true, data: updates });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Gagal memperbarui statistik" }, { status: 500 });
  }
}
