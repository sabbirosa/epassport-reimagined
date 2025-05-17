// Application status type
export type ApplicationStatus =
  | "draft"
  | "submitted"
  | "processing"
  | "payment_pending"
  | "offline_payment_pending"
  | "payment_confirmed"
  | "appointment_scheduled"
  | "biometrics_completed"
  | "approved"
  | "rejected"
  | "pending_final_approval"
  | "passport_in_queue"
  | "ready_for_delivery"
  | "delivered";

// Application tracking data type
export type ApplicationTrackingData = {
  id: string;
  status: ApplicationStatus;
  name: string;
  submissionDate: string;
  appointmentDate: string | null;
  estimatedDelivery: string | null;
  lastUpdated: string;
};

// Mock application data for demo purposes
const mockApplications: Record<string, ApplicationTrackingData> = {
  "BD-1234567890": {
    id: "BD-1234567890",
    status: "submitted",
    name: "Kabir Ahmed",
    submissionDate: "2023-11-15",
    appointmentDate: "2023-11-22",
    estimatedDelivery: null,
    lastUpdated: "2023-11-15",
  },
  "BD-2345678901": {
    id: "BD-2345678901",
    status: "biometrics_completed",
    name: "Nadia Rahman",
    submissionDate: "2023-10-20",
    appointmentDate: "2023-10-30",
    estimatedDelivery: "2023-12-10",
    lastUpdated: "2023-10-30",
  },
  "BD-3456789012": {
    id: "BD-3456789012",
    status: "approved",
    name: "Mohammed Islam",
    submissionDate: "2023-09-05",
    appointmentDate: "2023-09-12",
    estimatedDelivery: "2023-11-30",
    lastUpdated: "2023-11-10",
  },
  "BD-4567890123": {
    id: "BD-4567890123",
    status: "delivered",
    name: "Fatima Khan",
    submissionDate: "2023-08-10",
    appointmentDate: "2023-08-17",
    estimatedDelivery: "2023-10-01",
    lastUpdated: "2023-10-05",
  },
};

/**
 * Track an application by ID
 * 
 * @param applicationId The application ID to track
 * @returns The application tracking data or null if not found
 */
export async function trackApplication(applicationId: string): Promise<ApplicationTrackingData | null> {
  // In a real application, this would make an API call
  // For now, we'll simulate a delay and return mock data
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockApplications[applicationId] || null;
}

/**
 * Generate a new application ID
 * 
 * @returns A new unique application ID
 */
export function generateApplicationId(): string {
  return `BD-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
}

/**
 * Get the estimated processing time based on application type
 * 
 * @param deliveryOption The delivery option ("regular" or "express")
 * @returns The estimated processing time in weeks
 */
export function getEstimatedProcessingTime(deliveryOption: "regular" | "express"): number {
  return deliveryOption === "express" ? 1 : 3;
}

/**
 * Get human-readable status description
 * 
 * @param status The application status
 * @returns A human-readable description of the status
 */
export function getStatusDescription(status: ApplicationStatus): string {
  const statusDescriptions: Record<ApplicationStatus, string> = {
    draft: "Your application has been saved as a draft. Please complete and submit your application.",
    submitted: "Your application has been received and is awaiting initial processing.",
    processing: "Your application is being processed by our team.",
    payment_pending: "Please complete your payment to proceed with your application.",
    offline_payment_pending: "Your offline payment is pending verification. Please allow 1-2 business days for confirmation.",
    payment_confirmed: "Your payment has been confirmed. Please schedule your biometric appointment.",
    appointment_scheduled: "Your biometric appointment has been scheduled. Your documents will be verified during your visit.",
    biometrics_completed: "Your documents have been verified and your biometrics have been recorded.",
    approved: "Your passport application has been approved.",
    rejected: "Your application has been rejected. Please see the details for more information.",
    pending_final_approval: "Your application is pending final approval from senior officials.",
    passport_in_queue: "Your passport is in the printing queue.",
    ready_for_delivery: "Your passport is ready for delivery and awaiting collection.",
    delivered: "Your passport has been delivered.",
  };

  return statusDescriptions[status];
}

/**
 * Get the next steps based on the current application status
 * 
 * @param status The current application status
 * @returns Array of next steps for the applicant
 */
export function getNextSteps(status: ApplicationStatus): string[] {
  switch (status) {
    case "draft":
      return ["Complete all required fields", "Submit your application", "Make payment"];
    case "submitted":
      return ["Your application has been submitted", "Next step: Payment verification"];
    case "payment_pending":
      return ["Complete payment for your application", "You can pay online or through bank transfer"];
    case "offline_payment_pending":
      return ["Your offline payment is pending verification", "Please allow 1-2 business days for confirmation"];
    case "payment_confirmed":
      return ["Your payment has been confirmed", "Please schedule your biometric appointment"];
    case "appointment_scheduled":
      return ["Attend your biometric appointment", "Bring all original documents for verification"];
    case "biometrics_completed":
      return ["Your documents have been verified", "Your biometrics have been recorded"];
    case "approved":
      return ["Your application is approved", "Wait for final approval process to complete"];
    case "pending_final_approval":
      return ["Your application is pending final approval", "This is the last verification step"];
    case "passport_in_queue":
      return ["Your passport is in the printing queue", "This process typically takes 2-3 business days"];
    case "ready_for_delivery":
      return ["Your passport is ready for delivery", "You will be contacted for collection or delivery"];
    case "delivered":
      return ["Your passport has been delivered", "Keep your passport safe"];
    case "rejected":
      return ["Review the rejection reasons", "Contact support for more information", "Consider reapplying if eligible"];
    default:
      return ["Continue to check the status of your application"];
  }
} 