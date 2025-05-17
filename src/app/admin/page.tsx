"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart, Calendar, FileText, Settings, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminHome() {
  const router = useRouter();
  
  // Admin dashboard cards
  const adminCards = [
    {
      title: "System Dashboard",
      description: "View server performance metrics and system health",
      icon: BarChart,
      color: "bg-blue-100 text-blue-700",
      href: "/admin/dashboard",
    },
    {
      title: "Application Management",
      description: "Process passport applications and manage the queue",
      icon: FileText,
      color: "bg-amber-100 text-amber-700",
      href: "/admin/applications",
    },
    {
      title: "User Management",
      description: "Manage user accounts and permissions",
      icon: Users,
      color: "bg-green-100 text-green-700",
      href: "/admin/users",
    },
    {
      title: "Appointment Scheduling",
      description: "Manage biometric appointment slots and schedules",
      icon: Calendar,
      color: "bg-purple-100 text-purple-700",
      href: "/admin/appointments",
    },
    {
      title: "System Settings",
      description: "Configure system parameters and preferences",
      icon: Settings,
      color: "bg-gray-100 text-gray-700",
      href: "/admin/settings",
    },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Control Panel</h1>
        <p className="text-gray-500">Manage the e-Passport application system</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminCards.map((card) => (
          <Card key={card.title} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-2`}>
                <card.icon className="h-6 w-6" />
              </div>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button 
                variant="ghost" 
                onClick={() => router.push(card.href)}
                className="w-full justify-between"
              >
                View
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mt-8">
        <h2 className="text-lg font-medium text-green-800 mb-2">Administrator Help</h2>
        <p className="text-green-700 mb-4">
          Need assistance with the admin controls? Check the administrator guide or contact technical support.
        </p>
        <div className="flex space-x-4">
          <Button variant="outline" className="bg-white border-green-200 text-green-700 hover:bg-green-50">
            View Admin Guide
          </Button>
          <Button variant="outline" className="bg-white border-green-200 text-green-700 hover:bg-green-50">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
} 