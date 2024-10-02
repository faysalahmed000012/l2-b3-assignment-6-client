import { Footer } from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import StoreProvider from "@/redux/StoreProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Crunch Social",
  description: "Recipe Sharing Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-orange-50 to-white`}
      >
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
