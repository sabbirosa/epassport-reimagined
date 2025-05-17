import applicationData from '@/data/applications.json';
import birthCertificateData from '@/data/birth-certificates.json';
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

    // Find the birth certificate in our database
    const birthCertificate = birthCertificateData.find(
      cert => cert.certificateNumber === application.birthCertificateNumber
    );
    
    if (!birthCertificate) {
      return NextResponse.json(
        { error: 'Birth certificate not found in database' },
        { status: 404 }
      );
    }

    // Create a comparison object to show matching fields
    const comparison = {
      certificateNumber: application.birthCertificateNumber,
      name: {
        value: birthCertificate.name,
        matches: birthCertificate.name === application.name
      },
      fatherName: {
        value: birthCertificate.fatherName,
        matches: birthCertificate.fatherName === application.fatherName
      },
      motherName: {
        value: birthCertificate.motherName,
        matches: birthCertificate.motherName === application.motherName
      },
      dateOfBirth: {
        value: birthCertificate.dateOfBirth,
        matches: birthCertificate.dateOfBirth === application.dateOfBirth
      },
      placeOfBirth: {
        value: birthCertificate.placeOfBirth,
        matches: birthCertificate.placeOfBirth === application.placeOfBirth
      },
      gender: {
        value: birthCertificate.gender,
        matches: birthCertificate.gender === application.gender
      }
    };

    return NextResponse.json({
      status: 'success',
      birthCertificate,
      comparison
    });
  } catch (error) {
    console.error('Error validating birth certificate:', error);
    return NextResponse.json(
      { error: 'Failed to validate birth certificate' },
      { status: 500 }
    );
  }
} 