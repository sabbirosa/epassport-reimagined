"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useApplication } from "@/lib/context/application-context";
import { passportDetailsSchema, type PassportDetailsValues } from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

export function PassportDetailsForm() {
  const { applicationState, updatePassportDetails, nextStep, prevStep } = useApplication();
  
  const defaultValues = useMemo(() => ({
    passportType: applicationState.passportDetails.passportType || "ordinary",
    applicationReason: applicationState.passportDetails.applicationReason || "new",
    deliveryOption: applicationState.passportDetails.deliveryOption || "regular",
    previousPassport: {
      hasPassport: applicationState.passportDetails.previousPassport?.hasPassport || false,
      passportNumber: applicationState.passportDetails.previousPassport?.passportNumber || "",
      issueDate: applicationState.passportDetails.previousPassport?.issueDate || "",
      expiryDate: applicationState.passportDetails.previousPassport?.expiryDate || "",
    },
  }), [applicationState.passportDetails]);
  
  const form = useForm<PassportDetailsValues>({
    resolver: zodResolver(passportDetailsSchema),
    defaultValues,
  });

  // Watch if user has previous passport
  const hasPassport = form.watch("previousPassport.hasPassport");

  // Sync form with context on mount
  useEffect(() => {
    if (Object.keys(applicationState.passportDetails).length > 0) {
      form.reset(defaultValues);
    }
  }, [form, defaultValues, applicationState.passportDetails]);

  function onSubmit(data: PassportDetailsValues) {
    updatePassportDetails(data);
    nextStep();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passport Details</CardTitle>
        <CardDescription>
          Please select your passport type and application details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="passportType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Passport Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="ordinary" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Ordinary Passport
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="official" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Official Passport
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="diplomatic" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Diplomatic Passport
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="applicationReason"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Reason for Application</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="new" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          New Passport (First Time)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="renewal" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Renewal of Existing Passport
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="lost" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Replacement for Lost/Stolen Passport
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="damaged" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Replacement for Damaged Passport
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="deliveryOption"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Delivery Option</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="regular" />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="font-normal">
                            Regular Processing (3-4 weeks) - 3,500 BDT
                          </FormLabel>
                          <FormDescription>
                            Standard processing time, recommended for non-urgent applications
                          </FormDescription>
                        </div>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="express" />
                        </FormControl>
                        <div className="space-y-1">
                          <FormLabel className="font-normal">
                            Express Processing (7-10 days) - 7,000 BDT
                          </FormLabel>
                          <FormDescription>
                            Expedited processing for urgent travel needs
                          </FormDescription>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4 border p-4 rounded-md">
              <div className="flex items-start space-x-3">
                <FormField
                  control={form.control}
                  name="previousPassport.hasPassport"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>I have a previous passport</FormLabel>
                        <FormDescription>
                          Check this box if you have ever had a Bangladeshi passport
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              {hasPassport && (
                <div className="space-y-4 pl-6 border-l-2 border-gray-200">
                  <FormField
                    control={form.control}
                    name="previousPassport.passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Previous Passport Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter passport number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="previousPassport.issueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="previousPassport.expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 