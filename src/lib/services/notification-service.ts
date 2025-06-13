import { ApplicationStatus } from "./track-service";

/**
 * Notification types supported by the system
 */
export type NotificationType = "sms" | "email" | "push";

/**
 * Status update notification content
 */
export type StatusNotification = {
  applicationId: string;
  status: ApplicationStatus;
  recipientName: string;
  recipientPhone?: string;
  recipientEmail?: string;
  appointmentDate?: string;
  estimatedDelivery?: string;
  additionalInfo?: string;
};

/**
 * User notification preferences
 */
export type NotificationPreferences = {
  userId: string;
  email: boolean;
  sms: boolean;
  push: boolean;
};

/**
 * Send an SMS notification
 * 
 * @param phoneNumber Phone number to send the notification to
 * @param message The message content
 * @returns True if message was sent successfully
 */
export async function sendSmsNotification(phoneNumber: string, message: string): Promise<boolean> {
  // In a real implementation, this would use an SMS gateway API
  console.log(`[SMS] To: ${phoneNumber}, Message: ${message}`);
  
  // Simulate async API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return true;
}

/**
 * Send an email notification
 * 
 * @param email Email address to send the notification to
 * @param subject Email subject
 * @param body Email body content
 * @returns True if email was sent successfully
 */
export async function sendEmailNotification(email: string, subject: string, body: string): Promise<boolean> {
  // In a real implementation, this would use an email service API
  console.log(`[Email] To: ${email}, Subject: ${subject}, Body: ${body}`);
  
  // Simulate async API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return true;
}

/**
 * Create appropriate notification content based on application status
 * 
 * @param notification Notification data
 * @returns Message object with subject and body
 */
export function createStatusNotificationContent(notification: StatusNotification): { subject: string; body: string } {
  const { applicationId, status, recipientName, appointmentDate, estimatedDelivery } = notification;
  
  // Base message patterns
  const statusMessages = {
    submitted: {
      subject: "Application Submitted: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application (${applicationId}) has been successfully submitted. We will review your application and notify you of the next steps.`
    },
    payment_confirmed: {
      subject: "Payment Confirmed: Your e-Passport Application",
      body: `Dear ${recipientName}, we have received payment for your e-Passport application (${applicationId}). Your application is now being processed.`
    },
    appointment_scheduled: {
      subject: "Biometric Appointment Scheduled: Your e-Passport Application",
      body: `Dear ${recipientName}, your biometric appointment for e-Passport application (${applicationId}) has been scheduled for ${appointmentDate || "[date]"}. Please arrive 15 minutes early with all required documents.`
    },
    biometrics_completed: {
      subject: "Biometrics Completed: Your e-Passport Application",
      body: `Dear ${recipientName}, we have successfully recorded your biometric data for e-Passport application (${applicationId}). Your application is now being processed.`
    },
    under_review: {
      subject: "Application Under Review: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application (${applicationId}) is currently under review. This process typically takes 2-3 weeks.`
    },
    approved: {
      subject: "Application Approved: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application (${applicationId}) has been approved! Your passport is now being printed and will be delivered to you.${estimatedDelivery ? ` Estimated delivery date: ${estimatedDelivery}.` : ''}`
    },
    delivered: {
      subject: "Passport Delivered: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport (${applicationId}) has been delivered. If you haven't received it, please contact our support.`
    },
    rejected: {
      subject: "Application Status Update: Your e-Passport Application",
      body: `Dear ${recipientName}, we regret to inform you that your e-Passport application (${applicationId}) has been rejected. Please log in to your account to view the reason and how to proceed.`
    },
    // Default messages for other statuses
    draft: {
      subject: "Draft Saved: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application draft (${applicationId}) has been saved. You can complete it at any time.`
    },
    processing: {
      subject: "Application Processing: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application (${applicationId}) is being processed. We'll update you on any developments.`
    },
    payment_pending: {
      subject: "Payment Required: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application (${applicationId}) is awaiting payment. Please complete the payment to proceed.`
    },
    offline_payment_pending: {
      subject: "Offline Payment Required: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application (${applicationId}) is awaiting offline payment verification. Please complete the bank deposit and provide the transaction details.`
    },
    pending_final_approval: {
      subject: "Pending Final Approval: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application (${applicationId}) is pending final approval. We will notify you once the approval process is complete.`
    },
    passport_in_queue: {
      subject: "Passport in Production Queue: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport application (${applicationId}) has been approved and is now in the production queue. Your passport will be printed soon.`
    },
    ready_for_delivery: {
      subject: "Ready for Delivery: Your e-Passport Application",
      body: `Dear ${recipientName}, your e-Passport (${applicationId}) is ready for delivery.${estimatedDelivery ? ` Expected delivery date: ${estimatedDelivery}.` : ''} You will receive it soon.`
    }
  };
  
  // Get appropriate message for status or use generic message
  const message = statusMessages[status] || {
    subject: "Status Update: Your e-Passport Application",
    body: `Dear ${recipientName}, there has been an update to your e-Passport application (${applicationId}). Please check your application status online.`
  };
  
  // Add additional info if provided
  if (notification.additionalInfo) {
    message.body += `\n\nAdditional information: ${notification.additionalInfo}`;
  }
  
  // Add footer with help info
  message.body += "\n\nFor any questions, visit our website or contact our support center at support@bdpassport.gov.bd or +880 123456789.";
  
  return message;
}

/**
 * Send status change notification to the applicant through selected channels
 * 
 * @param notification Notification data with user contact info
 * @param channels Notification channels to use
 * @returns Success status of notification attempts
 */
export async function sendStatusNotification(
  notification: StatusNotification,
  channels: NotificationType[] = ["email", "sms"]
): Promise<Record<NotificationType, boolean>> {
  const results: Record<NotificationType, boolean> = {
    email: false,
    sms: false,
    push: false
  };
  
  const { subject, body } = createStatusNotificationContent(notification);
  
  // Send notifications through selected channels
  const sendPromises = channels.map(async (channel) => {
    try {
      if (channel === "email" && notification.recipientEmail) {
        results.email = await sendEmailNotification(
          notification.recipientEmail,
          subject,
          body
        );
      } else if (channel === "sms" && notification.recipientPhone) {
        // Create shorter SMS content (limited characters)
        const smsBody = body.split("\n\n")[0]; // Just use first paragraph for SMS
        results.sms = await sendSmsNotification(
          notification.recipientPhone,
          smsBody
        );
      } else if (channel === "push") {
        // Push notification implementation would go here
        // This is a placeholder for future implementation
        results.push = false;
      }
    } catch (error) {
      console.error(`Failed to send ${channel} notification:`, error);
      results[channel] = false;
    }
  });
  
  await Promise.all(sendPromises);
  
  return results;
}

/**
 * Update user notification preferences
 * 
 * @param userId User ID
 * @param preferences New notification preferences
 * @returns Updated notification preferences
 */
export async function updateNotificationPreferences(
  userId: string,
  preferences: Partial<Omit<NotificationPreferences, "userId">>
): Promise<NotificationPreferences> {
  // In a real application, this would update the database
  // For now, we'll simulate it
  
  // Mock current preferences
  const currentPrefs = {
    userId,
    email: true,
    sms: true,
    push: false
  };
  
  // Update with new preferences
  const updatedPrefs = {
    ...currentPrefs,
    ...preferences
  };
  
  // Simulate async API call
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return updatedPrefs;
} 