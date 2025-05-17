"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, File, Upload, X } from "lucide-react";
import { useState } from "react";

// Define document types and requirements
export type DocumentType = 
  | "national_id" 
  | "birth_certificate" 
  | "passport_photo" 
  | "signature" 
  | "supporting_document";

export interface DocumentRequirement {
  id: DocumentType;
  title: string;
  description: string;
  required: boolean;
  acceptedFormats: string[];
  maxSizeMB: number;
}

export const documentRequirements: DocumentRequirement[] = [
  {
    id: "national_id",
    title: "National ID Card",
    description: "Front and back of your National ID Card in a single image or PDF",
    required: true,
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    maxSizeMB: 5,
  },
  {
    id: "birth_certificate",
    title: "Birth Certificate",
    description: "Scanned copy of your birth certificate",
    required: true,
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    maxSizeMB: 5,
  },
  {
    id: "passport_photo",
    title: "Passport Photo",
    description: "Recent passport-sized photograph (3.5cm x 4.5cm) with white background",
    required: true,
    acceptedFormats: [".jpg", ".jpeg", ".png"],
    maxSizeMB: 2,
  },
  {
    id: "signature",
    title: "Signature",
    description: "Clear image of your signature on white paper",
    required: true,
    acceptedFormats: [".jpg", ".jpeg", ".png"],
    maxSizeMB: 1,
  },
  {
    id: "supporting_document",
    title: "Supporting Documents",
    description: "Any additional supporting documents (if applicable)",
    required: false,
    acceptedFormats: [".jpg", ".jpeg", ".png", ".pdf"],
    maxSizeMB: 10,
  },
];

export interface UploadedDocument {
  documentType: DocumentType;
  file: File;
  preview: string;
  uploadProgress: number;
  status: "uploading" | "uploaded" | "error";
  errorMessage?: string;
}

interface DocumentUploadProps {
  applicationId?: string;
  onDocumentsChange?: (documents: UploadedDocument[]) => void;
  initialDocuments?: UploadedDocument[];
}

