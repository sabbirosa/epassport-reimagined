"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { registerSchema, type RegisterFormValues } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterPage() {
  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message?: string;
  }>({ status: "idle" });

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nid: "",
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setFormStatus({ status: "loading" });
    
    try {
      // In a real application, we would submit to an API
      // Simulating API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Registration data:", data);
      
      // For demo, we'll just simulate a successful registration
      setFormStatus({ 
        status: "success", 
        message: "Registration successful! You can now login to your account." 
      });
      
      // Reset form
      form.reset();
      
    } catch (error) {
      console.error("Registration error:", error);
      setFormStatus({ 
        status: "error", 
        message: "An error occurred during registration. Please try again." 
      });
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-lg">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account and start your e-Passport application
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formStatus.status === "success" ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">Registration Successful!</h3>
                <p className="text-green-700 text-sm mt-1">{formStatus.message}</p>
                <Button asChild className="mt-4 bg-green-600 hover:bg-green-700">
                  <Link href="/login">Proceed to Login</Link>
                </Button>
              </div>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>National ID (NID)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your NID number" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your 10 to 17 digit NID number
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="01XXXXXXXXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormDescription>
                          At least 8 characters with mixed case, numbers and symbols
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 mt-1 border-gray-300 rounded"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Terms and Conditions</FormLabel>
                        <FormDescription>
                          I agree to the{" "}
                          <Link href="/terms" className="text-green-600 hover:underline">
                            terms of service
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-green-600 hover:underline">
                            privacy policy
                          </Link>
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                {formStatus.status === "error" && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-red-700 text-sm">{formStatus.message}</p>
                    </div>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={formStatus.status === "loading"}
                >
                  {formStatus.status === "loading" ? "Registering..." : "Register"}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <div className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 