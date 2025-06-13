import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Building2, Calculator, CheckCircle, CreditCard, Smartphone } from "lucide-react";
import Link from "next/link";

export default function Fees() {
  const fees = [
    { service: "New Passport (10 years)", regular: "৳3,000", express: "৳5,000" },
    { service: "New Passport (5 years)", regular: "৳2,000", express: "৳3,500" },
    { service: "Passport Renewal", regular: "৳3,000", express: "৳5,000" },
    { service: "Passport Replacement", regular: "৳4,500", express: "৳6,500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calculator className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Fees & Payment</h1>
          <p className="text-xl opacity-90">Complete fee structure and payment options</p>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Service Fees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Service</th>
                      <th className="text-center py-3">Regular (21-25 days)</th>
                      <th className="text-center py-3">Express (7-10 days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((fee, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4 font-medium">{fee.service}</td>
                        <td className="py-4 text-center">
                          <Badge variant="outline" className="text-green-700">{fee.regular}</Badge>
                        </td>
                        <td className="py-4 text-center">
                          <Badge variant="outline" className="text-orange-700">{fee.express}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card>
              <CardHeader className="text-center">
                <Building2 className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Online Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Dutch-Bangla Bank", "Brac Bank", "City Bank"].map(bank => (
                    <div key={bank} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">{bank}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <Smartphone className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Mobile Banking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["bKash", "Nagad", "Rocket"].map(mobile => (
                    <div key={mobile} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">{mobile}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CreditCard className="mx-auto h-8 w-8 text-green-600 mb-2" />
                <CardTitle>Card Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Visa", "Mastercard", "Nexus Pay"].map(card => (
                    <div key={card} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">{card}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Important Notes */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-700">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Processing fees are non-refundable</p>
                    <p className="text-gray-600 text-sm">Except for system errors</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Payment within 72 hours</p>
                    <p className="text-gray-600 text-sm">Complete payment after application</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Apply?</h3>
            <Link href="/apply">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Start Application
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 