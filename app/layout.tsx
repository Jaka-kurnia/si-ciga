import type { Metadata } from "next";
import { Inter, Roboto, Poppins, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SDN 1 CIGALONTANG",
  description: "Website Resmi SD Negeri 1 Cigalontang. Institusi pendidikan dasar yang berkomitmen membangun generasi unggul, berkarakter mulia, dan berprestasi di Cigalontang, Tasikmalaya.",
  keywords: [
    "SDN 1 Cigalontang", 
    "SD Negeri 1 Cigalontang", 
    "Sekolah Dasar Cigalontang", 
    "Sekolah Dasar Tasikmalaya", 
    "Pendidikan Dasar", 
    "SD Terbaik Cigalontang",
    "Website Sekolah SDN 1 Cigalontang"
  ],
  authors: [{ name: "SDN 1 Cigalontang" }],
  creator: "SDN 1 Cigalontang",
  publisher: "SDN 1 Cigalontang",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo/logo.png",
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },
  openGraph: {
    title: "SDN 1 CIGALONTANG",
    description: "Website Resmi SD Negeri 1 Cigalontang - Membangun Generasi Unggul dan Berkarakter.",
    url: "https://sdn1cigalontang.sch.id",
    siteName: "SDN 1 Cigalontang",
    images: [
      {
        url: "/logo/logo.png",
        width: 800,
        height: 800,
        alt: "Logo SDN 1 Cigalontang",
      }
    ],
    locale: "id_ID",
    type: "website",
  },
};

import AOSInit from "@/components/AOSInit";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${roboto.variable} ${poppins.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AOSInit />
        {children}
      </body>
    </html>
  );
}
