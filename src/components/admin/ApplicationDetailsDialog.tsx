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
import { Separator } from "@/components/ui/separator";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar, FileText, MapPin, Phone, User } from "lucide-react";

interface Document {
  type: string;
  status: string;
  uploadedAt: string;
  url: string;
}

interface ApplicationDetails {
  id: string;
  status: string;
  submittedAt: string;
  documents: Document[];
  personalInfo: {
    fullName: string;
    nid: string;
    dateOfBirth: string;
    gender: string;
    placeOfBirth: string;
    fatherName: string;
    motherName: string;
    maritalStatus: string;
    profession: string;
    birthCertificateNumber: string;
    phone: string;
    email: string;
    presentAddress: string;
    permanentAddress: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
      address: string;
    };
    applicationReason: string;
    oldPassportNumber?: string;
    oldPassportIssueDate?: string;
    oldPassportExpiryDate?: string;
  };
  passportType: string;
  deliveryOption: string;
  appointmentDate: string;
  paymentMethod: string;
  notes?: string;
}

interface ApplicationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  application: ApplicationDetails;
}

export default function ApplicationDetailsDialog({
  isOpen,
  onClose,
  application,
}: ApplicationDetailsDialogProps) {
  if (!application) return null;

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Application Details</DialogTitle>
          <DialogDescription>
            Application #{application.id} - {application.personalInfo.fullName}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="contact">Contact Info</TabsTrigger>
            <TabsTrigger value="passport">Passport Details</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" /> Application Summary
                </CardTitle>
                <CardDescription>
                  Submitted on {formatDate(application.submittedAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Status</h4>
                    <p className="text-sm">{application.status}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                    <p className="text-sm">{formatDate(application.submittedAt)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Passport Type</h4>
                    <p className="text-sm">{application.passportType || "Ordinary"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Delivery Option</h4>
                    <p className="text-sm">{application.deliveryOption || "Regular"}</p>
                  </div>
                  {application.appointmentDate && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Appointment Date</h4>
                      <p className="text-sm">{formatDate(application.appointmentDate)}</p>
                    </div>
                  )}
                  {application.paymentMethod && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Payment Method</h4>
                      <p className="text-sm">{application.paymentMethod}</p>
                    </div>
                  )}
                </div>

                <Separator />

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Notes</h4>
                  <p className="text-sm">
                    {application.notes || "No additional notes for this application."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3 mt-0.5">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Application Submitted</p>
                      <p className="text-xs text-gray-500">{formatDate(application.submittedAt)}</p>
                    </div>
                  </div>
                  
                  {application.appointmentDate && (
                    <div className="flex items-start">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600 mr-3 mt-0.5">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Biometric Appointment</p>
                        <p className="text-xs text-gray-500">{formatDate(application.appointmentDate)}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-start">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 mr-3 mt-0.5">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-gray-500">{formatDate(application.submittedAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" /> Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                    <p className="text-sm">{application.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                    <p className="text-sm">{application.personalInfo.dateOfBirth || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Place of Birth</h4>
                    <p className="text-sm">{application.personalInfo.placeOfBirth || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Gender</h4>
                    <p className="text-sm">{application.personalInfo.gender || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Father&apos;s Name</h4>
                    <p className="text-sm">{application.personalInfo.fatherName || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Mother&apos;s Name</h4>
                    <p className="text-sm">{application.personalInfo.motherName || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Marital Status</h4>
                    <p className="text-sm">{application.personalInfo.maritalStatus || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Profession</h4>
                    <p className="text-sm">{application.personalInfo.profession || "Not provided"}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">National ID Number</h4>
                    <p className="text-sm">{application.personalInfo.nid || "Not provided"}</p>
                  </div>
                  
                  {application.personalInfo.birthCertificateNumber && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Birth Certificate Number</h4>
                      <p className="text-sm">{application.personalInfo.birthCertificateNumber}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Info Tab */}
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5" /> Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                    <p className="text-sm">{application.personalInfo.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                    <p className="text-sm">{application.personalInfo.email || "Not provided"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium flex items-center mb-2">
                    <MapPin className="mr-1 h-4 w-4" /> Present Address
                  </h3>
                  <p className="text-sm">
                    {application.personalInfo.presentAddress || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium flex items-center mb-2">
                    <MapPin className="mr-1 h-4 w-4" /> Permanent Address
                  </h3>
                  <p className="text-sm">
                    {application.personalInfo.permanentAddress || "Not provided"}
                  </p>
                </div>

                {application.personalInfo.emergencyContact && (
                  <div>
                    <h3 className="text-sm font-medium flex items-center mb-2">
                      <Phone className="mr-1 h-4 w-4" /> Emergency Contact
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Emergency Contact Name</h4>
                        <p className="text-sm">{application.personalInfo.emergencyContact.name || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Relationship</h4>
                        <p className="text-sm">{application.personalInfo.emergencyContact.relationship || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Emergency Contact Phone</h4>
                        <p className="text-sm">{application.personalInfo.emergencyContact.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Emergency Contact Address</h4>
                        <p className="text-sm">{application.personalInfo.emergencyContact.address || "Not provided"}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Passport Details Tab */}
          <TabsContent value="passport" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" /> Passport Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Passport Type</h4>
                    <p className="text-sm">{application.passportType || "Ordinary"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Application Reason</h4>
                    <p className="text-sm">{application.personalInfo.applicationReason || "New"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Delivery Option</h4>
                    <p className="text-sm">{application.deliveryOption || "Regular"}</p>
                  </div>
                </div>

                {application.personalInfo.oldPassportNumber && (
                  <>
                    <Separator className="my-2" />
                    <div>
                      <h3 className="text-sm font-medium mb-2">Previous Passport Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Previous Passport Number</h4>
                          <p className="text-sm">{application.personalInfo.oldPassportNumber}</p>
                        </div>
                        {application.personalInfo.oldPassportIssueDate && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Issue Date</h4>
                            <p className="text-sm">{formatDate(application.personalInfo.oldPassportIssueDate)}</p>
                          </div>
                        )}
                        {application.personalInfo.oldPassportExpiryDate && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Expiry Date</h4>
                            <p className="text-sm">{formatDate(application.personalInfo.oldPassportExpiryDate)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 