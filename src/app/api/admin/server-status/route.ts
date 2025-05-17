import { getServerStatus, getServerStatusHistory } from "@/lib/services/server-status";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET handler for current server status
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const includeHistory = searchParams.get("history") === "true";
    
    // Get current server status
    const status = await getServerStatus();
    
    if (includeHistory) {
      // Get historical data if requested
      const history = await getServerStatusHistory();
      return NextResponse.json({ status, history });
    }
    
    return NextResponse.json({ status });
  } catch (error) {
    console.error("Error fetching server status:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching server status" },
      { status: 500 }
    );
  }
} 