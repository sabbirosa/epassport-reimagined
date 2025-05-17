import applicationData from '@/data/applications.json';
import nidData from '@/data/nid.json';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const applicationId = searchParams.get('applicationId');

  if (!applicationId) {
    return NextResponse.json(
      { error: 'Application ID is required' },
      { status: 400 }
    );
  }

  try {
    // Find the application in our database
    const application = applicationData.find(app => app.id === applicationId);
    
    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Find the NID in our database
    const nidRecord = nidData.find(nid => nid.nidNumber === application.nidNumber);
    
    if (!nidRecord) {
      return NextResponse.json(
        { error: 'NID not found in database' },
        { status: 404 }
      );
    }

    // Create a comparison object to show matching fields
    const comparison = {
      nidNumber: application.nidNumber,
      name: {
        value: nidRecord.name,
        matches: nidRecord.name === application.name
      },
      fatherName: {
        value: nidRecord.fatherName,
        matches: nidRecord.fatherName === application.fatherName
      },
      motherName: {
        value: nidRecord.motherName,
        matches: nidRecord.motherName === application.motherName
      },
      dateOfBirth: {
        value: nidRecord.dateOfBirth,
        matches: nidRecord.dateOfBirth === application.dateOfBirth
      },
      placeOfBirth: {
        value: nidRecord.placeOfBirth,
        matches: nidRecord.placeOfBirth === application.placeOfBirth
      },
      gender: {
        value: nidRecord.gender,
        matches: nidRecord.gender === application.gender
      }
    };

    return NextResponse.json({
      status: 'success',
      nidRecord,
      comparison
    });
  } catch (error) {
    console.error('Error validating NID:', error);
    return NextResponse.json(
      { error: 'Failed to validate NID' },
      { status: 500 }
    );
  }
} 