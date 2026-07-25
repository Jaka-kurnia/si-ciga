import { NextResponse } from "next/server";
import { ensureSeeded } from "@/lib/seed";

export async function GET() {
  try {
    await ensureSeeded();
    return NextResponse.json({ success: true, message: "Inisialisasi & seeding MySQL berhasil dilakukan!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Gagal inisialisasi MySQL" }, { status: 500 });
  }
}
