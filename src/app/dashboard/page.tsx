"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Bell,
  Calendar,
  Download,
  Eye,
  FileText,
  Plus,
  User
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";



// Mock user data
const mockUser = {
  id: "user-123",
  name: "Mohammed Rahman",
  email: "mohammed.rahman@example.com",
  phone: "+880 1712 345678",
  dateJoined: "2023-01-15T10:30:00",
};

// Mock application data
const mockApplications = [
  {
    id: "BD-1234567890",
    type: "New Passport",
    status: "submitted",
    submissionDate: "2023-08-29T14:20:00",
    lastUpdated: "2023-09-10T11:30:00",
    estimatedDelivery: "2023-10-15T00:00:00",
    progress: 60,
  },
  {
    id: "BD-9876543210",
    type: "Renewal",
    status: "payment_confirmed",
    submissionDate: "2023-09-02T09:45:00",
    lastUpdated: "2023-09-05T16:20:00",
    appointmentDate: "2023-09-15T10:30:00",
    progress: 40,
  },
  {
    id: "BD-5678901234",
    type: "New Passport",
    status: "delivered",
    submissionDate: "2023-05-10T11:15:00",
    lastUpdated: "2023-06-25T09:50:00",
    progress: 100,
  },
];

// Mock notifications
const mockNotifications = [
  {
    id: "notif-1",
    title: "Appointment Reminder",
    message: "Your biometric appointment is scheduled for tomorrow at 10:30 AM.",
    date: "2023-09-14T08:00:00",
    read: false,
  },
  {
    id: "notif-2",
    title: "Application Status Updated",
    message: "Your application BD-1234567890 has moved to Under Review.",
    date: "2023-09-10T11:30:00",
    read: true,
  },
  {
    id: "notif-3",
    title: "Payment Confirmed",
    message: "Your payment for application BD-9876543210 has been confirmed.",
    date: "2023-09-05T16:20:00",
    read: true,
  },
];



// Helper to format dates
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}



export default function DashboardPage() {
  const [currentApplications, setCurrentApplications] = useState<typeof mockApplications>([]);
  const [pastApplications, setPastApplications] = useState<typeof mockApplications>([]);
  const [notifications, setNotifications] = useState<typeof mockNotifications>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      const active = mockApplications.filter(app => app.status !== "delivered" && app.status !== "rejected");
      const past = mockApplications.filter(app => app.status === "delivered" || app.status === "rejected");
      
      setCurrentApplications(active);
      setPastApplications(past);
      setNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);
  }, []);
  

  
  // Render application card
  const renderApplicationCard = (application: typeof mockApplications[0]) => {
    return (
      <Card key={application.id} className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <h3 className="font-semibold">Application #{application.id}</h3>
                <Badge variant={getStatusVariant(application.status)}>
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">
                Submitted on {formatDate(application.submissionDate)}
              </p>
              <p className="text-sm text-gray-600">
                Current Status: {application.status.replace("_", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                View
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  // Render notification item
  const renderNotificationItem = (notification: typeof mockNotifications[0]) => {
    return (
      <div 
        key={notification.id} 
        className={`p-3 border-b last:border-b-0 ${notification.read ? '' : 'bg-blue-50'}`}
      >
        <div className="flex items-start gap-3">
          <div className={`mt-1 p-1.5 rounded-full ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}>
            <Bell className={`h-4 w-4 ${notification.read ? 'text-gray-500' : 'text-blue-500'}`} />
          </div>
          <div className="flex-1">
            <p className={`text-sm font-medium ${notification.read ? '' : 'text-blue-800'}`}>
              {notification.title}
            </p>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            <p className="text-xs text-gray-500 mt-1">{formatDate(notification.date)}</p>
          </div>
        </div>
      </div>
    );
  };
  

  
  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "processing":
      case "submitted":
        return "default";
      case "delivered":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };
  
  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-6xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600">Welcome back, {mockUser.name}</p>
      </header>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Plus className="h-4 w-4 mr-2 text-green-600" />
              Apply for Passport
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Start a new passport application or renewal.
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
              <Link href="/apply">New Application</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-blue-600" />
              Appointment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Schedule or manage your biometric appointment.
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/appointments">Manage Appointments</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-amber-600" />
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Upload and manage your application documents.
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/documents">Manage Documents</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <User className="h-4 w-4 mr-2 text-purple-600" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-500">
            Update your personal information and preferences.
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/profile">My Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Main Content Tabs */}
      <Tabs defaultValue="applications" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="applications">
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-4">Active Applications</h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2].map((_, i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-5 w-40" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-3" />
                      <Skeleton className="h-20 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : currentApplications.length > 0 ? (
              <div>
                {currentApplications.map(renderApplicationCard)}
              </div>
            ) : (
              <Alert>
                <AlertDescription>
                  You don&apos;t have any active applications. 
                  <Link href="/apply" className="text-green-600 ml-1 font-medium">
                    Start a new application
                  </Link>
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          {!isLoading && pastApplications.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">Past Applications</h2>
              {pastApplications.map(renderApplicationCard)}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Recent Notifications</h2>
              <Button variant="outline" size="sm">
                Mark All as Read
              </Button>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="py-4">
                      <div className="flex gap-4">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-40 mb-2" />
                          <Skeleton className="h-3 w-full" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : notifications.length > 0 ? (
              <Card>
                <div className="divide-y">
                  {notifications.map(renderNotificationItem)}
                </div>
                <CardFooter className="justify-center py-4">
                  <Button variant="link" size="sm">
                    View All Notifications
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Alert>
                <AlertDescription>
                  You don&apos;t have any notifications.
                </AlertDescription>
              </Alert>
            )}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to receive notifications about your applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive updates via email to {mockUser.email}
                    </p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                    <span className="absolute inset-y-0 right-1 flex h-4 w-4 translate-x-0 items-center justify-center rounded-full bg-white transition"></span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive updates via SMS to {mockUser.phone}
                    </p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                    <span className="absolute inset-y-0 right-1 flex h-4 w-4 translate-x-0 items-center justify-center rounded-full bg-white transition"></span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                    <span className="absolute inset-y-0 left-1 flex h-4 w-4 translate-x-0 items-center justify-center rounded-full bg-white transition"></span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="ml-auto">
                Update Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* User Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Your personal details used for passport applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-sm">{mockUser.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Email Address</p>
              <p className="text-sm">{mockUser.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Phone Number</p>
              <p className="text-sm">{mockUser.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Member Since</p>
              <p className="text-sm">{formatDate(mockUser.dateJoined)}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" asChild>
            <Link href="/profile">
              Update Information
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 