import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // @ts-ignore
    const data = await prisma.pengajar.findMany({
      orderBy: [
        { isHeadmaster: 'desc' },
        { order: 'asc' },
        { id: 'asc' }
      ]
    });
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, nip, jabatan, penugasan, sasaran, image, isHeadmaster, order } = body;
    // @ts-ignore
    const newItem = await prisma.pengajar.create({
      data: { name, nip, jabatan, penugasan, sasaran, image, isHeadmaster, order: order || 0 },
    });
    return NextResponse.json({ success: true, data: newItem });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, nip, jabatan, penugasan, sasaran, image, isHeadmaster, order } = body;
    // @ts-ignore
    const updated = await prisma.pengajar.update({
      where: { id },
      data: { name, nip, jabatan, penugasan, sasaran, image, isHeadmaster, order },
    });
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ success: false, error: "ID missing" }, { status: 400 });
    
    // @ts-ignore
    await prisma.pengajar.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
