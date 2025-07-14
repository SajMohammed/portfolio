import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
// import Aurora from "@/components/Background";
import { Navbar } from "@/components/ui/navbar";
import FooterSection from "@/components/sections/FooterSection";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SajMo",
  description: "Saj Mohammed's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} antialiased relative flex flex-col items-center justify-center overflow-x-hidden min-h-screen`}
      >
        {/* <div className="fixed inset-0 z-0">
          <Aurora />
        </div> */}
        <Navbar />
        <div className="relative z-10 w-full max-w-screen-2xl mx-auto overflow-visible flex-grow">
          {children}
        </div>
        <FooterSection />
      </body>
    </html>
  );
}
