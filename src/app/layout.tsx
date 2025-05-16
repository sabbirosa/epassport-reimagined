import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ApplicationProvider } from "@/lib/context/application-context";
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

export const metadata: Metadata = {
  title: "Bangladesh e-Passport Portal",
  description: "Official portal for Bangladesh e-Passport application and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ApplicationProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ApplicationProvider>
      </body>
    </html>
  );
}
