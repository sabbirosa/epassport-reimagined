"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplication } from "@/lib/context/application-context";
import { cn } from "@/lib/utils";
import { paymentSchema, type PaymentValues } from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { addBusinessDays, addDays, format, isAfter, isBefore } from "date-fns";
import { CalendarIcon, CheckCircle2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function AppointmentForm() {
  const { applicationState, updatePayment, nextStep, prevStep, updateApplicationStatus } = useApplication();
  
  // Default values for the form
  const defaultValues: Partial<PaymentValues> = {
    appointmentDate: applicationState.payment.appointmentDate || undefined,
    appointmentTime: applicationState.payment.appointmentTime || undefined,
    appointmentLocation: applicationState.payment.appointmentLocation || undefined,
  };
  
  const form = useForm<Partial<PaymentValues>>({
    resolver: zodResolver(paymentSchema.pick({ 
      appointmentDate: true, 
      appointmentTime: true, 
      appointmentLocation: true 
    })),
    defaultValues,
  });

  // Appointment status
  const [appointmentState, setAppointmentState] = useState<"idle" | "processing" | "success" | "failed">("idle");
  
  // Office locations
  const officeLocations = [
    "Dhaka Regional Passport Office",
    "Chattogram Regional Passport Office",
    "Sylhet Regional Passport Office",
    "Rajshahi Regional Passport Office",
    "Khulna Regional Passport Office",
    "Barishal Regional Passport Office",
    "Rangpur Regional Passport Office",
    "Mymensingh Regional Passport Office",
  ];
  
  // Time slots
  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", 
    "4:00 PM", "4:30 PM"
  ];

  // Sync form with context on mount
  useEffect(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  // Schedule appointment (simulated)
  const scheduleAppointment = () => {
    setAppointmentState("processing");
    
    // Simulate processing delay
    setTimeout(() => {
      // For demo, appointment will be successful
      setAppointmentState("success");
      
      // Update application status
      updateApplicationStatus("appointment_scheduled");
      
      // Wait and proceed to next step
      setTimeout(() => {
        nextStep();
      }, 2000);
    }, 2000);
  };

  function onSubmit(data: Partial<PaymentValues>) {
    updatePayment(data as PaymentValues);
    scheduleAppointment();
  }

  // Date filter function - only allow future dates and exclude weekends
  const isDateAvailable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Only allow dates at least 2 business days in the future
    const minDate = addBusinessDays(today, 2);
    
    // Exclude dates more than 60 days in the future
    const maxDate = addDays(today, 60);
    
    // Check if date is available
    return isAfter(date, minDate) && isBefore(date, maxDate) && date.getDay() !== 0 && date.getDay() !== 6;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Biometric Appointment</CardTitle>
        <CardDescription>
          Select a date and time for your biometric data collection
        </CardDescription>
      </CardHeader>
      <CardContent>
        {appointmentState === "processing" ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Scheduling Appointment</h3>
            <p className="text-gray-500">Please wait while we schedule your appointment...</p>
          </div>
        ) : appointmentState === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-medium text-green-800 mb-2">Appointment Scheduled!</h3>
            <p className="text-green-700 mb-6 text-center max-w-md">
              Your biometric appointment has been scheduled successfully. You will receive a confirmation email with the details.
            </p>
            <div className="bg-white rounded-md p-4 border border-green-200 w-full max-w-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{form.getValues().appointmentDate}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{form.getValues().appointmentTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">{form.getValues().appointmentLocation}</span>
              </div>
            </div>
          </div>
        ) : appointmentState === "failed" ? (
          <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg border border-red-200">
            <XCircle className="h-16 w-16 text-red-600 mb-4" />
            <h3 className="text-xl font-medium text-red-800 mb-2">Scheduling Failed</h3>
            <p className="text-red-700 mb-6 text-center max-w-md">
              There was an issue scheduling your appointment. Please try again or contact support.
            </p>
            <Button onClick={() => setAppointmentState("idle")}>Try Again</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="appointmentLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passport Office Location</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a passport office" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {officeLocations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the passport office location most convenient for you
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="appointmentDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Appointment Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)}
                            disabled={(date) => !isDateAvailable(date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        Select a date for your biometric appointment (excluding weekends)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="appointmentTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose your preferred time slot
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                <h4 className="font-medium text-blue-800 mb-2">What to bring to your appointment:</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Original National ID Card (NID)</li>
                  <li>Original Birth Certificate</li>
                  <li>Previous passport (if applicable)</li>
                  <li>Payment receipt</li>
                  <li>Appointment confirmation (will be sent via email)</li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button type="submit">Schedule Appointment</Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
} 