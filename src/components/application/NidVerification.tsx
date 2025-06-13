"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, Search, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// NID record structure from the database
interface NIDRecord {
  nid: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  fatherName: string;
  motherName: string;
  bloodGroup: string;
  permanentAddress: {
    street: string;
    city: string;
    district: string;
    division: string;
    postalCode: string;
  };
  presentAddress: {
    street: string;
    city: string;
    district: string;
    division: string;
    postalCode: string;
  };
}





interface VerificationResult {
  matched: boolean;
  message: string;
  details?: {
    name?: string;
    dateOfBirth?: string;
    gender?: string;
    fatherName?: string;
    motherName?: string;
  };
}

// Form validation schema
const nidVerificationSchema = z.object({
  nid: z.string().min(10, "NID must be at least 10 characters").max(17, "NID must be at most 17 characters"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

interface NidVerificationProps {
  onVerified: (data: NIDRecord) => void;
  initialNid?: string;
}

export default function NidVerification({
  initialNid = "",
  onVerified,
}: NidVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "verified" | "failed">("idle");
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  
  // Form setup
  const form = useForm<z.infer<typeof nidVerificationSchema>>({
    resolver: zodResolver(nidVerificationSchema),
    defaultValues: {
      nid: initialNid,
      dateOfBirth: "",
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof nidVerificationSchema>) => {
    setIsLoading(true);
    setError(null);
    setVerificationStatus("verifying");
    
    try {
      const response = await fetch("/api/verify/nid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nid: values.nid, dateOfBirth: values.dateOfBirth }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to verify NID");
      }
      
      const result: VerificationResult = await response.json();
      setVerificationResult(result);
      setVerificationStatus(result.matched ? "verified" : "failed");
      
      if (result.matched) {
        onVerified(result.details as NIDRecord);
      } else {
        setError(result.message);
      }
    } catch (err: unknown) {
      console.error("Error verifying NID:", err);
      setVerificationStatus("failed");
      setError(err instanceof Error ? err.message : "An error occurred during verification");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset the form and state
  const handleReset = () => {
    form.reset();
    setError(null);
    setVerificationStatus("idle");
    setVerificationResult(null);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify National ID</CardTitle>
        <CardDescription>
          Enter your NID number and date of birth for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {verificationStatus === "verified" && verificationResult ? (
          <div className="space-y-4">
            <div className="flex items-center text-green-600 gap-2 font-medium">
              <CheckCircle className="h-5 w-5" />
              <span>{verificationResult.message}</span>
            </div>
            
            {verificationResult.details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(verificationResult.details).map(([key, value]) => (
                  <div key={key}>
                    <h3 className="font-medium text-gray-700 mb-2">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                    <p className="font-medium">{value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National ID Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your NID number" 
                        {...field} 
                        disabled={isLoading || verificationStatus === "verified"} 
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your 10-17 digit National ID number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input 
                        type="date" 
                        {...field} 
                        disabled={isLoading || verificationStatus === "verified"} 
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your date of birth as shown on your NID
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2">
                <Button 
                  type="submit" 
                  disabled={isLoading || verificationStatus === "verified"}
                  className="flex items-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Verify NID
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
      
      {verificationStatus === "verified" && (
        <CardFooter className="flex justify-end">
          <Button variant="outline" onClick={handleReset} className="flex items-center">
            <X className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </CardFooter>
      )}
    </Card>
  );
} 