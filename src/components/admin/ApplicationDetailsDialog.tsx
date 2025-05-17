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

interface ApplicationDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  application: any; // In a real app, you would type this properly
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
            Application #{application.id} - {application.name}
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
                  Submitted on {formatDate(application.submissionDate)}
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
                    <p className="text-sm">{formatDate(application.lastUpdated)}</p>
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
                      <p className="text-xs text-gray-500">{formatDate(application.submissionDate)}</p>
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
                      <p className="text-xs text-gray-500">{formatDate(application.lastUpdated)}</p>
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
                    <p className="text-sm">{application.name}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                    <p className="text-sm">{application.dateOfBirth || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Place of Birth</h4>
                    <p className="text-sm">{application.placeOfBirth || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Gender</h4>
                    <p className="text-sm">{application.gender || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Father's Name</h4>
                    <p className="text-sm">{application.fatherName || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Mother's Name</h4>
                    <p className="text-sm">{application.motherName || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Marital Status</h4>
                    <p className="text-sm">{application.maritalStatus || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Profession</h4>
                    <p className="text-sm">{application.profession || "Not provided"}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">National ID Number</h4>
                    <p className="text-sm">{application.nidNumber || "Not provided"}</p>
                  </div>
                  
                  {application.birthCertificateNumber && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Birth Certificate Number</h4>
                      <p className="text-sm">{application.birthCertificateNumber}</p>
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
                    <p className="text-sm">{application.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                    <p className="text-sm">{application.email || "Not provided"}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium flex items-center mb-2">
                    <MapPin className="mr-1 h-4 w-4" /> Present Address
                  </h3>
                  <p className="text-sm">
                    {application.presentAddress || "Not provided"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium flex items-center mb-2">
                    <MapPin className="mr-1 h-4 w-4" /> Permanent Address
                  </h3>
                  <p className="text-sm">
                    {application.permanentAddress || "Not provided"}
                  </p>
                </div>

                {application.emergencyContact && (
                  <div>
                    <h3 className="text-sm font-medium flex items-center mb-2">
                      <Phone className="mr-1 h-4 w-4" /> Emergency Contact
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Name</h4>
                        <p className="text-sm">{application.emergencyContact.name || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Relationship</h4>
                        <p className="text-sm">{application.emergencyContact.relationship || "Not provided"}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                        <p className="text-sm">{application.emergencyContact.phone || "Not provided"}</p>
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
                    <p className="text-sm">{application.applicationReason || "New"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Delivery Option</h4>
                    <p className="text-sm">{application.deliveryOption || "Regular"}</p>
                  </div>
                </div>

                {application.oldPassportNumber && (
                  <>
                    <Separator className="my-2" />
                    <div>
                      <h3 className="text-sm font-medium mb-2">Previous Passport Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Passport Number</h4>
                          <p className="text-sm">{application.oldPassportNumber}</p>
                        </div>
                        {application.oldPassportIssueDate && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Issue Date</h4>
                            <p className="text-sm">{formatDate(application.oldPassportIssueDate)}</p>
                          </div>
                        )}
                        {application.oldPassportExpiryDate && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">Expiry Date</h4>
                            <p className="text-sm">{formatDate(application.oldPassportExpiryDate)}</p>
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