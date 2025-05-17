"use client";

import ProtectedRoute from "@/components/auth/protected-route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/context/auth-context";
import {
    BarChart,
    Calendar,
    Clock,
    FileCheck,
    FileText,
    HelpCircle,
    LogOut,
    Settings,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: BarChart,
    href: "/dashboard",
  },
  {
    title: "Applications",
    icon: FileText,
    href: "/dashboard/applications",
  },
  {
    title: "My Documents",
    icon: FileCheck,
    href: "/dashboard/documents",
  },
  {
    title: "Status Tracking",
    icon: Clock,
    href: "/dashboard/track",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/dashboard/appointments",
  },
  {
    title: "Profile",
    icon: User,
    href: "/dashboard/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/dashboard/help",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen">
        <SidebarProvider defaultOpen>
          <div className="flex h-screen overflow-hidden">
            <Sidebar className="border-r">
              <SidebarHeader className="p-4 border-b bg-white">
                <div className="flex items-center space-x-2">
                  <div className="relative h-8 w-8">
                    <div className="absolute inset-0 rounded-full bg-green-600"></div>
                    <div className="absolute inset-[2px] rounded-full bg-red-600"></div>
                  </div>
                  <div className="font-semibold text-lg">BD e-Passport</div>
                </div>
                <div className="text-sm text-muted-foreground">User Dashboard</div>
                <SidebarTrigger className="absolute top-4 right-2" />
              </SidebarHeader>

              <SidebarContent className="bg-white">
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    // Check if the current path starts with the menu item's href
                    // This handles active state for nested routes
                    const isActive = 
                      pathname === item.href || 
                      (pathname?.startsWith(item.href) && item.href !== '/dashboard') ||
                      (item.href === '/dashboard' && pathname === '/dashboard');
                    
                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <Link href={item.href} className="flex items-center w-full">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarContent>

              <SidebarFooter className="p-4 border-t bg-white">
                <div className="flex items-center space-x-2 mb-4">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold">{user?.name}</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </SidebarFooter>
            </Sidebar>

            <div className="flex-1 overflow-auto flex flex-col">
              <div className="flex-1 p-6">
                <div className="mx-auto max-w-5xl">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
} 