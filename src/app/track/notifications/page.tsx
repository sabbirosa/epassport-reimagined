"use client";

import { NotificationPreferencesForm } from "@/components/track/notification-preferences";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Info } from "lucide-react";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Application Notifications</h1>
          <Link href="/track">
            <Button variant="outline" size="sm">
              Back to Tracking
            </Button>
          </Link>
        </div>
        <p className="text-gray-600 max-w-xl">
          Manage how you receive updates about your passport application status
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-8 flex items-start gap-2">
        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        <div className="text-sm text-blue-800">
          <p className="font-medium mb-1">Why set up notifications?</p>
          <p>
            Stay informed about your application status without having to check the portal. 
            You&apos;ll receive updates when your application status changes or when action is required.
          </p>
        </div>
      </div>

      <Tabs defaultValue="settings" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          <TabsTrigger value="history">Notification History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings">
          <NotificationPreferencesForm />
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification History
              </CardTitle>
              <CardDescription>
                Recent notifications sent to you about your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Demo notification history */}
                {[
                  {
                    id: 1,
                    date: "2023-11-15",
                    title: "Application Submitted",
                    message: "Your e-Passport application BD-1234567890 has been submitted successfully.",
                    channel: "email",
                  },
                  {
                    id: 2,
                    date: "2023-11-15",
                    title: "Payment Confirmed",
                    message: "Payment for your e-Passport application BD-1234567890 has been confirmed.",
                    channel: "sms",
                  },
                  {
                    id: 3,
                    date: "2023-11-18",
                    title: "Appointment Scheduled",
                    message: "Your biometric appointment has been scheduled for November 25, 2023.",
                    channel: "email",
                  },
                ].map((notification) => (
                  <div
                    key={notification.id}
                    className="border rounded-md p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-gray-500">
                        {new Date(notification.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <div className="mt-2 text-xs">
                      <span className="inline-block px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {notification.channel === "email" ? "Email" : "SMS"}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Empty state if no history */}
                {false && (
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No notifications have been sent yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 