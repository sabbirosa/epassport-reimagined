import { NextRequest, NextResponse } from "next/server";

// Mock function to simulate document validation
function validateDocument(fileType: string, fileSize: number): { valid: boolean; message?: string } {
  // Check file type
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/pdf"
  ];
  
  if (!validTypes.includes(fileType)) {
    return {
      valid: false,
      message: "Invalid file type. Supported types: JPG, PNG, PDF"
    };
  }
  
  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (fileSize > maxSize) {
    return {
      valid: false,
      message: "File size exceeds the maximum allowed size (10MB)"
    };
  }
  
  return { valid: true };
}

// Mock function to simulate document processing
async function processDocument(formData: FormData): Promise<{ success: boolean; fileId?: string; error?: string }> {
  try {
    // Get document file and metadata
    const file = formData.get("file") as File | null;
    const documentType = formData.get("documentType") as string | null;
    
    if (!file || !documentType) {
      return {
        success: false,
        error: "Missing required fields: file or documentType"
      };
    }
    
    // Validate the document
    const validation = validateDocument(file.type, file.size);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.message
      };
    }
    
    // In a real implementation, we would:
    // 1. Upload the file to a storage service (e.g., S3, Azure Blob)
    // 2. Store metadata in a database
    // 3. Potentially trigger document processing/verification
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful upload
    const mockFileId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      success: true,
      fileId: mockFileId
    };
  } catch (error) {
    console.error("Error processing document upload:", error);
    return {
      success: false,
      error: "Failed to process document upload"
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    
    // Process the document
    const result = await processDocument(formData);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      fileId: result.fileId,
      message: "Document uploaded successfully"
    });
  } catch (error) {
    console.error("Error handling document upload:", error);
    
    return NextResponse.json(
      { error: "Failed to process the document upload request" },
      { status: 500 }
    );
  }
} 