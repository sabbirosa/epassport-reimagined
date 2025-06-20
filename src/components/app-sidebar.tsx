"use client";

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
import * as React from "react";

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
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/context/auth-context";
import Image from "next/image";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="p-4 border-b bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
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
                    User Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarMenu>
          {sidebarItems.map((item) => {
            // Check if the current path starts with the menu item's href
            // This handles active state for nested routes
            const isActive =
              pathname === item.href ||
              (pathname?.startsWith(item.href) && item.href !== "/dashboard") ||
              (item.href === "/dashboard" && pathname === "/dashboard");

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
            <AvatarImage
              src="/placeholder-avatar.jpg"
              alt={user?.name || "User"}
            />
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

      <SidebarRail />
    </Sidebar>
  );
}
