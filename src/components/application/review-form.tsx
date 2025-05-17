"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApplication } from "@/lib/context/application-context";
import { generateApplicationId } from "@/lib/services/track-service";
import { AlertCircle, CheckCircle2, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReviewForm() {
  const router = useRouter();
  const { applicationState, prevStep, updateApplicationStatus, resetApplication } = useApplication();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handler for final submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      updateApplicationStatus("submitted");
      
      // Generate a random application ID
      const applicationId = generateApplicationId();
      
      // Wait a bit and redirect to success page (for demo)
      setTimeout(() => {
        router.push(`/application/success?id=${applicationId}`);
      }, 3000);
    }, 3000);
  };

  // Check for missing required information
  const hasMissingInfo = (
    !applicationState.personalInfo.fullName ||
    !applicationState.personalInfo.nid ||
    !applicationState.contactInfo.email ||
    !applicationState.contactInfo.phone ||
    !applicationState.documents.photoUploaded ||
    !applicationState.documents.nidUploaded
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Review Application</CardTitle>
        <CardDescription>
          Please review your application details before final submission
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitting ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Submitting Application</h3>
            <p className="text-gray-500">Please wait while we process your application...</p>
          </div>
        ) : isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-medium text-green-800 mb-2">Application Submitted!</h3>
            <p className="text-green-700 mb-6 text-center max-w-md">
              Your e-Passport application has been successfully submitted. You will receive confirmation via email and SMS.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {hasMissingInfo && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-yellow-800">Missing Information</h3>
                  <p className="text-yellow-700 text-sm mt-1">
                    Some required information is missing or incomplete. Please go back and fill in all required fields.
                  </p>
                </div>
              </div>
            )}
            
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="passport">Passport</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="payment">Payment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      updateApplicationStatus("draft");
                      prevStep();
                      prevStep();
                      prevStep();
                      prevStep();
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Full Name</p>
                    <p className="font-medium">{applicationState.personalInfo.fullName || "Not provided"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">National ID (NID)</p>
                    <p className="font-medium">{applicationState.personalInfo.nid || "Not provided"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-medium">
                      {applicationState.personalInfo.dateOfBirth ? 
                        new Date(applicationState.personalInfo.dateOfBirth).toLocaleDateString() : 
                        "Not provided"}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Place of Birth</p>
                    <p className="font-medium">{applicationState.personalInfo.placeOfBirth || "Not provided"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Gender</p>
                    <p className="font-medium capitalize">{applicationState.personalInfo.gender || "Not provided"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Marital Status</p>
                    <p className="font-medium capitalize">{applicationState.personalInfo.maritalStatus || "Not provided"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Profession</p>
                    <p className="font-medium">{applicationState.personalInfo.profession || "Not provided"}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      updateApplicationStatus("draft");
                      prevStep();
                      prevStep();
                      prevStep();
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6">
                  <div className="space-y-1">
                    <p className="text-gray-500">Email Address</p>
                    <p className="font-medium">{applicationState.contactInfo.email || "Not provided"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Phone Number</p>
                    <p className="font-medium">{applicationState.contactInfo.phone || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="space-y-1 mb-4">
                  <p className="text-gray-500 font-medium">Present Address</p>
                  {applicationState.contactInfo.presentAddress ? (
                    <p>
                      {applicationState.contactInfo.presentAddress.street}, {applicationState.contactInfo.presentAddress.city}, {applicationState.contactInfo.presentAddress.division} - {applicationState.contactInfo.presentAddress.postalCode}
                    </p>
                  ) : (
                    <p>Not provided</p>
                  )}
                </div>
                
                <div className="space-y-1 mb-4">
                  <p className="text-gray-500 font-medium">Permanent Address</p>
                  {applicationState.contactInfo.sameAsPresent ? (
                    <p className="italic">Same as present address</p>
                  ) : applicationState.contactInfo.permanentAddress ? (
                    <p>
                      {applicationState.contactInfo.permanentAddress.street}, {applicationState.contactInfo.permanentAddress.city}, {applicationState.contactInfo.permanentAddress.division} - {applicationState.contactInfo.permanentAddress.postalCode}
                    </p>
                  ) : (
                    <p>Not provided</p>
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="text-gray-500 font-medium">Emergency Contact</p>
                  {applicationState.contactInfo.emergencyContact ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-1 gap-x-6 text-sm mt-2">
                      <p>
                        <span className="text-gray-500">Name:</span> {applicationState.contactInfo.emergencyContact.name}
                      </p>
                      <p>
                        <span className="text-gray-500">Relationship:</span> {applicationState.contactInfo.emergencyContact.relationship}
                      </p>
                      <p>
                        <span className="text-gray-500">Phone:</span> {applicationState.contactInfo.emergencyContact.phone}
                      </p>
                    </div>
                  ) : (
                    <p>Not provided</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="passport" className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Passport Details</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      updateApplicationStatus("draft");
                      prevStep();
                      prevStep();
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Passport Type</p>
                    <p className="font-medium capitalize">{applicationState.passportDetails.passportType || "Ordinary"}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Application Reason</p>
                    <p className="font-medium capitalize">
                      {applicationState.passportDetails.applicationReason === "new" ? "New Passport" :
                       applicationState.passportDetails.applicationReason === "renewal" ? "Renewal" :
                       applicationState.passportDetails.applicationReason === "lost" ? "Lost/Stolen" :
                       applicationState.passportDetails.applicationReason === "damaged" ? "Damaged" :
                       "Not provided"}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Delivery Option</p>
                    <p className="font-medium">
                      {applicationState.passportDetails.deliveryOption === "regular" ? "Regular (3-4 weeks)" :
                      applicationState.passportDetails.deliveryOption === "express" ? "Express (7-10 days)" :
                      "Not provided"}
                    </p>
                  </div>
                </div>
                
                {applicationState.passportDetails.previousPassport?.hasPassport && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-gray-500 font-medium mb-2">Previous Passport Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
                      <div className="space-y-1">
                        <p className="text-gray-500">Passport Number</p>
                        <p className="font-medium">{applicationState.passportDetails.previousPassport.passportNumber}</p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-gray-500">Issue Date</p>
                        <p className="font-medium">
                          {applicationState.passportDetails.previousPassport.issueDate ? 
                            new Date(applicationState.passportDetails.previousPassport.issueDate).toLocaleDateString() : 
                            "Not provided"}
                        </p>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-gray-500">Expiry Date</p>
                        <p className="font-medium">
                          {applicationState.passportDetails.previousPassport.expiryDate ? 
                            new Date(applicationState.passportDetails.previousPassport.expiryDate).toLocaleDateString() : 
                            "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="documents" className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Documents</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      updateApplicationStatus("draft");
                      prevStep();
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${applicationState.documents.photoUploaded ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {applicationState.documents.photoUploaded ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                    </div>
                    <span>Passport Photo</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${applicationState.documents.nidUploaded ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {applicationState.documents.nidUploaded ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <AlertCircle className="w-4 h-4" />
                      )}
                    </div>
                    <span>National ID Card</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${applicationState.documents.birthCertificateUploaded ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                      {applicationState.documents.birthCertificateUploaded ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">OPT</span>
                      )}
                    </div>
                    <span>Birth Certificate (Optional)</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-2 ${
                      applicationState.passportDetails.previousPassport?.hasPassport
                        ? (applicationState.documents.previousPassportUploaded 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-red-100 text-red-600')
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {applicationState.documents.previousPassportUploaded ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : applicationState.passportDetails.previousPassport?.hasPassport ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-medium">OPT</span>
                      )}
                    </div>
                    <span>Previous Passport {applicationState.passportDetails.previousPassport?.hasPassport ? "(Required)" : "(Optional)"}</span>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">Payment Information</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8"
                    onClick={() => {
                      updateApplicationStatus("draft");
                      prevStep();
                    }}
                  >
                    <Edit2 className="h-3.5 w-3.5 mr-1" />
                    Edit
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Payment Method</p>
                    <p className="font-medium capitalize">
                      {applicationState.payment.paymentMethod === "credit_card" ? "Credit Card" :
                       applicationState.payment.paymentMethod === "debit_card" ? "Debit Card" :
                       applicationState.payment.paymentMethod === "mobile_banking" ? "Mobile Banking" :
                       applicationState.payment.paymentMethod === "bank_transfer" ? "Bank Transfer" :
                       "Not provided"}
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Amount Paid</p>
                    <p className="font-medium">
                      {applicationState.payment.amount ? applicationState.payment.amount.toLocaleString() : "0"} BDT
                    </p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-500">Payment Status</p>
                    <p className="font-medium text-green-600">Confirmed</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex flex-wrap gap-4 justify-between mt-6 pt-6 border-t">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back to Payment
              </Button>
              
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    resetApplication();
                    router.push("/");
                  }}
                >
                  Cancel Application
                </Button>
                
                <Button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={hasMissingInfo}
                >
                  Submit Application
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 