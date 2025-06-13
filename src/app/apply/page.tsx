"use client";

import { ApplicationProgress } from "@/components/application/application-progress";
import { AppointmentForm } from "@/components/application/appointment-form";
import { ContactInfoForm } from "@/components/application/contact-info-form";
import { DocumentsForm } from "@/components/application/documents-form";
import { PassportDetailsForm } from "@/components/application/passport-details-form";
import { PaymentForm } from "@/components/application/payment-form";
import { PersonalInfoForm } from "@/components/application/personal-info-form";
import { ReviewForm } from "@/components/application/review-form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { useApplication } from "@/lib/context/application-context";
import { Database, Info } from "lucide-react";

export default function ApplicationPage() {
  const { applicationState } = useApplication();
  const { currentStep } = applicationState;

  // Demo data for users to test
  const demoNIDs = [
    { nid: "1234567890", name: "Mohammed Rahman", hasPassport: false },
    { nid: "2345678901", name: "Fatima Akter", hasPassport: true },
    { nid: "3456789012", name: "Abdul Karim", hasPassport: true },
    { nid: "4567890123", name: "Nusrat Jahan", hasPassport: false },
    { nid: "5678901234", name: "Kamal Hossain", hasPassport: true },
  ];

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-center mb-2">e-Passport Application</h1>
        <p className="text-gray-600 text-center max-w-xl mx-auto">
          Complete all steps to submit your e-Passport application. Your registered data will be automatically fetched from NID records.
        </p>
      </div>

      {currentStep === 1 && (
        <div className="mb-8 space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>🎯 Demo Experience:</strong> Use any of the NID numbers below to experience automatic data fetching from our integrated government databases.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" />
                Available Demo NID Numbers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {demoNIDs.map((demo) => (
                  <div 
                    key={demo.nid} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div>
                      <span className="font-mono text-sm font-medium">{demo.nid}</span>
                      <p className="text-xs text-gray-600">{demo.name}</p>
                    </div>
                    <div className="text-xs">
                      {demo.hasPassport ? (
                        <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded">
                          Has Passport
                        </span>
                      ) : (
                        <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
                          New Application
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs text-green-800">
                  <strong>💡 What happens when you fetch data:</strong>
                </p>
                <ul className="text-xs text-green-700 mt-1 space-y-1">
                  <li>• Personal details auto-filled from NID database</li>
                  <li>• Birth certificate verified and linked</li>
                  <li>• Existing passport records checked</li>
                  <li>• Permanent address imported from NID</li>
                  <li>• Eligibility for renewal automatically determined</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <ApplicationProgress className="mb-8" />
      
      {currentStep === 1 && <PersonalInfoForm />}
      {currentStep === 2 && <ContactInfoForm />}
      {currentStep === 3 && <PassportDetailsForm />}
      {currentStep === 4 && <DocumentsForm />}
      {currentStep === 5 && <PaymentForm />}
      {currentStep === 6 && <AppointmentForm />}
      {currentStep === 7 && <ReviewForm />}
    </div>
  );
} 