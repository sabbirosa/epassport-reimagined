"use client";

import ApplicationDetailsDialog from "@/components/admin/ApplicationDetailsDialog";
import DataVerificationDialog from "@/components/admin/DataVerificationDialog";
import DocumentVerificationDialog from "@/components/admin/DocumentVerificationDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import applicationData from '@/data/applications.json';
import { CheckCircle, FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Status configuration for UI rendering
const statusConfig = {
  draft: { color: "bg-gray-100 text-gray-800", label: "Draft" },
  submitted: { color: "bg-blue-100 text-blue-800", label: "Submitted" },
  processing: { color: "bg-purple-100 text-purple-800", label: "Processing" },
  payment_pending: { color: "bg-yellow-100 text-yellow-800", label: "Payment Pending" },
  offline_payment_pending: { color: "bg-amber-100 text-amber-800", label: "Offline Payment Pending" },
  payment_confirmed: { color: "bg-green-100 text-green-800", label: "Payment Confirmed" },
  appointment_scheduled: { color: "bg-blue-100 text-blue-800", label: "Appointment Scheduled" },
  biometrics_completed: { color: "bg-indigo-100 text-indigo-800", label: "Biometrics Completed" },
  approved: { color: "bg-green-100 text-green-800", label: "Approved" },
  rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
  pending_final_approval: { color: "bg-amber-100 text-amber-800", label: "Pending Final Approval" },
  passport_in_queue: { color: "bg-blue-100 text-blue-800", label: "Passport In Queue" },
  ready_for_delivery: { color: "bg-indigo-100 text-indigo-800", label: "Ready For Delivery" },
  delivered: { color: "bg-emerald-100 text-emerald-800", label: "Delivered" },
};

type Application = typeof applicationData[0];

export default function ApplicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  const [isDataDialogOpen, setIsDataDialogOpen] = useState(false);
  const [isDocDialogOpen, setIsDocDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [applications, setApplications] = useState<typeof applicationData>([]);
  const [currentApplication, setCurrentApplication] = useState<Application | null>(null);

  useEffect(() => {
    // In a real app, this would be a fetch request to an API
    setApplications(applicationData);
    setLoading(false);
  }, []);

  // Filter applications based on search query and status filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      app.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Helper to render status badge
  const renderStatusBadge = (status: string) => {
    const config = statusConfig[status as keyof typeof statusConfig] || 
      { color: "bg-gray-100 text-gray-800", label: status };
    
    return (
      <span className={`${config.color} px-2 py-1 rounded-full text-xs font-medium`}>
        {config.label}
      </span>
    );
  };
  
  // Helper to determine action buttons based on status
  const renderActionButtons = (application: typeof applicationData[0]) => {
    switch(application.status) {
      case "submitted":
        return (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8" 
              onClick={() => handleDataVerification(application)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Verify Data
            </Button>
          </div>
        );
      case "payment_confirmed":
        return (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 text-green-600 hover:text-green-700" 
              onClick={() => handleDocVerification(application.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Verify Documents
            </Button>
          </div>
        );
      case "offline_payment_pending":
        return (
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 text-amber-600 hover:text-amber-700"
              onClick={() => updateStatus(application.id, "payment_confirmed")}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Confirm Payment
            </Button>
          </div>
        );
      case "appointment_scheduled":
        return (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8 text-indigo-600 hover:text-indigo-700" 
              onClick={() => updateStatus(application.id, "biometrics_completed")}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Proceed to Biometrics
            </Button>
          </div>
        );
      case "biometrics_completed":
        return (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="h-8" onClick={() => updateStatus(application.id, "approved")}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Confirm Biometrics Completion
            </Button>
          </div>
        );
      case "approved":
        return (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="h-8" onClick={() => updateStatus(application.id, "pending_final_approval")}>
              <FileText className="h-4 w-4 mr-1" />
              Send for Final Approval
            </Button>
          </div>
        );
      case "pending_final_approval":
        return (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="h-8" onClick={() => updateStatus(application.id, "passport_in_queue")}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Final Approval Complete
            </Button>
          </div>
        );
      case "passport_in_queue":
        return (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="h-8" onClick={() => updateStatus(application.id, "ready_for_delivery")}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Passport Printed
            </Button>
          </div>
        );
      case "ready_for_delivery":
        return (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="h-8" onClick={() => updateStatus(application.id, "delivered")}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark as Delivered
            </Button>
          </div>
        );
      case "delivered":
        return (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8" 
              onClick={() => handleViewDetails(application)}
            >
              <FileText className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>
        );
      default:
        return (
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="h-8" 
              onClick={() => handleViewDetails(application)}
            >
              <FileText className="h-4 w-4 mr-1" />
              View Application
            </Button>
          </div>
        );
    }
  };

  const handleViewDetails = (application: Application) => {
    setCurrentApplication(application);
    setIsDetailsDialogOpen(true);
  };

  const updateStatus = async (applicationId: string, newStatus: string, paymentMethod?: string) => {
    setLoading(true);
    try {
      const payload: any = {
        applicationId,
        status: newStatus,
      };
      
      // If payment method is provided, include it in the payload
      if (paymentMethod) {
        payload.paymentMethod = paymentMethod;
      }
      
      const response = await fetch('/api/applications/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        // Update the local applications state
        setApplications(prevApps => 
          prevApps.map(app => 
            app.id === applicationId 
              ? { 
                  ...app, 
                  status: newStatus, 
                  lastUpdated: new Date().toISOString(),
                  ...(paymentMethod && { paymentMethod }),
                } 
              : app
          )
        );
        
        toast.success(`Application status updated to ${statusConfig[newStatus as keyof typeof statusConfig]?.label || newStatus}`);
      }
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status");
    } finally {
      setLoading(false);
    }
  };

  const handleDataVerification = (application: Application) => {
    setCurrentApplication(application);
    setIsDataDialogOpen(true);
  };

  const handleDocVerification = (applicationId: string) => {
    setSelectedApplication(applicationId);
    setIsDocDialogOpen(true);
  };

  const handleDataConfirm = () => {
    if (currentApplication) {
      updateStatus(currentApplication.id, "payment_pending");
      setIsDataDialogOpen(false);
      toast.success("Application verified successfully");
    }
  };

  const handleApprove = async () => {
    if (selectedApplication) {
      await updateStatus(selectedApplication, 'biometrics_completed');
    }
    setIsDocDialogOpen(false);
  };

  const handleReject = async () => {
    if (selectedApplication) {
      await updateStatus(selectedApplication, 'rejected');
    }
    setIsDocDialogOpen(false);
  };

  const handleProceedToBiometrics = async () => {
    if (selectedApplication) {
      await updateStatus(selectedApplication, 'biometrics_completed');
    }
    setIsDocDialogOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Application Management</h1>
          <p className="text-gray-500">Process and manage passport applications</p>
        </div>
        <Button>
          Export to CSV
        </Button>
      </div>
      
      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Filters</CardTitle>
          <CardDescription>
            Filter and search applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search by ID or name..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="payment_pending">Payment Pending</SelectItem>
                  <SelectItem value="offline_payment_pending">Offline Payment Pending</SelectItem>
                  <SelectItem value="payment_confirmed">Payment Confirmed</SelectItem>
                  <SelectItem value="appointment_scheduled">Appointment Scheduled</SelectItem>
                  <SelectItem value="biometrics_completed">Biometrics Completed</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="pending_final_approval">Pending Final Approval</SelectItem>
                  <SelectItem value="passport_in_queue">Passport In Queue</SelectItem>
                  <SelectItem value="ready_for_delivery">Ready For Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            {filteredApplications.length} applications found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-3">
              {Array(5).fill(null).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.id}</TableCell>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{renderStatusBadge(application.status)}</TableCell>
                    <TableCell>{new Date(application.submissionDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(application.lastUpdated).toLocaleDateString()}</TableCell>
                    <TableCell>{renderActionButtons(application)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Document Verification Dialog */}
      <DocumentVerificationDialog
        isOpen={isDocDialogOpen}
        onClose={() => setIsDocDialogOpen(false)}
        onApprove={handleApprove}
        onReject={handleReject}
        onProceedToBiometrics={handleProceedToBiometrics}
        applicationId={selectedApplication || ""}
        applicationData={applications.find(app => app.id === selectedApplication) || { name: "", submissionDate: "", status: "" }}
      />
      
      {/* Data Verification Dialog */}
      <DataVerificationDialog
        isOpen={isDataDialogOpen}
        onClose={() => setIsDataDialogOpen(false)}
        onConfirm={handleDataConfirm}
        application={currentApplication}
      />

      {/* Application Details Dialog */}
      <ApplicationDetailsDialog
        isOpen={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        application={currentApplication}
      />
    </div>
  );
} 