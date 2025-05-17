"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Don't show navbar and footer on dashboard or admin pages
  const isDashboardOrAdmin = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin');

  return (
    <>
      {!isDashboardOrAdmin && <Navbar />}
      <main className={`flex-grow ${!isDashboardOrAdmin ? 'pt-0' : ''}`}>
        {children}
      </main>
      {!isDashboardOrAdmin && <Footer />}
    </>
  );
} 