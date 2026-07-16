import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update bagian metadata di sini
export const metadata: Metadata = {
  title: "Kumiverse Hub - Official Community & Minecraft Server",
  description:
    "Selamat datang di pusat komunitas Kumiverse. Tempat berkumpulnya para gamers dan kreator. Jelajahi server Minecraft eksklusif kami dan bergabunglah di Discord!",
  keywords: [
    "Kumiverse",
    "Minecraft Server",
    "Discord Indonesia",
    "Gaming Community",
  ],

  // Memunculkan pratinjau saat link dikirim di Discord / WhatsApp
  openGraph: {
    title: "Kumiverse Hub",
    description:
      "Tempat hangout santai, mabar kompetitif, hingga membangun peradaban di server Minecraft eksklusif kami.",
    url: "https://web.kumiverse.my.id", // Ganti dengan domain website kamu nanti
    siteName: "Kumiverse",
    images: [
      {
        url: "/images/og-image.png", // Taruh foto banner (1200x630px) di public/images/og-image.png
        width: 1200,
        height: 630,
        alt: "Kumiverse Community Preview Banner",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // Memunculkan pratinjau di Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Kumiverse Hub",
    description:
      "Jelajahi server Minecraft eksklusif kami dan bergabunglah dalam keseruan di Discord!",
    images: ["/images/og-image.png"],
  },

  // Icon kecil di tab browser
  icons: {
    icon: "/favicon.ico", // Taruh file favicon.ico di folder public/
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
