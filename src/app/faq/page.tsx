import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, HelpCircle, Mail, Phone } from "lucide-react";

export default function FAQ() {
  const faqs = [
    {
      id: "general-1",
      question: "What is an e-Passport?",
      answer: "An e-Passport (electronic passport) is a traditional passport that has an embedded electronic microprocessor chip which contains biometric information that can be used to authenticate the identity of the passport holder."
    },
    {
      id: "general-2", 
      question: "How long does it take to get an e-Passport?",
      answer: "Regular processing takes 21-25 working days from the date of biometric enrollment. Express service is available for urgent cases and takes 7-10 working days with additional fees."
    },
    {
      id: "general-3",
      question: "What is the validity period of an e-Passport?",
      answer: "The validity period depends on the type: 5 years for individuals under 18, and 10 years for adults 18 and above."
    },
    {
      id: "application-1",
      question: "Can I apply for an e-Passport online?",
      answer: "Yes, you can submit your application online through this portal. However, you must visit an enrollment center for biometric data collection and document verification."
    },
    {
      id: "application-2",
      question: "What documents are required for e-Passport application?",
      answer: "You need: National ID Card (NID), Birth Certificate, Previous passport (if any), 2 recent passport-size photographs, and supporting documents based on your application type."
    },
    {
      id: "application-3",
      question: "Can I modify my application after submission?",
      answer: "Limited modifications are possible before biometric enrollment. After enrollment, changes require a new application with additional fees."
    },
    {
      id: "payment-1",
      question: "What are the payment methods available?",
      answer: "You can pay online using credit/debit cards, mobile banking (bKash, Nagad, Rocket), or internet banking. Cash payments are accepted at enrollment centers."
    },
    {
      id: "payment-2",
      question: "Is the payment refundable if my application is rejected?",
      answer: "Processing fees are non-refundable. However, if rejection is due to system errors or incorrect government processing, a refund may be considered."
    },
    {
      id: "appointment-1",
      question: "How do I schedule a biometric appointment?",
      answer: "After successful online application and payment, you can schedule an appointment through your dashboard or the appointments section."
    },
    {
      id: "appointment-2",
      question: "Can I reschedule my appointment?",
      answer: "Yes, you can reschedule up to 2 times without penalty. Additional rescheduling may require a small fee."
    },
    {
      id: "delivery-1",
      question: "How will I receive my e-Passport?",
      answer: "You can choose home delivery (additional charges apply) or collect from the designated passport office. SMS notifications will be sent when ready."
    },
    {
      id: "delivery-2",
      question: "Can someone else collect my passport on my behalf?",
      answer: "Yes, with proper authorization letter, your ID copy, and the representative's ID. The representative must be a close family member."
    },
    {
      id: "technical-1",
      question: "I'm having trouble with the online application. What should I do?",
      answer: "Try refreshing your browser, clearing cache, or using a different browser. For persistent issues, contact our technical support at 16345."
    },
    {
      id: "technical-2",
      question: "Is my personal information secure on this platform?",
      answer: "Yes, we use bank-level encryption and security measures. Your data is protected according to government data protection standards."
    }
  ];

  const categories = [
    {
      title: "General Information",
      items: faqs.filter(faq => faq.id.startsWith("general"))
    },
    {
      title: "Application Process", 
      items: faqs.filter(faq => faq.id.startsWith("application"))
    },
    {
      title: "Payment & Fees",
      items: faqs.filter(faq => faq.id.startsWith("payment"))
    },
    {
      title: "Appointments",
      items: faqs.filter(faq => faq.id.startsWith("appointment"))
    },
    {
      title: "Delivery & Collection",
      items: faqs.filter(faq => faq.id.startsWith("delivery"))
    },
    {
      title: "Technical Support",
      items: faqs.filter(faq => faq.id.startsWith("technical"))
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="mx-auto h-16 w-16 mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Find answers to common questions about the Bangladesh e-Passport application process
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {categories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-green-700">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8">
            If you couldn&apos;t find the answer you&apos;re looking for, our support team is here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Phone className="mx-auto h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-medium mb-2">Call Support</h3>
                <p className="text-gray-600 text-sm mb-2">16345</p>
                <div className="flex items-center justify-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  9 AM - 5 PM (Working Days)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Mail className="mx-auto h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-medium mb-2">Email Support</h3>
                <p className="text-gray-600 text-sm">info@epassport.gov.bd</p>
                <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <HelpCircle className="mx-auto h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-medium mb-2">Help Center</h3>
                <p className="text-gray-600 text-sm">Visit our comprehensive help center</p>
                <p className="text-xs text-gray-500 mt-2">Available 24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
} 