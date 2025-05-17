"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/lib/context/auth-context";
import { BarChart, Calendar, FileCheck, Home, LogOut, Menu, Search, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if user is admin
  const isAdmin = user?.role === "admin";
  
  // Handle logout
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  // Navigation items
  const publicNavItems = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
  ];
  
  const authNavItems = [
    { name: "Apply", href: "/apply", icon: <FileCheck className="h-4 w-4 mr-2" /> },
    { name: "Track", href: "/track", icon: <Search className="h-4 w-4 mr-2" /> },
    { name: "Appointments", href: "/appointments", icon: <Calendar className="h-4 w-4 mr-2" /> },
  ];
  
  // Determine which nav items to display
  const navItems = [...publicNavItems, ...(isAuthenticated ? authNavItems : [])];

  return (
    <nav className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 lg:px-8 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative h-10 w-10 mr-2">
              <div className="absolute inset-0 rounded-full bg-green-600"></div>
              <div className="absolute inset-[2px] rounded-full bg-red-600"></div>
            </div>
            <span className="text-lg font-semibold hidden md:block">BD e-Passport</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-green-700 flex items-center px-2 py-1 rounded-md hover:bg-gray-50 transition-colors"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <BarChart className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <BarChart className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/register">
                <Button variant="ghost" size="sm">
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700" size="sm">
                  Login
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden ml-2 p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-2 border-t pt-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          {isAuthenticated && (
            <>
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <BarChart className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </>
          )}
          {isAuthenticated && isAdmin && (
            <Link
              href="/admin"
              className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Admin Dashboard
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-700 w-full text-left"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </button>
          )}
        </div>
      )}
    </nav>
  );
} 