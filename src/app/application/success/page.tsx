"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock3, FileCheck, Printer } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ApplicationSuccessContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id") || "BD-0000000000";
  
  // For demo purposes, generate random dates
  const [dates, setDates] = useState({
    submissionDate: new Date(),
    appointmentDate: new Date(),
  });
  
  useEffect(() => {
    // Set a random appointment date 7-14 days in the future
    const today = new Date();
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + 7 + Math.floor(Math.random() * 7));
    
    setDates({
      submissionDate: today,
      appointmentDate,
    });
  }, []);

  return (
    <div className="container max-w-3xl mx-auto py-12 px-4">
      <div className="flex flex-col items-center mb-10">
        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-3">Application Submitted Successfully!</h1>
        <p className="text-gray-600 text-center max-w-xl mb-6">
          Your e-Passport application has been received and is now being processed. 
          Please save your application ID for future reference.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-md px-5 py-3 mb-8">
          <p className="text-center">
            <span className="text-gray-600 mr-2">Application ID:</span>
            <span className="font-bold text-lg">{applicationId}</span>
          </p>
        </div>
      </div>
      
      <Card className="mb-8 p-6">
        <h2 className="text-xl font-bold mb-4">Next Steps</h2>
        
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
              <Clock3 className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Application Processing</h3>
              <p className="text-gray-600">
                Your application is now being processed. You can check the status anytime using your 
                application ID.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
              <Calendar className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Biometric Appointment</h3>
              <p className="text-gray-600">
                Your biometric appointment has been scheduled for{" "}
                <strong>{dates.appointmentDate.toLocaleDateString()}</strong> at the{" "}
                <strong>Dhaka Passport Office</strong>. Please arrive 15 minutes before your appointment time.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-blue-50 p-3 rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0">
              <FileCheck className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Required Documents</h3>
              <p className="text-gray-600">
                Please bring the following documents to your appointment:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>Original National ID Card</li>
                <li>Application Receipt (please print the confirmation email)</li>
                <li>Previous Passport (if applicable)</li>
                <li>Payment Receipt</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-3">Application Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
          <div>
            <p className="text-gray-600 text-sm">Submission Date</p>
            <p className="font-medium">{dates.submissionDate.toLocaleDateString()}</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Application Type</p>
            <p className="font-medium">New e-Passport</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Processing Type</p>
            <p className="font-medium">Regular (3-4 weeks)</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Payment Status</p>
            <p className="font-medium text-green-600">Confirmed</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Appointment Date</p>
            <p className="font-medium">{dates.appointmentDate.toLocaleDateString()}</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Estimated Delivery</p>
            <p className="font-medium">{(() => {
              // Calculate estimated delivery date (3 weeks from submission)
              const estimatedDate = new Date(dates.submissionDate);
              estimatedDate.setDate(estimatedDate.getDate() + 21);
              return estimatedDate.toLocaleDateString();
            })()}</p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Current Status</p>
            <p className="font-medium">Submitted</p>
          </div>
        </div>
        
        <div className="flex justify-center">
          <Button variant="outline" className="flex gap-2 items-center">
            <Printer className="h-4 w-4" />
            Print Receipt
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href={`/track?id=${applicationId}`}>
          <Button variant="outline">Track Application</Button>
        </Link>
        <Link href="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default function ApplicationSuccessPage() {
  return (
    <Suspense fallback={
      <div className="container max-w-3xl mx-auto py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Clock3 className="h-12 w-12 text-gray-400" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ApplicationSuccessContent />
    </Suspense>
  );
} 