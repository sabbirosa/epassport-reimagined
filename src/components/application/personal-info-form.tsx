"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useApplication } from "@/lib/context/application-context";
import { personalInfoSchema, type PersonalInfoValues } from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle, Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface BirthCertificate {
  certificateNumber: string;
  name: string;
  dateOfBirth: string;
  placeOfBirth: string;
  fatherName: string;
  motherName: string;
}

interface ExistingPassport {
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  status: string;
}

interface FetchedData {
  nid: {
    nidNumber: string;
    name: string;
    fatherName: string;
    motherName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    gender: string;
    permanentAddress: string;
    bloodGroup: string;
  };
  birthCertificate: BirthCertificate | null;
  existingPassports: ExistingPassport[];
  hasExistingPassport: boolean;
  isEligibleForRenewal: boolean;
}

export function PersonalInfoForm() {
  const { applicationState, updatePersonalInfo, nextStep } = useApplication();
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState<FetchedData | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [nidInput, setNidInput] = useState("");
  
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: applicationState.personalInfo.fullName || "",
      nid: applicationState.personalInfo.nid || "",
      dateOfBirth: applicationState.personalInfo.dateOfBirth || "",
      placeOfBirth: applicationState.personalInfo.placeOfBirth || "",
      gender: applicationState.personalInfo.gender || undefined,
      maritalStatus: applicationState.personalInfo.maritalStatus || undefined,
      profession: applicationState.personalInfo.profession || "",
    },
  });

  // Sync form with context on mount
  useEffect(() => {
    if (Object.keys(applicationState.personalInfo).length > 0) {
      form.reset(applicationState.personalInfo as PersonalInfoValues);
      setNidInput(applicationState.personalInfo.nid || "");
    }
  }, [form, applicationState.personalInfo]);

  const fetchPersonalDetails = async () => {
    if (!nidInput.trim()) {
      setFetchError("Please enter your NID number first");
      return;
    }

    setIsFetching(true);
    setFetchError(null);
    setFetchedData(null);

    try {
      const response = await fetch(`/api/fetch-details/${nidInput.trim()}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch data');
      }

      setFetchedData(result.data);
      
      // Auto-populate form with fetched data
      const nidData = result.data.nid;
      form.setValue("fullName", nidData.name);
      form.setValue("nid", nidData.nidNumber);
      form.setValue("dateOfBirth", nidData.dateOfBirth);
      form.setValue("placeOfBirth", nidData.placeOfBirth);
      form.setValue("gender", nidData.gender.toLowerCase() as "male" | "female" | "other");
      
    } catch (error) {
      setFetchError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setIsFetching(false);
    }
  };

  function onSubmit(data: PersonalInfoValues) {
    updatePersonalInfo(data);
    nextStep();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Enter your NID number to automatically fetch your registered details, or fill in manually
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* NID Auto-fetch Section */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-3">Quick Start - Fetch from NID</h3>
          <div className="flex gap-3">
            <Input
              placeholder="Enter your NID number (e.g., 1234567890)"
              value={nidInput}
              onChange={(e) => setNidInput(e.target.value)}
              className="flex-1"
              disabled={isFetching}
            />
            <Button
              type="button"
              onClick={fetchPersonalDetails}
              disabled={isFetching || !nidInput.trim()}
              className="min-w-[140px]"
            >
              {isFetching ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Fetch Details
                </>
              )}
            </Button>
          </div>
          
          {fetchError && (
            <Alert className="mt-3 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                {fetchError}
              </AlertDescription>
            </Alert>
          )}
          
          {fetchedData && (
            <Alert className="mt-3 border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                ✅ Successfully fetched details for {fetchedData.nid.name}
                {fetchedData.hasExistingPassport && (
                  <span className="block text-sm mt-1">
                    📋 Found {fetchedData.existingPassports.length} existing passport(s)
                    {fetchedData.isEligibleForRenewal && " - Eligible for renewal"}
                  </span>
                )}
                {fetchedData.birthCertificate && (
                  <span className="block text-sm mt-1">
                    📄 Birth certificate verified
                  </span>
                )}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={() => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...form.register("fullName")} />
                  </FormControl>
                  <FormDescription>
                    Enter your name exactly as it appears on your NID
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nid"
              render={() => (
                <FormItem>
                  <FormLabel>National ID (NID) Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your NID number" {...form.register("nid")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={() => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...form.register("dateOfBirth")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="placeOfBirth"
                render={() => (
                  <FormItem>
                    <FormLabel>Place of Birth</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your place of birth" {...form.register("placeOfBirth")} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="gender"
                render={() => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={(value) => form.setValue("gender", value as "male" | "female" | "other")}
                      defaultValue={form.getValues("gender")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maritalStatus"
                render={() => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select
                      onValueChange={(value) => form.setValue("maritalStatus", value as "single" | "married" | "divorced" | "widowed")}
                      defaultValue={form.getValues("maritalStatus")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married">Married</SelectItem>
                        <SelectItem value="divorced">Divorced</SelectItem>
                        <SelectItem value="widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="profession"
              render={() => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your profession" {...form.register("profession")} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end">
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 