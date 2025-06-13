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
  Bell,
  Calendar,
  FileText,
  HelpCircle,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: BarChart,
    href: "/admin/dashboard",
  },
  {
    title: "Applications",
    icon: FileText,
    href: "/admin/applications",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/admin/appointments",
  },
  {
    title: "Notifications",
    icon: Bell,
    href: "/admin/notifications",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/admin/help",
  },
];

export default function AdminLayout({
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
    <ProtectedRoute adminOnly>
      <div className="bg-gray-50 min-h-screen">
        <SidebarProvider defaultOpen>
          <div className="flex h-screen overflow-hidden">
            <Sidebar className="border-r">
              <SidebarHeader className="p-4 border-b bg-white">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-2 h-10"
                >
                  <Image
                    src="/e-passport-logo-right-sm.png"
                    alt="BD e-Passport Logo"
                    width={40}
                    height={40}
                    className="h-10 w-10 mr-2"
                  />
                  <div>
                    <span className="text-lg font-semibold hidden md:block">
                      E-Passport
                    </span>
                    <span className="text-sm font-semibold text-green-700">
                      Admin Dashboard
                    </span>
                  </div>
                </Link>
                <SidebarTrigger className="absolute top-4 right-2" />
              </SidebarHeader>

              <SidebarContent className="bg-white">
                <SidebarMenu>
                  {sidebarItems.map((item) => {
                    // Check if the current path starts with the menu item's href
                    // This handles active state for nested routes
                    const isActive =
                      pathname === item.href ||
                      (pathname?.startsWith(item.href) &&
                        item.href !== "/admin") ||
                      (item.href === "/admin/dashboard" &&
                        pathname === "/admin");

                    return (
                      <SidebarMenuItem key={item.href}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={item.title}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center w-full"
                          >
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
                  <Avatar className="h-9 w-9 bg-green-100 text-green-700">
                    <AvatarImage
                      src="/placeholder-avatar.jpg"
                      alt={user?.name || "Admin"}
                    />
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold">
                      {user?.name || "Admin User"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {user?.email || "admin@example.com"}
                    </div>
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
                <div className="mx-auto max-w-full">{children}</div>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </ProtectedRoute>
  );
}
