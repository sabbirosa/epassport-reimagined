"use client";

import { ApplicationProgress } from "@/components/application/application-progress";
import { ContactInfoForm } from "@/components/application/contact-info-form";
import { DocumentsForm } from "@/components/application/documents-form";
import { PassportDetailsForm } from "@/components/application/passport-details-form";
import { PaymentForm } from "@/components/application/payment-form";
import { PersonalInfoForm } from "@/components/application/personal-info-form";
import { ReviewForm } from "@/components/application/review-form";
import { useApplication } from "@/lib/context/application-context";

export default function ApplicationPage() {
  const { applicationState } = useApplication();
  const { currentStep } = applicationState;

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-center mb-2">e-Passport Application</h1>
        <p className="text-gray-600 text-center max-w-xl mx-auto">
          Complete all steps to submit your e-Passport application
        </p>
      </div>
      
      <ApplicationProgress className="mb-8" />
      
      {currentStep === 1 && <PersonalInfoForm />}
      {currentStep === 2 && <ContactInfoForm />}
      {currentStep === 3 && <PassportDetailsForm />}
      {currentStep === 4 && <DocumentsForm />}
      {currentStep === 5 && <PaymentForm />}
      {currentStep === 6 && <ReviewForm />}
    </div>
  );
} 