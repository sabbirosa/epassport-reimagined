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
import { useApplication } from "@/lib/context/application-context";
import { contactInfoSchema, type ContactInfoValues } from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export function ContactInfoForm() {
  const { applicationState, updateContactInfo, nextStep, prevStep } = useApplication();
  
  // Default values with nested objects
  const defaultValues: ContactInfoValues = {
    email: applicationState.contactInfo.email || "",
    phone: applicationState.contactInfo.phone || "",
    presentAddress: {
      street: applicationState.contactInfo.presentAddress?.street || "",
      city: applicationState.contactInfo.presentAddress?.city || "",
      division: applicationState.contactInfo.presentAddress?.division || "",
      postalCode: applicationState.contactInfo.presentAddress?.postalCode || "",
    },
    permanentAddress: {
      street: applicationState.contactInfo.permanentAddress?.street || "",
      city: applicationState.contactInfo.permanentAddress?.city || "",
      division: applicationState.contactInfo.permanentAddress?.division || "",
      postalCode: applicationState.contactInfo.permanentAddress?.postalCode || "",
    },
    sameAsPresent: applicationState.contactInfo.sameAsPresent || false,
    emergencyContact: {
      name: applicationState.contactInfo.emergencyContact?.name || "",
      relationship: applicationState.contactInfo.emergencyContact?.relationship || "",
      phone: applicationState.contactInfo.emergencyContact?.phone || "",
    },
  };
  
  const form = useForm<ContactInfoValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues,
  });

  // Watch the sameAsPresent checkbox to copy address data
  const sameAsPresent = form.watch("sameAsPresent");
  
  // Copy present address to permanent address when checkbox is checked
  useEffect(() => {
    if (sameAsPresent) {
      const presentAddress = form.getValues("presentAddress");
      form.setValue("permanentAddress", { ...presentAddress });
    }
  }, [sameAsPresent, form]);

  // Sync form with context on mount
  useEffect(() => {
    if (Object.keys(applicationState.contactInfo).length > 0) {
      form.reset(defaultValues);
    }
  }, [form, defaultValues, applicationState.contactInfo]);

  function onSubmit(data: ContactInfoValues) {
    updateContactInfo(data);
    nextStep();
  }

  const divisions = [
    "Dhaka", "Chittagong", "Rajshahi", "Khulna", 
    "Barisal", "Sylhet", "Rangpur", "Mymensingh"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>
          Please provide your current contact details for communication
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="01XXXXXXXXX" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a valid Bangladeshi mobile number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
              <h3 className="text-md font-medium">Present Address</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="presentAddress.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="House #, Road #, Area" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="presentAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City/Town</FormLabel>
                        <FormControl>
                          <Input placeholder="City/Town" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="presentAddress.division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="">Select Division</option>
                            {divisions.map((division) => (
                              <option key={division} value={division}>{division}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="presentAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">Permanent Address</h3>
                
                <FormField
                  control={form.control}
                  name="sameAsPresent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Same as present address</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className={`grid grid-cols-1 gap-4 ${sameAsPresent ? 'opacity-50' : ''}`}>
                <FormField
                  control={form.control}
                  name="permanentAddress.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="House #, Road #, Area" {...field} disabled={sameAsPresent} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="permanentAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City/Town</FormLabel>
                        <FormControl>
                          <Input placeholder="City/Town" {...field} disabled={sameAsPresent} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="permanentAddress.division"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                            disabled={sameAsPresent}
                          >
                            <option value="">Select Division</option>
                            {divisions.map((division) => (
                              <option key={division} value={division}>{division}</option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="permanentAddress.postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Postal Code" {...field} disabled={sameAsPresent} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-md font-medium">Emergency Contact</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="emergencyContact.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyContact.relationship"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relationship</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Spouse, Parent, Friend" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="emergencyContact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="01XXXXXXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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