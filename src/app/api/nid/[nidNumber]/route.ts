import nidData from '@/data/nid.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ nidNumber: string }> }
) {
  try {
    const params = await context.params;
    const { nidNumber } = params;
    
    // Simulate API delay for demo feel
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Find the NID record
    const nidRecord = nidData.find(record => record.nidNumber === nidNumber);
    
    if (!nidRecord) {
      return NextResponse.json(
        { 
          error: 'NID not found', 
          message: 'The provided NID number is not registered in our system.' 
        },
        { status: 404 }
      );
    }
    
    // Return the NID data
    return NextResponse.json({
      success: true,
      data: nidRecord,
      message: 'NID information retrieved successfully'
    });
    
  } catch (error) {
    console.error('Error fetching NID data:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'Failed to retrieve NID information' 
      },
      { status: 500 }
    );
  }
} 