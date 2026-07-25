import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/seed";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    await ensureSeeded();
    const identitas = await prisma.identitas.findMany();
    return NextResponse.json({ success: true, data: identitas });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const items: { id: number; value: string; label?: string }[] = body;

    if (!Array.isArray(items)) {
      return NextResponse.json({ success: false, error: "Format data tidak valid" }, { status: 400 });
    }

    const updates = await Promise.all(
      items.map((item) =>
        prisma.identitas.update({
          where: { id: item.id },
          data: { value: item.value, ...(item.label ? { label: item.label } : {}) },
        })
      )
    );

    return NextResponse.json({ success: true, data: updates });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Gagal memperbarui identitas" }, { status: 500 });
  }
}
