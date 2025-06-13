"use client";

import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/auth/protected-route";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen">
        <SidebarProvider 
          defaultOpen
          style={
            {
              "--sidebar-width": "16rem",
              "--header-height": "4rem",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 px-4 border-b bg-white">
              <SidebarTrigger className="-ml-1" />
              <div className="flex items-center gap-2 text-sm font-medium">
                <span>Dashboard</span>
              </div>
            </header>
            <div className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <div className="px-4 lg:px-6">
                    <div className="mx-auto max-w-5xl">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
} 