"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useApplication } from "@/lib/context/application-context";
import { cn } from "@/lib/utils";
import { paymentSchema, type PaymentValues } from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { BanknoteIcon, CalendarIcon, CheckCircle2, CreditCard, FileText, Landmark, Smartphone, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

export function PaymentForm() {
  const { applicationState, updatePayment, nextStep, prevStep, updateApplicationStatus } = useApplication();
  
  // Calculate fee based on passport details
  const deliveryOption = applicationState.passportDetails.deliveryOption || "regular";
  const amount = deliveryOption === "express" ? 7000 : 3500;
  
  const defaultValues = useMemo(() => ({
    paymentMethod: applicationState.payment.paymentMethod || "credit_card",
    amount: applicationState.payment.amount || 0,
    agreeToTerms: applicationState.payment.agreeToTerms || false,
    bankDetails: applicationState.payment.bankDetails || {
      bankName: "",
      branchName: "",
      accountNumber: "",
      transactionId: "",
      depositDate: "",
    },
  }), [applicationState.payment]);
  
  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  // Simulate payment states
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success" | "failed">("idle");
  
  // Watch payment method to conditionally render appropriate form sections
  const paymentMethod = form.watch("paymentMethod");
  const isCardPayment = paymentMethod === "credit_card" || paymentMethod === "debit_card";
  const isBankTransfer = paymentMethod === "bank_transfer";
  const isOfflinePayment = paymentMethod === "offline_payment";

  // Sync form with context on mount
  useEffect(() => {
    if (Object.keys(applicationState.payment).length > 0) {
      form.reset(defaultValues);
    }
  }, [form, defaultValues, applicationState.payment]);

  // Process payment (simulated)
  const processPayment = () => {
    setPaymentState("processing");
    
    // Simulate payment processing delay
    setTimeout(() => {
      // For demo, payment will be successful
      setPaymentState("success");
      
      // Update application status based on payment method
      if (isOfflinePayment) {
        updateApplicationStatus("offline_payment_pending");
      } else {
        updateApplicationStatus("payment_confirmed");
      }
      
      // Wait a bit and proceed to next step
      setTimeout(() => {
        nextStep();
      }, 2000);
    }, 3000);
  };

  function onSubmit(data: PaymentValues) {
    updatePayment(data);
    processPayment();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription>
          Complete your payment to proceed with the application
        </CardDescription>
      </CardHeader>
      <CardContent>
        {paymentState === "processing" ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="h-12 w-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Processing Payment</h3>
            <p className="text-gray-500">Please wait while we process your payment...</p>
          </div>
        ) : paymentState === "success" ? (
          <div className="flex flex-col items-center justify-center py-12 bg-green-50 rounded-lg border border-green-200">
            <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
            <h3 className="text-xl font-medium text-green-800 mb-2">
              {isOfflinePayment ? "Payment Information Submitted!" : "Payment Successful!"}
            </h3>
            <p className="text-green-700 mb-6 text-center max-w-md">
              {isOfflinePayment 
                ? "Your offline payment details have been submitted. Please allow 1-2 business days for verification." 
                : "Your payment has been processed successfully. Your application is now being processed."}
            </p>
            <div className="bg-white rounded-md p-4 border border-green-200 w-full max-w-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">
                  {isOfflinePayment ? "Reference ID:" : "Transaction ID:"}
                </span>
                <span className="font-medium">{Math.random().toString(36).substring(2, 12).toUpperCase()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">{amount.toLocaleString()} BDT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ) : paymentState === "failed" ? (
          <div className="flex flex-col items-center justify-center py-12 bg-red-50 rounded-lg border border-red-200">
            <XCircle className="h-16 w-16 text-red-600 mb-4" />
            <h3 className="text-xl font-medium text-red-800 mb-2">Payment Failed</h3>
            <p className="text-red-700 mb-6 text-center max-w-md">
              Your payment could not be processed. Please try again or use a different payment method.
            </p>
            <Button onClick={() => setPaymentState("idle")}>Try Again</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md border mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Passport Type:</span>
                    <span className="font-medium capitalize">{applicationState.passportDetails.passportType || "Ordinary"} Passport</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Speed:</span>
                    <span className="font-medium capitalize">{deliveryOption === "express" ? "Express (7-10 days)" : "Regular (3-4 weeks)"}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2 pt-2 flex justify-between">
                    <span className="text-gray-800 font-medium">Total Amount:</span>
                    <span className="text-lg font-bold text-green-700">{amount.toLocaleString()} BDT</span>
                  </div>
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                      >
                        <FormItem className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50">
                          <FormControl>
                            <RadioGroupItem value="credit_card" className="sr-only" />
                          </FormControl>
                          <CreditCard className={`h-6 w-6 ${field.value === "credit_card" ? "text-green-600" : "text-gray-400"}`} />
                          <FormLabel className={`font-normal cursor-pointer ${field.value === "credit_card" ? "text-green-600" : ""}`}>
                            Credit Card
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50">
                          <FormControl>
                            <RadioGroupItem value="debit_card" className="sr-only" />
                          </FormControl>
                          <CreditCard className={`h-6 w-6 ${field.value === "debit_card" ? "text-green-600" : "text-gray-400"}`} />
                          <FormLabel className={`font-normal cursor-pointer ${field.value === "debit_card" ? "text-green-600" : ""}`}>
                            Debit Card
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50">
                          <FormControl>
                            <RadioGroupItem value="mobile_banking" className="sr-only" />
                          </FormControl>
                          <Smartphone className={`h-6 w-6 ${field.value === "mobile_banking" ? "text-green-600" : "text-gray-400"}`} />
                          <FormLabel className={`font-normal cursor-pointer ${field.value === "mobile_banking" ? "text-green-600" : ""}`}>
                            Mobile Banking
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50">
                          <FormControl>
                            <RadioGroupItem value="bank_transfer" className="sr-only" />
                          </FormControl>
                          <Landmark className={`h-6 w-6 ${field.value === "bank_transfer" ? "text-green-600" : "text-gray-400"}`} />
                          <FormLabel className={`font-normal cursor-pointer ${field.value === "bank_transfer" ? "text-green-600" : ""}`}>
                            Bank Transfer
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex flex-col items-center space-y-3 space-x-0 rounded-md border p-4 cursor-pointer hover:bg-gray-50">
                          <FormControl>
                            <RadioGroupItem value="offline_payment" className="sr-only" />
                          </FormControl>
                          <BanknoteIcon className={`h-6 w-6 ${field.value === "offline_payment" ? "text-green-600" : "text-gray-400"}`} />
                          <FormLabel className={`font-normal cursor-pointer ${field.value === "offline_payment" ? "text-green-600" : ""}`}>
                            Offline Payment
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isCardPayment && (
                <div className="space-y-4 border p-4 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 block mb-1">
                        Card Number
                      </label>
                      <Input 
                        id="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry" className="text-sm font-medium text-gray-700 block mb-1">
                          Expiry Date
                        </label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY" 
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvc" className="text-sm font-medium text-gray-700 block mb-1">
                          CVC/CVV
                        </label>
                        <Input 
                          id="cvc" 
                          placeholder="123" 
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="cardholderName" className="text-sm font-medium text-gray-700 block mb-1">
                        Cardholder Name
                      </label>
                      <Input 
                        id="cardholderName" 
                        placeholder="Name as appears on card" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === "mobile_banking" && (
                <div className="border p-4 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="mobileProvider" className="text-sm font-medium text-gray-700 block mb-1">
                        Mobile Banking Provider
                      </label>
                      <select 
                        id="mobileProvider" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select Provider</option>
                        <option value="bkash">bKash</option>
                        <option value="rocket">Rocket</option>
                        <option value="nagad">Nagad</option>
                        <option value="upay">Upay</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="mobileNumber" className="text-sm font-medium text-gray-700 block mb-1">
                        Mobile Number
                      </label>
                      <Input 
                        id="mobileNumber" 
                        placeholder="01XXXXXXXXX" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {(isBankTransfer || isOfflinePayment) && (
                <div className="border p-4 rounded-md">
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-1">Bangladesh Bank Payment Information</h4>
                    <p className="text-sm text-gray-600">Please make your payment to the following bank account and provide the transaction details below:</p>
                    
                    <div className="bg-blue-50 p-3 rounded-md mt-3 text-sm">
                      <p className="mb-1"><span className="font-medium">Account Name:</span> Department of Immigration & Passports</p>
                      <p className="mb-1"><span className="font-medium">Account Number:</span> 0012345678901</p>
                      <p className="mb-1"><span className="font-medium">Bank Name:</span> Sonali Bank Ltd.</p>
                      <p><span className="font-medium">Branch:</span> Bangladesh Secretariat Branch, Dhaka</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="bankDetails.bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Sonali Bank" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bankDetails.branchName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Gulshan Branch" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bankDetails.transactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transaction ID/Reference Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. TRX123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bankDetails.depositDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Deposit Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : undefined)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {isOfflinePayment && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <div className="flex items-start space-x-2">
                        <FileText className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="font-medium text-amber-800">Offline Payment Verification</h5>
                          <p className="text-sm text-amber-700">
                            Your application will be on hold until we verify your payment. This process typically takes 1-2 business days.
                            After confirmation, you&apos;ll receive an email notification to schedule your biometric appointment.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              <FormField
                control={form.control}
                name="agreeToTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Terms and Conditions</FormLabel>
                      <FormDescription>
                        I agree to the payment terms and understand that the passport fee is non-refundable 
                        once the application is processed.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
                <Button type="submit">
                  {isOfflinePayment ? "Submit Payment Details" : "Make Payment"}
                </Button>
              </div>
            </form>
          </Form>
        )}
        <div className="text-sm text-muted-foreground">
          Please note that this is a mock payment system. In a real application, you&apos;d be redirected to a secure payment gateway.
        </div>
      </CardContent>
    </Card>
  );
} 