import { z } from "zod";

// Personal Information Schema
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(100, { message: "Full name must be at most 100 characters" }),
  nid: z
    .string()
    .min(10, { message: "NID must be at least 10 characters" })
    .max(17, { message: "NID must be at most 17 characters" })
    .regex(/^\d+$/, { message: "NID must contain only numbers" }),
  dateOfBirth: z.string().refine((date) => {
    return !isNaN(new Date(date).getTime());
  }, { 
    message: "Please enter a valid date of birth" 
  }),
  placeOfBirth: z
    .string()
    .min(2, { message: "Place of birth must be at least 2 characters" }),
  gender: z
    .enum(["male", "female", "other"], { 
      message: "Please select a gender" 
    }),
  maritalStatus: z
    .enum(["single", "married", "divorced", "widowed"], { 
      message: "Please select a marital status" 
    }),
  profession: z
    .string()
    .min(2, { message: "Profession must be at least 2 characters" }),
});

// Contact Information Schema
export const contactInfoSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters" })
    .regex(/^(01[3-9]\d{8})$/, { message: "Please enter a valid Bangladeshi phone number" }),
  presentAddress: z.object({
    street: z.string().min(3, { message: "Street address is required" }),
    city: z.string().min(2, { message: "City is required" }),
    division: z.string().min(2, { message: "Division is required" }),
    postalCode: z.string().min(4, { message: "Postal code is required" })
  }),
  permanentAddress: z.object({
    street: z.string().min(3, { message: "Street address is required" }),
    city: z.string().min(2, { message: "City is required" }),
    division: z.string().min(2, { message: "Division is required" }),
    postalCode: z.string().min(4, { message: "Postal code is required" })
  }),
  sameAsPresent: z.boolean().optional(),
  emergencyContact: z.object({
    name: z.string().min(3, { message: "Contact name is required" }),
    relationship: z.string().min(2, { message: "Relationship is required" }),
    phone: z.string().min(11, { message: "Valid phone number is required" })
  })
});

// Passport Details Schema
export const passportDetailsSchema = z.object({
  passportType: z
    .enum(["ordinary", "official", "diplomatic"], { 
      message: "Please select a passport type" 
    }),
  applicationReason: z
    .enum(["new", "renewal", "lost", "damaged"], { 
      message: "Please select a reason for application" 
    }),
  deliveryOption: z
    .enum(["regular", "express"], { 
      message: "Please select a delivery option" 
    }),
  previousPassport: z
    .object({
      hasPassport: z.boolean(),
      passportNumber: z.string().optional(),
      issueDate: z.string().optional(),
      expiryDate: z.string().optional()
    }).refine((data) => {
      // If hasPassport is true, all other fields must be filled
      if (data.hasPassport) {
        return !!data.passportNumber && !!data.issueDate && !!data.expiryDate;
      }
      return true;
    }, {
      message: "Please provide all previous passport details",
      path: ["passportNumber"],
    }),
});

// Documents Schema
export const documentsSchema = z.object({
  photoUploaded: z.boolean().refine(val => val === true, {
    message: "You must upload a photo"
  }),
  nidUploaded: z.boolean().refine(val => val === true, {
    message: "You must upload your NID"
  }),
  birthCertificateUploaded: z.boolean().optional(),
  previousPassportUploaded: z.boolean().optional(),
  additionalDocuments: z.array(z.string()).optional(),
  declaration: z.boolean().refine(val => val === true, {
    message: "You must agree to the declaration"
  })
});

// Payment Schema
export const paymentSchema = z.object({
  paymentMethod: z
    .enum(["credit_card", "debit_card", "mobile_banking", "bank_transfer", "offline_payment"], { 
      message: "Please select a payment method" 
    }),
  amount: z.number().min(0),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  }),
  // Bank details for offline payment
  bankDetails: z.object({
    bankName: z.string().optional(),
    branchName: z.string().optional(),
    accountNumber: z.string().optional(),
    transactionId: z.string().optional(),
    depositDate: z.string().optional(),
  }).optional(),
  // Appointment details
  appointmentDate: z.string().optional(),
  appointmentTime: z.string().optional(),
  appointmentLocation: z.string().optional(),
});

// Combined application schema
export const applicationSchema = z.object({
  personalInfo: personalInfoSchema,
  contactInfo: contactInfoSchema,
  passportDetails: passportDetailsSchema,
  documents: documentsSchema,
  payment: paymentSchema,
  applicationStatus: z.enum([
    "draft",
    "submitted",
    "processing",
    "payment_pending",
    "offline_payment_pending",
    "payment_confirmed",
    "appointment_scheduled",
    "biometrics_completed",
    "approved",
    "rejected",
    "pending_final_approval",
    "passport_in_queue",
    "ready_for_delivery",
    "delivered"
  ]).default("draft"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
export type ContactInfoValues = z.infer<typeof contactInfoSchema>;
export type PassportDetailsValues = z.infer<typeof passportDetailsSchema>;
export type DocumentsValues = z.infer<typeof documentsSchema>;
export type PaymentValues = z.infer<typeof paymentSchema>;
export type ApplicationValues = z.infer<typeof applicationSchema>; 