export default function DocumentUpload({
  applicationId,
  onDocumentsChange,
  initialDocuments = [],
}: DocumentUploadProps) {
  const [documents, setDocuments] = useState<UploadedDocument[]>(initialDocuments);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Handle file upload
  const handleFileUpload = (documentType: DocumentType, file: File) => {
    // Check file type
    const requirement = documentRequirements.find(doc => doc.id === documentType);
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    if (!requirement) {
      setUploadError(`Invalid document type: ${documentType}`);
      return;
    }
    
    if (!requirement.acceptedFormats.includes(fileExtension)) {
      setUploadError(`Invalid file format for ${requirement.title}. Accepted formats: ${requirement.acceptedFormats.join(", ")}`);
      return;
    }
    
    // Check file size
    if (file.size > requirement.maxSizeMB * 1024 * 1024) {
      setUploadError(`File size exceeds the maximum allowed size (${requirement.maxSizeMB}MB) for ${requirement.title}`);
      return;
    }
    
    setUploadError(null);
    
    // Create file preview
    const reader = new FileReader();
    reader.onloadend = () => {
      // Remove any existing document of the same type
      const updatedDocuments = documents.filter(doc => doc.documentType !== documentType);
      
      // Add the new document
      const newDocument: UploadedDocument = {
        documentType,
        file,
        preview: reader.result as string,
        uploadProgress: 0,
        status: "uploading",
      };
      
      const newDocuments = [...updatedDocuments, newDocument];
      setDocuments(newDocuments);
      
      if (onDocumentsChange) {
        onDocumentsChange(newDocuments);
      }
      
      // Simulate upload progress
      simulateUpload(documentType);
    };
    
    reader.readAsDataURL(file);
  };
  
  // Simulate file upload with progress
  const simulateUpload = (documentType: DocumentType) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      
      setDocuments(prevDocs => 
        prevDocs.map(doc => 
          doc.documentType === documentType
            ? { 
                ...doc, 
                uploadProgress: progress,
                status: progress < 100 ? "uploading" : "uploaded" as const
              }
            : doc
        )
      );
      
      if (progress >= 100) {
        clearInterval(interval);
        
        // Update documents and notify parent
        const updatedDocuments = documents.map(doc => 
          doc.documentType === documentType
            ? { ...doc, uploadProgress: 100, status: "uploaded" as const }
            : doc
        );
        
        setDocuments(updatedDocuments);
        
        if (onDocumentsChange) {
          onDocumentsChange(updatedDocuments);
        }
      }
    }, 300);
  };
  
  // Remove a document
  const removeDocument = (documentType: DocumentType) => {
    const updatedDocuments = documents.filter(doc => doc.documentType !== documentType);
    setDocuments(updatedDocuments);
    
    if (onDocumentsChange) {
      onDocumentsChange(updatedDocuments);
    }
  };
  
  // Check if a document has been uploaded
  const isDocumentUploaded = (documentType: DocumentType) => {
    return documents.some(doc => doc.documentType === documentType && doc.status === "uploaded");
  };
  
  // Get document preview if available
  const getDocumentPreview = (documentType: DocumentType) => {
    return documents.find(doc => doc.documentType === documentType)?.preview;
  };
  
  // Get document upload progress
  const getDocumentProgress = (documentType: DocumentType) => {
    return documents.find(doc => doc.documentType === documentType)?.uploadProgress || 0;
  };
  
  // Get document status
  const getDocumentStatus = (documentType: DocumentType) => {
    return documents.find(doc => doc.documentType === documentType)?.status;
  };
  
  return (
    <div className="space-y-6">
      {uploadError && (
        <Alert variant="destructive">
          <AlertDescription>{uploadError}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {documentRequirements.map((requirement) => (
          <Card key={requirement.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center justify-between">
                <span>{requirement.title}</span>
                {requirement.required && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Required</span>
                )}
              </CardTitle>
              <CardDescription className="text-sm">
                {requirement.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-2">
              {isDocumentUploaded(requirement.id) ? (
                <div className="relative">
                  {getDocumentPreview(requirement.id)?.startsWith('data:image') ? (
                    <div className="relative h-40 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      <img 
                        src={getDocumentPreview(requirement.id)} 
                        alt={requirement.title}
                        className="max-h-full max-w-full object-contain" 
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                      <div className="flex flex-col items-center text-gray-500">
                        <File className="h-10 w-10 mb-2" />
                        <span className="text-sm">
                          {documents.find(doc => doc.documentType === requirement.id)?.file.name}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  <button 
                    onClick={() => removeDocument(requirement.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white"
                    aria-label="Remove document"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : getDocumentStatus(requirement.id) === "uploading" ? (
                <div className="h-40 bg-gray-100 rounded flex flex-col items-center justify-center p-4">
                  <div className="w-full mb-2">
                    <Progress value={getDocumentProgress(requirement.id)} className="h-2" />
                  </div>
                  <p className="text-sm text-gray-500">
                    Uploading... {getDocumentProgress(requirement.id)}%
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="file"
                    id={`upload-${requirement.id}`}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept={requirement.acceptedFormats.join(",")}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(requirement.id, e.target.files[0]);
                      }
                    }}
                  />
                  <div className="h-40 border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center p-4 hover:bg-gray-50 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm font-medium">Click or drag to upload</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Max size: {requirement.maxSizeMB}MB
                    </p>
                    <p className="text-xs text-gray-500">
                      Formats: {requirement.acceptedFormats.join(", ")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="pt-0">
              <div className="text-xs text-gray-500 w-full flex items-center">
                {isDocumentUploaded(requirement.id) && (
                  <span className="flex items-center text-green-500">
                    <Check className="h-3 w-3 mr-1" /> 
                    Uploaded
                  </span>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 