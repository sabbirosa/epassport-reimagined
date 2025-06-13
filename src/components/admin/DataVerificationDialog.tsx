"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

interface VerificationResult {
  field: string;
  value: string;
  expected: string;
  status: "matched" | "mismatched";
}

interface Application {
  id: string;
  personalInfo: {
    fullName: string;
    nid: string;
    dateOfBirth: string;
    placeOfBirth: string;
    gender: string;
    fatherName: string;
    motherName: string;
    address: string;
    phone: string;
    email: string;
    oldPassportNumber?: string;
    birthCertificateNumber?: string;
    paymentMethod: string;
  };
  verificationResults: VerificationResult[];
}

interface DataVerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  application: Application | null;
}

export default function DataVerificationDialog({
  isOpen,
  onClose,
  onConfirm,
  application,
}: DataVerificationDialogProps) {
  const [dataVerified, setDataVerified] = useState(false);

  // Reset state when dialog opens
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    } else {
      setDataVerified(false);
    }
  };

  const verifyData = () => {
    setDataVerified(true);
  };

  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Application Verification</DialogTitle>
          <DialogDescription>
            Verify applicant data before proceeding
          </DialogDescription>
        </DialogHeader>

        {!dataVerified ? (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Applicant Information</CardTitle>
                <CardDescription>
                  Please verify all information is correct
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.fullName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Gender</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.gender}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.dateOfBirth}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Place of Birth</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.placeOfBirth}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Father&apos;s Name</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.fatherName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Mother&apos;s Name</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.motherName}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.address}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.phone}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">NID Number</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.nid}</p>
                  </div>
                  {application.personalInfo.oldPassportNumber && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Old Passport Number</p>
                      <p className="text-sm text-gray-700">{application.personalInfo.oldPassportNumber}</p>
                    </div>
                  )}
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Birth Certificate Number</p>
                    <p className="text-sm text-gray-700">{application.personalInfo.birthCertificateNumber}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Payment Method</p>
                    <p className="text-sm text-gray-700 capitalize">{application.personalInfo.paymentMethod}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center py-2">
              <div className="text-yellow-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span className="text-sm">Please verify all information before proceeding</span>
              </div>
              <Button onClick={verifyData}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Verify Information
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-600" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Information has been verified successfully!
                  </p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <p>Payment method: <span className="capitalize">{application.personalInfo.paymentMethod}</span></p>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  The payment method was selected by the applicant during the application process.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={!dataVerified}
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirm & Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 