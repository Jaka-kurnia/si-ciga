import { Metadata } from "next";
import Link from "lucide-react";

export const metadata: Metadata = {
  title: "Admin CMS Dashboard | SDN 1 Cigalontang",
  description: "Panel pengelola konten website SDN 1 Cigalontang (Berita, Statistik, Identitas)",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 font-inter text-slate-800 flex flex-col">
      <main className="flex-1 w-full flex flex-col">
        {children}
      </main>
    </div>
  );
}
