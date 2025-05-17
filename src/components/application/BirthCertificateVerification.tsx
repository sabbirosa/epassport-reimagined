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
  registrationNumber: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  placeOfBirth: string;
  fatherName: string;
  fatherNID: string;
  motherName: string;
  motherNID: string;
  permanentAddress: {
    street: string;
    city: string;
    district: string;
    division: string;
    postalCode: string;
  };
  registrationDate: string;
  nid: string;
}

// Form validation schema
const birthCertificateVerificationSchema = z.object({
  registrationNumber: z.string().min(8, "Registration number must be at least 8 characters"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

interface BirthCertificateVerificationProps {
  onVerified: (data: BirthCertificateRecord) => void;
  initialRegNumber?: string;
}

export default function BirthCertificateVerification({ 
  onVerified, 
  initialRegNumber = "" 
}: BirthCertificateVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verified" | "error">("idle");
  const [certificateData, setCertificateData] = useState<BirthCertificateRecord | null>(null);
  
  // Form setup
  const form = useForm<z.infer<typeof birthCertificateVerificationSchema>>({
    resolver: zodResolver(birthCertificateVerificationSchema),
    defaultValues: {
      registrationNumber: initialRegNumber,
      dateOfBirth: "",
    },
  });
  
  // Handle form submission
  const onSubmit = async (values: z.infer<typeof birthCertificateVerificationSchema>) => {
    setIsLoading(true);
    setError(null);
    setVerificationStatus("idle");
    
    try {
      // Call the birth certificate verification API
      const response = await fetch(
        `/api/validate/birth-certificate?registrationNumber=${values.registrationNumber}&dateOfBirth=${values.dateOfBirth}`
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
        setVerificationStatus("error");
        setError(data.error);
      }
    } catch (err: any) {
      setVerificationStatus("error");
      setError(err.message || "An error occurred during verification");
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
                    <p className="font-medium">{certificateData.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{certificateData.name}</p>
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
                    <p className="text-sm text-gray-500">Father's Name</p>
                    <p className="font-medium">{certificateData.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Father's NID</p>
                    <p className="font-medium">{certificateData.fatherNID}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mother's Name</p>
                    <p className="font-medium">{certificateData.motherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mother's NID</p>
                    <p className="font-medium">{certificateData.motherNID}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Permanent Address</h3>
                <div className="space-y-1">
                  <p className="font-medium">{certificateData.permanentAddress.street}</p>
                  <p>{certificateData.permanentAddress.city}, {certificateData.permanentAddress.district}</p>
                  <p>{certificateData.permanentAddress.division} - {certificateData.permanentAddress.postalCode}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Registration Details</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium">{certificateData.registrationDate}</p>
                  </div>
                  {certificateData.nid && (
                    <div>
                      <p className="text-sm text-gray-500">National ID</p>
                      <p className="font-medium">{certificateData.nid}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="registrationNumber"
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