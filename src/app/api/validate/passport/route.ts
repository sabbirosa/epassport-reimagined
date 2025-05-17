import applicationData from '@/data/applications.json';
import passportData from '@/data/passports.json';
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

    // If no old passport number, return appropriate message
    if (!application.oldPassportNumber) {
      return NextResponse.json({
        status: 'info',
        message: 'No previous passport found for this applicant',
        isNewApplicant: true
      });
    }

    // Find the passport in our database
    const passport = passportData.find(
      p => p.passportNumber === application.oldPassportNumber
    );
    
    if (!passport) {
      return NextResponse.json({
        status: 'warning',
        message: 'Passport number provided but record not found in database',
        isNewApplicant: false
      });
    }

    // Create a comparison object to show matching fields
    const comparison = {
      passportNumber: application.oldPassportNumber,
      name: {
        value: passport.name,
        matches: passport.name === application.name
      },
      fatherName: {
        value: passport.fatherName,
        matches: passport.fatherName === application.fatherName
      },
      motherName: {
        value: passport.motherName,
        matches: passport.motherName === application.motherName
      },
      dateOfBirth: {
        value: passport.dateOfBirth,
        matches: passport.dateOfBirth === application.dateOfBirth
      },
      placeOfBirth: {
        value: passport.placeOfBirth,
        matches: passport.placeOfBirth === application.placeOfBirth
      },
      gender: {
        value: passport.gender,
        matches: passport.gender === application.gender
      }
    };

    return NextResponse.json({
      status: 'success',
      passport,
      comparison,
      isExpired: new Date(passport.dateOfExpiry) < new Date(),
      isNewApplicant: false
    });
  } catch (error) {
    console.error('Error validating passport:', error);
    return NextResponse.json(
      { error: 'Failed to validate passport' },
      { status: 500 }
    );
  }
} 