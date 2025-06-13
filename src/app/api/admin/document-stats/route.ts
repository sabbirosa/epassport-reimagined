import { NextResponse } from "next/server";

// Mock document statistics
const mockDocumentStats = {
  totalDocuments: 254,
  pendingReview: 38,
  approved: 189,
  rejected: 27,
  byType: {
    national_id: {
      total: 82,
      pending: 12,
      approved: 61,
      rejected: 9
    },
    birth_certificate: {
      total: 82,
      pending: 15,
      approved: 58,
      rejected: 9
    },
    passport_photo: {
      total: 82,
      pending: 8,
      approved: 68,
      rejected: 6
    },
    signature: {
      total: 5,
      pending: 2,
      approved: 2,
      rejected: 1
    },
    supporting_document: {
      total: 3,
      pending: 1,
      approved: 0,
      rejected: 2
    }
  },
  // Average document verification times in minutes
  avgProcessingTimes: {
    overall: 43,
    national_id: 38,
    birth_certificate: 55,
    passport_photo: 22,
    signature: 18,
    supporting_document: 62
  },
  // Number of documents processed in the last 7 days
  recentActivity: [
    { date: "2023-11-01", processed: 12 },
    { date: "2023-11-02", processed: 18 },
    { date: "2023-11-03", processed: 15 },
    { date: "2023-11-04", processed: 9 },
    { date: "2023-11-05", processed: 4 },
    { date: "2023-11-06", processed: 21 },
    { date: "2023-11-07", processed: 16 }
  ]
};

export async function GET() {
  try {
    // In a real application, this would fetch data from a database
    // and apply any filtering based on query parameters
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return NextResponse.json({
      success: true,
      data: mockDocumentStats
    });
  } catch (error) {
    console.error("Error fetching document statistics:", error);
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch document statistics" 
      },
      { status: 500 }
    );
  }
} 