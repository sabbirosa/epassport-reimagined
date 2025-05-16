"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const [formStatus, setFormStatus] = useState<{
    status: "idle" | "loading" | "error";
    message?: string;
  }>({ status: "idle" });

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setFormStatus({ status: "loading" });
    
    try {
      // In a real application, we would submit to an API
      // Simulating API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log("Login data:", data);
      
      // For demo, we'll just simulate a successful login
      router.push("/");
      
    } catch (error) {
      console.error("Login error:", error);
      setFormStatus({ 
        status: "error", 
        message: "Invalid email or password. Please try again." 
      });
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-md">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login to your account</CardTitle>
          <CardDescription>
            Enter your credentials to access e-Passport services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="h-4 w-4 border-gray-300 rounded"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">Remember me</FormLabel>
                    </FormItem>
                  )}
                />
                
                <Link href="/forgot-password" className="text-sm text-green-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              
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
                {formStatus.status === "loading" ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <div className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/register" className="text-green-600 hover:underline font-medium">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
      
      <div className="mt-8 p-4 bg-gray-50 border rounded-md">
        <h3 className="text-center text-gray-700 font-medium mb-2">Demo Access</h3>
        <p className="text-center text-gray-600 text-sm mb-3">
          For demonstration purposes, you can use any valid email and password
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          <div className="bg-white p-2 rounded border">
            <span className="font-medium">Email:</span> demo@example.com
          </div>
          <div className="bg-white p-2 rounded border">
            <span className="font-medium">Password:</span> Password123!
          </div>
        </div>
      </div>
    </div>
  );
} 