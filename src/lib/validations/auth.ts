import { z } from "zod";

// Validation schema for registration
export const registerSchema = z.object({
  nid: z
    .string()
    .min(10, { message: "NID must be at least 10 characters" })
    .max(17, { message: "NID must be at most 17 characters" })
    .regex(/^\d+$/, { message: "NID must contain only numbers" }),
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters" })
    .max(100, { message: "Full name must be at most 100 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters" })
    .max(14, { message: "Phone number must be at most 14 characters" })
    .regex(/^(01[3-9]\d{8})$/, { message: "Please enter a valid Bangladeshi phone number" }),
  dateOfBirth: z
    .string()
    .refine((date) => {
      const parsedDate = new Date(date);
      const now = new Date();
      const minAge = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
      return !isNaN(parsedDate.getTime()) && parsedDate <= minAge;
    }, {
      message: "You must be at least 18 years old to register"
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(value => value === true, {
    message: "You must accept the terms and conditions"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Validation schema for login
export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>; 