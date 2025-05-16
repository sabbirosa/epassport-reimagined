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
import { paymentSchema, type PaymentValues } from "@/lib/validations/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, CreditCard, Landmark, Smartphone, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function PaymentForm() {
  const { applicationState, updatePayment, nextStep, prevStep, updateApplicationStatus } = useApplication();
  
  // Calculate fee based on passport details
  const deliveryOption = applicationState.passportDetails.deliveryOption || "regular";
  const amount = deliveryOption === "express" ? 7000 : 3500;
  
  // Default values for the form
  const defaultValues: PaymentValues = {
    paymentMethod: applicationState.payment.paymentMethod || "credit_card",
    amount,
    agreeToTerms: applicationState.payment.agreeToTerms || false,
  };
  
  const form = useForm<PaymentValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues,
  });

  // Simulate payment states
  const [paymentState, setPaymentState] = useState<"idle" | "processing" | "success" | "failed">("idle");
  
  // Show card details only for credit/debit card payment methods
  const paymentMethod = form.watch("paymentMethod");
  const isCardPayment = paymentMethod === "credit_card" || paymentMethod === "debit_card";

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
      
      // Update application status
      updateApplicationStatus("payment_confirmed");
      
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
            <h3 className="text-xl font-medium text-green-800 mb-2">Payment Successful!</h3>
            <p className="text-green-700 mb-6 text-center max-w-md">
              Your payment has been processed successfully. Your application is now being processed.
            </p>
            <div className="bg-white rounded-md p-4 border border-green-200 w-full max-w-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-medium">{Math.random().toString(36).substring(2, 12).toUpperCase()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Amount Paid:</span>
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
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
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
                <Button type="submit">Make Payment</Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
} 