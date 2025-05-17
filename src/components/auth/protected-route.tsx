"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  adminOnly = false 
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoading) {
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push("/login");
      }
      // If admin-only route but user is not admin, redirect to dashboard
      else if (adminOnly && user?.role !== "admin") {
        router.push("/dashboard");
      }
    }
  }, [isAuthenticated, isLoading, user, router, adminOnly]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="container mx-auto p-6 space-y-4 max-w-6xl">
        <Skeleton className="h-12 w-1/4" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
      </div>
    );
  }
  
  // If not authorized (auth check passed but admin check failed)
  if ((adminOnly && user?.role !== "admin") || !isAuthenticated) {
    return null; // Will be redirected by the useEffect hook
  }
  
  // Render children when authenticated and authorized
  return <>{children}</>;
} 