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
import { Calendar, FileCheck, Home, LogOut, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo purposes

  // For demo, toggle login status
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const navItems = [
    { name: "Home", href: "/", icon: <Home className="h-4 w-4 mr-2" /> },
    { name: "Apply", href: "/apply", icon: <FileCheck className="h-4 w-4 mr-2" /> },
    { name: "Appointments", href: "/appointments", icon: <Calendar className="h-4 w-4 mr-2" /> },
  ];

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
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>BD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleLogin}>
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
                <Button className="bg-green-600 hover:bg-green-700" size="sm" onClick={toggleLogin}>
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
        </div>
      )}
    </nav>
  );
} 