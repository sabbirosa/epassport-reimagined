"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  nid: string;
}

// Define the AuthContextType
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers = [
  {
    id: "user-123",
    email: "user@example.com",
    password: "password123",
    name: "Mohammed Rahman",
    role: "user" as const,
    nid: "1234567890"
  },
  {
    id: "admin-456",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
    nid: "9876543210"
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);
  
  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user with matching credentials
      const matchedUser = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (matchedUser) {
        // Create user object without password
        const { password, ...userWithoutPassword } = matchedUser;
        setUser(userWithoutPassword);
        
        // Store in localStorage
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  
  // Calculate authenticated state
  const isAuthenticated = user !== null;
  
  // Context value
  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 