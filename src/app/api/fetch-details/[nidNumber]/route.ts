import birthCertificates from '@/data/birth-certificates.json';
import nidData from '@/data/nid.json';
import passports from '@/data/passports.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ nidNumber: string }> }
) {
  try {
    const params = await context.params;
    const { nidNumber } = params;
    
    // Simulate API delay for demo feel
    await new Promise(resolve => setTimeout(resolve, 2000));
    
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
    
    // Find the birth certificate that matches the NID holder's name
    const birthCertificate = birthCertificates.find(
      cert => cert.name === nidRecord.name
    );
    
    // Find any existing passports for this person
    const existingPassports = passports.filter(
      passport => passport.name === nidRecord.name
    );
    
    // Create the response with all available data
    const response = {
      success: true,
      message: 'Personal details retrieved successfully',
      data: {
        nid: nidRecord,
        birthCertificate: birthCertificate || null,
        existingPassports: existingPassports || [],
        hasExistingPassport: existingPassports.length > 0,
        isEligibleForRenewal: existingPassports.some(p => {
          const expiryDate = new Date(p.dateOfExpiry);
          const now = new Date();
          const sixMonthsFromNow = new Date(now.getTime() + (6 * 30 * 24 * 60 * 60 * 1000));
          return expiryDate <= sixMonthsFromNow;
        })
      }
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error fetching complete details:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'Failed to retrieve personal details' 
      },
      { status: 500 }
    );
  }
} 