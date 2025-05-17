import { ApplicationProvider } from "@/lib/context/application-context";
import { AuthProvider } from "@/lib/context/auth-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./client-layout";
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
  title: "Bangladesh e-Passport Application System",
  description: "Apply for and track your Bangladesh e-Passport application",
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
        <AuthProvider>
          <ApplicationProvider>
            <ClientLayout>
              {children}
            </ClientLayout>
          </ApplicationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
