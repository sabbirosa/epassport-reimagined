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

// Birth certificate record structure
interface BirthCertificateRecord {
  certificateNumber: string;
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  gender: string;
  fatherName: string;
  motherName: string;
  issuedDate: string;
  registeredBy: string;
}







// Form validation schema
const verificationSchema = z.object({
  certificateNumber: z
    .string()
    .min(10, { message: "Certificate number must be at least 10 characters" })
    .regex(/^\d+$/, { message: "Certificate number must contain only numbers" }),
  dateOfBirth: z.string().refine((date) => {
    return !isNaN(new Date(date).getTime());
  }, { message: "Please enter a valid date of birth" }),
});

interface BirthCertificateVerificationProps {
  onVerified: (data: BirthCertificateRecord) => void;
  initialRegNumber?: string;
}

export default function BirthCertificateVerification({
  initialRegNumber = "",
  onVerified,
}: BirthCertificateVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "verified" | "failed">("idle");
  const [certificateData, setCertificateData] = useState<BirthCertificateRecord | null>(null);

  
  // Form setup
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      certificateNumber: initialRegNumber,
      dateOfBirth: "",
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof verificationSchema>) => {
    setIsLoading(true);
    setError(null);
    setVerificationStatus("verifying");
    
    try {
      // Call the birth certificate verification API
      const response = await fetch(
        `/api/validate/birth-certificate?registrationNumber=${values.certificateNumber}&dateOfBirth=${values.dateOfBirth}`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to verify birth certificate");
      }
      
      if (data.success) {
        setCertificateData(data.data);
        setVerificationStatus("verified");
        onVerified(data.data);
      } else {
        setVerificationStatus("failed");
        setError(data.error);
      }
    } catch (err: unknown) {
      setVerificationStatus("failed");
      setError(err instanceof Error ? err.message : "An error occurred during verification");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset the form and state
  const handleReset = () => {
    form.reset();
    setError(null);
    setVerificationStatus("idle");
    setCertificateData(null);
  };
  

  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Birth Certificate</CardTitle>
        <CardDescription>
          Enter your birth certificate registration number and date of birth for verification
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {verificationStatus === "verified" && certificateData ? (
          <div className="space-y-4">
            <div className="flex items-center text-green-600 gap-2 font-medium">
              <CheckCircle className="h-5 w-5" />
              <span>Birth Certificate Verified Successfully</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Registration Number</p>
                    <p className="font-medium">{certificateData.certificateNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{certificateData.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{certificateData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{certificateData.gender.charAt(0).toUpperCase() + certificateData.gender.slice(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Place of Birth</p>
                    <p className="font-medium">{certificateData.placeOfBirth}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Family Information</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Father&apos;s Name</p>
                    <p className="font-medium">{certificateData.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mother&apos;s Name</p>
                    <p className="font-medium">{certificateData.motherName}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Registration Details</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium">{certificateData.issuedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registered By</p>
                    <p className="font-medium">{certificateData.registeredBy}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="certificateNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Certificate Registration Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter registration number" 
                        {...field} 
                        disabled={isLoading || verificationStatus === "verified"} 
                      />
                    </FormControl>
                    <FormDescription>
                      Enter your birth certificate registration number
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
                      Enter your date of birth as shown on your birth certificate
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
                      Verify Certificate
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