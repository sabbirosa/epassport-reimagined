"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useApplication } from "@/lib/context/application-context";
import { documentsSchema, type DocumentsValues } from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Info, Upload, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export function DocumentsForm() {
  const { applicationState, updateDocuments, nextStep, prevStep } = useApplication();
  
  const defaultValues = useMemo(() => ({
    photoUploaded: applicationState.documents.photoUploaded || false,
    nidUploaded: applicationState.documents.nidUploaded || false,
    birthCertificateUploaded: applicationState.documents.birthCertificateUploaded || false,
    previousPassportUploaded: applicationState.documents.previousPassportUploaded || false,
    additionalDocuments: applicationState.documents.additionalDocuments || [],
    declaration: applicationState.documents.declaration || false,
  }), [applicationState.documents]);
  
  const form = useForm<DocumentsValues>({
    resolver: zodResolver(documentsSchema),
    defaultValues,
  });

  // Simulate file uploads with state
  const [uploadStates, setUploadStates] = useState({
    photo: applicationState.documents.photoUploaded ? "success" : "idle",
    nid: applicationState.documents.nidUploaded ? "success" : "idle",
    birthCertificate: applicationState.documents.birthCertificateUploaded ? "success" : "idle",
    previousPassport: applicationState.documents.previousPassportUploaded ? "success" : "idle",
  });

  // Track whether previous passport is required
  const hasPassport = applicationState.passportDetails.previousPassport?.hasPassport || false;

  // Sync form with context on mount
  useEffect(() => {
    if (Object.keys(applicationState.documents).length > 0) {
      form.reset(defaultValues);
    }
  }, [form, defaultValues, applicationState.documents]);

  // Handle simulated file upload
  const handleFileUpload = (documentType: keyof typeof uploadStates) => {
    setUploadStates(prev => ({ ...prev, [documentType]: "uploading" }));
    
    // Simulate upload delay
    setTimeout(() => {
      setUploadStates(prev => ({ ...prev, [documentType]: "success" }));
      
      // Update form values based on upload success
      switch (documentType) {
        case "photo":
          form.setValue("photoUploaded", true);
          break;
        case "nid":
          form.setValue("nidUploaded", true);
          break;
        case "birthCertificate":
          form.setValue("birthCertificateUploaded", true);
          break;
        case "previousPassport":
          form.setValue("previousPassportUploaded", true);
          break;
      }
    }, 1500);
  };

  function onSubmit(data: DocumentsValues) {
    updateDocuments(data);
    nextStep();
  }

  // Render upload status indicators
  const renderUploadStatus = (type: keyof typeof uploadStates) => {
    switch (uploadStates[type]) {
      case "idle":
        return (
          <Button 
            type="button" 
            variant="outline" 
            className="w-full"
            onClick={() => handleFileUpload(type)}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </Button>
        );
      case "uploading":
        return (
          <Button type="button" variant="outline" className="w-full" disabled>
            <div className="h-4 w-4 mr-2 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
            Uploading...
          </Button>
        );
      case "success":
        return (
          <div className="flex items-center text-green-600 p-3 bg-green-50 rounded-md">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span>File uploaded successfully</span>
            <Button type="button" variant="ghost" size="sm" className="ml-auto p-0 h-7 w-7" onClick={() => setUploadStates(prev => ({ ...prev, [type]: "idle" }))}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
      case "error":
        return (
          <div className="flex items-center text-red-600 p-3 bg-red-50 rounded-md">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Upload failed. Please try again.</span>
            <Button type="button" variant="ghost" size="sm" className="ml-auto p-0 h-7 w-7" onClick={() => setUploadStates(prev => ({ ...prev, [type]: "idle" }))}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Documents</CardTitle>
        <CardDescription>
          Upload all required documents to proceed with your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6 flex items-start gap-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Document Requirements:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>All documents must be clear, legible scanned copies or photos</li>
              <li>Images should be in JPEG, PNG, or PDF format</li>
              <li>Maximum file size: 5MB per document</li>
              <li>Photo must meet e-Passport specifications (35mm x 45mm, white background)</li>
            </ul>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Passport Photo</h3>
                <FormField
                  control={form.control}
                  name="photoUploaded"
                  render={() => (
                    <FormItem>
                      <div className="border rounded-md p-4">
                        <FormDescription className="mb-3">
                          Recent color photo with white background (3.5cm x 4.5cm)
                        </FormDescription>
                        {renderUploadStatus("photo")}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">National ID Card</h3>
                <FormField
                  control={form.control}
                  name="nidUploaded"
                  render={() => (
                    <FormItem>
                      <div className="border rounded-md p-4">
                        <FormDescription className="mb-3">
                          Both sides of your National ID card in a single image
                        </FormDescription>
                        {renderUploadStatus("nid")}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">Birth Certificate (Optional)</h3>
                <FormField
                  control={form.control}
                  name="birthCertificateUploaded"
                  render={() => (
                    <FormItem>
                      <div className="border rounded-md p-4">
                        <FormDescription className="mb-3">
                          Scan or photo of your birth certificate
                        </FormDescription>
                        {renderUploadStatus("birthCertificate")}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">
                  Previous Passport {hasPassport ? "(Required)" : "(Optional)"}
                </h3>
                <FormField
                  control={form.control}
                  name="previousPassportUploaded"
                  render={() => (
                    <FormItem>
                      <div className="border rounded-md p-4">
                        <FormDescription className="mb-3">
                          First and last page of your previous passport
                        </FormDescription>
                        {renderUploadStatus("previousPassport")}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <FormField
                control={form.control}
                name="declaration"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Declaration</FormLabel>
                      <FormDescription>
                        I declare that the information I have provided is true and correct to the best of my knowledge. 
                        I understand that providing false information is a criminal offense under the Passport Act of Bangladesh.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button type="submit">Continue to Payment</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 