import { updateNotificationPreferences } from "@/lib/services/notification-service";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler for retrieving notification preferences
 */
export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required" },
      { status: 400 }
    );
  }

  try {
    // In a real app, we'd retrieve the user's notification preferences from the database
    // For this demo, we'll just return some mock data
    const preferences = {
      userId,
      email: true,
      sms: true,
      push: false,
      emailAddress: "user@example.com",
      phoneNumber: "01712345678",
    };

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error("Error retrieving notification preferences:", error);
    return NextResponse.json(
      { error: "An error occurred while retrieving notification preferences" },
      { status: 500 }
    );
  }
}

/**
 * POST handler for updating notification preferences
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, email, sms, push } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Update notification preferences
    const preferences = await updateNotificationPreferences(userId, {
      email,
      sms,
      push,
    });

    return NextResponse.json({ 
      message: "Notification preferences updated successfully",
      preferences 
    });
  } catch (error) {
    console.error("Error updating notification preferences:", error);
    return NextResponse.json(
      { error: "An error occurred while updating notification preferences" },
      { status: 500 }
    );
  }
} 