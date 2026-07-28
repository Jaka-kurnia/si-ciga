import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // @ts-ignore
    const profil = await prisma.profil.findMany();
    return NextResponse.json({ success: true, data: profil });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { key, content } = body;
    // @ts-ignore
    const upserted = await prisma.profil.upsert({
      where: { key },
      update: { content },
      create: { key, content },
    });
    return NextResponse.json({ success: true, data: upserted });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
