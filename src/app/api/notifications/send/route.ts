import { sendStatusNotification, type NotificationType } from "@/lib/services/notification-service";
import { trackApplication } from "@/lib/services/track-service";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST handler for sending application status notifications
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { applicationId, channels } = body;

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    // Verify channels are valid
    if (channels && !Array.isArray(channels)) {
      return NextResponse.json(
        { error: "Channels must be an array" },
        { status: 400 }
      );
    }

    const validChannels: NotificationType[] = ["email", "sms", "push"];
    const requestedChannels = channels || ["email", "sms"];
    
    // Filter out invalid channels
    const validRequestedChannels = requestedChannels.filter((channel: string) => 
      validChannels.includes(channel as NotificationType)
    ) as NotificationType[];

    if (validRequestedChannels.length === 0) {
      return NextResponse.json(
        { error: "No valid notification channels provided" },
        { status: 400 }
      );
    }

    // Get application data
    const application = await trackApplication(applicationId);
    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Send notification
    const notificationResults = await sendStatusNotification(
      {
        applicationId,
        status: application.status,
        recipientName: application.name,
        recipientPhone: "01712345678", // For demo purposes
        recipientEmail: "user@example.com", // For demo purposes
        appointmentDate: application.appointmentDate || undefined,
        estimatedDelivery: application.estimatedDelivery || undefined,
        additionalInfo: "This is a test notification."
      },
      validRequestedChannels
    );

    return NextResponse.json({
      message: "Notification(s) sent successfully",
      results: notificationResults
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "An error occurred while sending the notification" },
      { status: 500 }
    );
  }
} 