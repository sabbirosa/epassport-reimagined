import birthCertificates from '@/data/birth-certificates.json';
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // First, find the corresponding NID record to get the name
    const nidRecord = nidData.find(record => record.nidNumber === nidNumber);
    
    if (!nidRecord) {
      return NextResponse.json(
        { 
          error: 'NID not found', 
          message: 'Cannot verify birth certificate without valid NID.' 
        },
        { status: 404 }
      );
    }
    
    // Find the birth certificate that matches the NID holder's name
    const birthCertificate = birthCertificates.find(
      cert => cert.name === nidRecord.name
    );
    
    if (!birthCertificate) {
      return NextResponse.json(
        { 
          error: 'Birth certificate not found', 
          message: 'No birth certificate found matching the NID information.' 
        },
        { status: 404 }
      );
    }
    
    // Return the birth certificate data
    return NextResponse.json({
      success: true,
      data: birthCertificate,
      message: 'Birth certificate retrieved and verified successfully'
    });
    
  } catch (error) {
    console.error('Error fetching birth certificate:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'Failed to retrieve birth certificate information' 
      },
      { status: 500 }
    );
  }
} 