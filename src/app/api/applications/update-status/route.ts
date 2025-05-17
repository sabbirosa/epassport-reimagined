import applicationData from '@/data/applications.json';
import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

// Add type definition for application
interface Application {
  id: string;
  name: string;
  status: string;
  submissionDate: string;
  lastUpdated: string;
  paymentStatus: string;
  appointmentDate: string | null;
  biometricsDate: string | null;
  notes: string;
  [key: string]: any; // Allow for other properties
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { applicationId, status, notes } = body;

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      );
    }

    // Find the application in our database
    const applications = applicationData as Application[];
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    
    if (applicationIndex === -1) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    // Create a copy of the applications data
    const updatedApplications = [...applications];
    
    // Update the status and last updated timestamp
    updatedApplications[applicationIndex] = {
      ...updatedApplications[applicationIndex],
      status,
      lastUpdated: new Date().toISOString(),
      notes: notes || updatedApplications[applicationIndex].notes
    };

    // Add additional fields based on status
    if (status === 'payment_confirmed') {
      updatedApplications[applicationIndex].paymentStatus = 'completed';
    } else if (status === 'appointment_scheduled') {
      updatedApplications[applicationIndex].appointmentDate = body.appointmentDate || new Date().toISOString();
    } else if (status === 'biometrics_completed') {
      updatedApplications[applicationIndex].biometricsDate = new Date().toISOString();
    }

    // Write the updated data back to the file
    const filePath = path.join(process.cwd(), 'src', 'data', 'applications.json');
    await fs.promises.writeFile(filePath, JSON.stringify(updatedApplications, null, 2));

    return NextResponse.json({
      status: 'success',
      message: 'Application status updated successfully',
      application: updatedApplications[applicationIndex]
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    return NextResponse.json(
      { error: 'Failed to update application status' },
      { status: 500 }
    );
  }
} 