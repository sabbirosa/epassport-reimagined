"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, Check, CheckCircle2, Clock, Package, Search, Truck, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    ApplicationStatus,
    ApplicationTrackingData,
    getNextSteps,
    getStatusDescription,
    trackApplication
} from "@/lib/services/track-service";

// Schema for application ID validation
const trackingSchema = z.object({
  applicationId: z
    .string()
    .min(10, { message: "Application ID must be at least 10 characters" })
    .regex(/^BD-\d+$/, {
      message: "Application ID must be in the format BD-XXXXXXXXXX",
    }),
});

type TrackingFormValues = z.infer<typeof trackingSchema>;

export default function TrackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationTrackingData | null>(null);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isSendingNotification, setIsSendingNotification] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const form = useForm<TrackingFormValues>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      applicationId: "",
    },
  });

  // Track an application
  const trackApplicationById = async (id: string) => {
    setIsLoading(true);
    setNotFound(false);
    
    try {
      const result = await trackApplication(id);
      
      if (result) {
        setApplicationData(result);
        setApplicationId(id);
      } else {
        setApplicationData(null);
        setApplicationId(id);
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error tracking application:", error);
      setNotFound(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-fill and search for application ID from URL query parameter
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
    if (idFromUrl && idFromUrl.match(/^BD-\d+$/)) {
      form.setValue('applicationId', idFromUrl);
      trackApplicationById(idFromUrl);
    }
  }, [searchParams, form]);

  function onSubmit(data: TrackingFormValues) {
    trackApplicationById(data.applicationId);
  }

  // Send a test notification for the current application
  const sendTestNotification = async () => {
    if (!applicationId) return;
    
    setIsSendingNotification(true);
    setNotificationSent(false);
    
    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationId,
          channels: ['email', 'sms'],
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send notification');
      }
      
      setNotificationSent(true);
      
      // Reset notification sent status after 5 seconds
      setTimeout(() => {
        setNotificationSent(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending notification:', error);
    } finally {
      setIsSendingNotification(false);
    }
  };

  // Helper function to render status badge
  const renderStatusBadge = (status: ApplicationStatus) => {
    const statusConfig = {
      draft: { bg: "bg-gray-100", text: "text-gray-800", label: "Draft" },
      submitted: { bg: "bg-blue-100", text: "text-blue-800", label: "Submitted" },
      processing: { bg: "bg-purple-100", text: "text-purple-800", label: "Processing" },
      payment_pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Payment Pending" },
      payment_confirmed: { bg: "bg-green-100", text: "text-green-800", label: "Payment Confirmed" },
      appointment_scheduled: { bg: "bg-blue-100", text: "text-blue-800", label: "Appointment Scheduled" },
      biometrics_completed: { bg: "bg-indigo-100", text: "text-indigo-800", label: "Biometrics Completed" },
      under_review: { bg: "bg-amber-100", text: "text-amber-800", label: "Under Review" },
      approved: { bg: "bg-green-100", text: "text-green-800", label: "Approved" },
      rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
      delivered: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Delivered" },
    };

    const config = statusConfig[status];

    return (
      <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm font-medium`}>
        {config.label}
      </span>
    );
  };

  // Generate status timeline based on current status
  const renderStatusTimeline = (status: ApplicationStatus) => {
    const statuses = [
      { key: "submitted", label: "Application Submitted", icon: Check },
      { key: "biometrics_completed", label: "Biometrics Completed", icon: Check },
      { key: "under_review", label: "Under Review", icon: Clock },
      { key: "approved", label: "Approved", icon: Check },
      { key: "delivered", label: "Delivered", icon: Package },
    ];

    const statusOrder = [
      "draft",
      "submitted",
      "payment_confirmed",
      "appointment_scheduled",
      "biometrics_completed",
      "under_review",
      "approved",
      "rejected",
      "delivered",
    ];

    const currentStatusIndex = statusOrder.indexOf(status);

    return (
      <div className="space-y-4 mt-6">
        <h3 className="text-lg font-medium">Application Progress</h3>
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          {statuses.map((statusItem) => {
            const statusIndex = statusOrder.indexOf(statusItem.key as ApplicationStatus);
            const isCompleted = currentStatusIndex >= statusIndex;
            const isCurrent = status === statusItem.key;

            return (
              <div key={statusItem.key} className="relative pl-14 pb-8 last:pb-0">
                <div className={`absolute left-0 rounded-full h-10 w-10 flex items-center justify-center 
                  ${isCompleted ? "bg-green-100" : "bg-gray-100"}`}
                >
                  <statusItem.icon
                    className={`h-5 w-5 ${isCompleted ? "text-green-600" : "text-gray-400"}`}
                  />
                </div>
                <div>
                  <h4
                    className={`font-medium ${isCurrent ? "text-green-700" : isCompleted ? "text-gray-900" : "text-gray-500"}`}
                  >
                    {statusItem.label}
                  </h4>
                  {isCurrent && (
                    <p className="text-sm text-gray-600 mt-1">
                      {getStatusDescription(status)}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render next steps
  const renderNextSteps = (status: ApplicationStatus) => {
    const steps = getNextSteps(status);
    
    if (steps.length === 0) return null;
    
    return (
      <div className="mt-6 border-t pt-6">
        <h3 className="text-lg font-medium mb-3">Next Steps</h3>
        <ul className="space-y-2">
          {steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <div className="h-5 w-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                <span className="text-xs font-medium">{index + 1}</span>
              </div>
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-center mb-2">Track Your Application</h1>
        <p className="text-gray-600 text-center max-w-xl mx-auto">
          Enter your application ID to check the current status of your e-Passport application
        </p>
        <div className="flex justify-center mt-2">
          <Link href="/track/notifications" className="text-sm text-green-600 hover:text-green-700 flex items-center">
            <Bell className="h-3 w-3 mr-1" />
            Manage notification preferences
          </Link>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Application Tracking</CardTitle>
          <CardDescription>
            Enter the application ID that was provided to you after submitting your application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="applicationId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application ID</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input placeholder="e.g. BD-1234567890" {...field} />
                      </FormControl>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></div>
                        ) : (
                          <Search className="h-4 w-4 mr-2" />
                        )}
                        Track
                      </Button>
                    </div>
                    <FormDescription>
                      Your application ID starts with BD- followed by numbers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className="mt-4 text-sm text-blue-600">
            <p>Demo application IDs you can try:</p>
            <ul className="list-disc list-inside mt-1">
              <li>BD-1234567890 - Submitted application</li>
              <li>BD-2345678901 - Biometrics completed</li>
              <li>BD-3456789012 - Approved application</li>
              <li>BD-4567890123 - Delivered passport</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!isLoading && notFound && applicationId && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-4">
            <div className="flex items-center">
              <X className="h-5 w-5 text-red-600 mr-2" />
              <CardTitle className="text-red-700">Application Not Found</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">
              We couldn't find an application with ID <strong>{applicationId}</strong>. Please check
              the ID and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {!isLoading && applicationData && applicationId && (
        <Card>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle>Application Status</CardTitle>
              {renderStatusBadge(applicationData.status)}
            </div>
            <CardDescription>
              Application ID: <span className="font-medium">{applicationId}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-500">Applicant Name</div>
                <div className="font-medium">{applicationData.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Submission Date</div>
                <div className="font-medium">{new Date(applicationData.submissionDate).toLocaleDateString()}</div>
              </div>
              {applicationData.appointmentDate && (
                <div>
                  <div className="text-sm text-gray-500">Biometric Appointment</div>
                  <div className="font-medium">{new Date(applicationData.appointmentDate).toLocaleDateString()}</div>
                </div>
              )}
              {applicationData.estimatedDelivery && (
                <div>
                  <div className="text-sm text-gray-500">Estimated Delivery</div>
                  <div className="font-medium">{new Date(applicationData.estimatedDelivery).toLocaleDateString()}</div>
                </div>
              )}
              <div>
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="font-medium">{new Date(applicationData.lastUpdated).toLocaleDateString()}</div>
              </div>
            </div>

            {applicationData.status === "delivered" ? (
              <div className="bg-green-50 p-4 rounded-md border border-green-200 flex items-start gap-3">
                <Truck className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800">Passport Delivered</h3>
                  <p className="text-green-700 text-sm mt-1">
                    Your passport has been delivered. If you haven't received it yet, please contact customer support.
                  </p>
                </div>
              </div>
            ) : (
              renderStatusTimeline(applicationData.status)
            )}

            {renderNextSteps(applicationData.status)}

            {!isLoading && applicationData && (
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Want to receive updates about your application status?
                  </div>
                  <div className="flex items-center gap-2">
                                         {notificationSent && (
                       <div className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-md flex items-center">
                         <CheckCircle2 className="h-3 w-3 mr-1" />
                         Notification sent!
                       </div>
                     )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={sendTestNotification}
                      disabled={isSendingNotification}
                      className="flex items-center"
                    >
                      {isSendingNotification ? (
                        <>
                          <div className="h-3 w-3 border-2 border-t-transparent border-current rounded-full animate-spin mr-1"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Bell className="h-3 w-3 mr-1" />
                          Send Test Notification
                        </>
                      )}
                    </Button>
                    <Link href="/track/notifications">
                      <Button size="sm">Manage Notifications</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-6">
            <Button variant="outline" onClick={() => router.push("/")}>
              Return to Home
            </Button>
            {applicationData.status !== "delivered" && (
              <Button variant="outline" onClick={() => form.reset()}>
                Track Another Application
              </Button>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  );
} 