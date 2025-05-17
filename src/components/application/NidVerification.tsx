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
  bloodGroup: string;
  phoneNumber: string;
  issueDate: string;
  status: string;
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

export default function NidVerification({ onVerified, initialNid = "" }: NidVerificationProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verified" | "error">("idle");
  const [nidData, setNidData] = useState<NIDRecord | null>(null);
  
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
    setVerificationStatus("idle");
    
    try {
      // Call the NID verification API
      const response = await fetch(
        `/api/validate/nid?nid=${values.nid}&dateOfBirth=${values.dateOfBirth}`
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to verify NID");
      }
      
      if (data.success) {
        setNidData(data.data);
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
    setNidData(null);
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
        
        {verificationStatus === "verified" && nidData ? (
          <div className="space-y-4">
            <div className="flex items-center text-green-600 gap-2 font-medium">
              <CheckCircle className="h-5 w-5" />
              <span>NID Verified Successfully</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium">{nidData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{nidData.dateOfBirth}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">{nidData.gender.charAt(0).toUpperCase() + nidData.gender.slice(1)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Blood Group</p>
                    <p className="font-medium">{nidData.bloodGroup}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Family Information</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Father's Name</p>
                    <p className="font-medium">{nidData.fatherName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Mother's Name</p>
                    <p className="font-medium">{nidData.motherName}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Permanent Address</h3>
                <div className="space-y-1">
                  <p className="font-medium">{nidData.permanentAddress.street}</p>
                  <p>{nidData.permanentAddress.city}, {nidData.permanentAddress.district}</p>
                  <p>{nidData.permanentAddress.division} - {nidData.permanentAddress.postalCode}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Present Address</h3>
                <div className="space-y-1">
                  <p className="font-medium">{nidData.presentAddress.street}</p>
                  <p>{nidData.presentAddress.city}, {nidData.presentAddress.district}</p>
                  <p>{nidData.presentAddress.division} - {nidData.presentAddress.postalCode}</p>
                </div>
              </div>
            </div>
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