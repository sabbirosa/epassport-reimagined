import { trackApplication } from "@/lib/services/track-service";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler for tracking an application by ID
 */
export async function GET(request: NextRequest) {
  const searchParams = new URL(request.url).searchParams;
  const applicationId = searchParams.get("id");

  if (!applicationId) {
    return NextResponse.json(
      { error: "Application ID is required" },
      { status: 400 }
    );
  }

  // Validate application ID format
  const applicationIdPattern = /^BD-\d+$/;
  if (!applicationIdPattern.test(applicationId)) {
    return NextResponse.json(
      { error: "Invalid application ID format. Expected format: BD-XXXXXXXXXX" },
      { status: 400 }
    );
  }

  try {
    // Attempt to find the application
    const application = await trackApplication(applicationId);

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Return the application data
    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error tracking application:", error);
    return NextResponse.json(
      { error: "An error occurred while tracking the application" },
      { status: 500 }
    );
  }
} 