import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  CheckCircle,
  CreditCard,
  FileCheck,
  HelpCircle,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-green-800 opacity-50">
          {/* Background image can be added here if needed */}
          <Image
            src="/passport-bg.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          ></Image>
        </div>
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
          // Add image background
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Bangladesh e-Passport Portal
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                Apply for your e-Passport online through our secure and
                convenient portal. Get access to our streamlined application
                process and appointment scheduling.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link href="/apply">
                  <Button
                    size="lg"
                    className="bg-white text-green-700 hover:bg-gray-100"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/track">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-white border-white hover:bg-green-700"
                  >
                    Track Application
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/bangladesh-passport.jpg"
                alt="Bangladesh e-Passport"
                width={500}
                height={350}
                className="rounded-md shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The Bangladesh e-Passport portal provides a range of services to
            streamline the passport application process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <FileCheck className="mr-2 h-5 w-5" />
                Apply for e-Passport
              </CardTitle>
              <CardDescription>
                Complete your application online
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Apply for a new passport, renew an existing one, or replace a
                lost passport through our secure online portal.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/apply"
                className="text-green-600 hover:text-green-800 flex items-center"
              >
                Start Application
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Appointment
              </CardTitle>
              <CardDescription>Book your biometric appointment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Schedule a convenient time to visit an enrollment center to
                provide your biometric data for your e-Passport.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/appointments"
                className="text-green-600 hover:text-green-800 flex items-center"
              >
                Book Appointment
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <CreditCard className="mr-2 h-5 w-5" />
                Fee Payment
              </CardTitle>
              <CardDescription>Secure online payment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Pay your passport application fees securely online using
                multiple payment methods including cards and mobile banking.
              </p>
            </CardContent>
            <CardFooter>
              <Link
                href="/fees"
                className="text-green-600 hover:text-green-800 flex items-center"
              >
                View Fee Structure
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Requirements
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Make sure you have the following items ready before starting your
              application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                <Info className="mr-2 h-5 w-5 text-green-600" />
                Required Documents
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  National ID Card (NID)
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Birth Certificate
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Previous Passport (if applicable)
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Digital Photograph (meeting specifications)
                </li>
              </ul>
              <div className="mt-4">
                <Link
                  href="/requirements"
                  className="text-green-600 hover:text-green-800 flex items-center text-sm"
                >
                  View detailed requirements
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-xl font-medium text-gray-900 mb-4 flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-green-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-gray-600">
                <div>
                  <p className="font-medium">
                    How long does the application process take?
                  </p>
                  <p className="text-sm mt-1">
                    The standard processing time is 15 working days after
                    biometric submission.
                  </p>
                </div>
                <div>
                  <p className="font-medium">Can I apply for someone else?</p>
                  <p className="text-sm mt-1">
                    Yes, guardians can apply for minors. For adults, proper
                    authorization is required.
                  </p>
                </div>
                <div>
                  <p className="font-medium">
                    What if I need my passport urgently?
                  </p>
                  <p className="text-sm mt-1">
                    Expedited services are available for an additional fee.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href="/faq"
                  className="text-green-600 hover:text-green-800 flex items-center text-sm"
                >
                  View all FAQs
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Ready to apply for your e-Passport?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Start your application today and experience our streamlined process
          designed for your convenience.
        </p>
        <Link href="/register">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Register Now
          </Button>
        </Link>
      </section>

      {/* Tracking Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Track Your Application
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check the status of your existing application using your application
            ID
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-green-600 opacity-10"></div>
            <div className="relative">
              <CheckCircle className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Track Application</h3>
              <p className="text-gray-600 mb-4">
                Check the status of your existing application using your
                application ID
              </p>
              <Link href="/track">
                <Button>Track Status</Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600 opacity-10"></div>
            <div className="relative">
              <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Passport Help</h3>
              <p className="text-gray-600 mb-4">
                Need help with your application or have questions about the
                process?
              </p>
              <Link href="/faq">
                <Button variant="outline">View FAQs</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
