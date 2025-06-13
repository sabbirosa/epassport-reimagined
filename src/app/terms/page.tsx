import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, FileText, Scale, Shield, UserCheck } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl opacity-90">Terms and conditions for using the e-Passport application service</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <FileText className="mr-2 h-5 w-5" />
                Service Agreement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                By using the Bangladesh e-Passport Application Portal (&quot;Service&quot;), you agree to comply with and be bound by these Terms of Service. This agreement is between you and the Department of Immigration & Passports, Government of Bangladesh.
              </p>
              <p className="text-gray-600">
                These terms govern your access to and use of our online passport application services, including all features, content, and functionality provided through our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <UserCheck className="mr-2 h-5 w-5" />
                User Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Accurate Information:</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Provide truthful and accurate personal information</li>
                    <li>• Submit genuine and valid supporting documents</li>
                    <li>• Update information promptly if changes occur</li>
                    <li>• Verify all details before final submission</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Account Security:</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Maintain confidentiality of login credentials</li>
                    <li>• Use strong passwords and enable two-factor authentication</li>
                    <li>• Report any unauthorized access immediately</li>
                    <li>• Log out from shared or public computers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Compliance:</h4>
                  <ul className="text-gray-600 space-y-1 ml-4">
                    <li>• Follow all application procedures and guidelines</li>
                    <li>• Attend scheduled appointments punctually</li>
                    <li>• Comply with all applicable laws and regulations</li>
                    <li>• Respect the rights of other users and staff</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Shield className="mr-2 h-5 w-5" />
                Service Limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">System Availability:</h4>
                  <p className="text-gray-600">
                    While we strive for continuous service availability, the system may be temporarily unavailable due to maintenance, technical issues, or other factors beyond our control.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Processing Times:</h4>
                  <p className="text-gray-600">
                    Processing times are estimates and may vary based on application volume, verification requirements, and other factors. We do not guarantee specific delivery dates.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Application Approval:</h4>
                  <p className="text-gray-600">
                    The government reserves the right to approve or reject any passport application based on security, legal, or other valid grounds.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Clock className="mr-2 h-5 w-5" />
                Payment Terms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <strong>Fee Payment:</strong> All applicable fees must be paid in full before processing begins. Fees are generally non-refundable once payment is processed.
                </p>
                <p className="text-gray-600">
                  <strong>Payment Methods:</strong> Only government-approved payment methods are accepted. Use of unauthorized payment channels may result in application rejection.
                </p>
                <p className="text-gray-600">
                  <strong>Fee Changes:</strong> The government reserves the right to modify fees with appropriate notice. Changes apply to new applications only.
                </p>
                <p className="text-gray-600">
                  <strong>Refund Policy:</strong> Refunds are considered only in exceptional circumstances such as system errors or duplicate payments.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-700">
                <AlertCircle className="mr-2 h-5 w-5" />
                Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-gray-600 font-medium">The following activities are strictly prohibited:</p>
                <ul className="text-gray-600 space-y-2 ml-4">
                  <li>• Providing false or misleading information</li>
                  <li>• Using fake or forged documents</li>
                  <li>• Attempting to circumvent security measures</li>
                  <li>• Sharing login credentials with others</li>
                  <li>• Using automated systems or bots</li>
                  <li>• Interfering with system operations</li>
                  <li>• Violating any applicable laws or regulations</li>
                  <li>• Attempting to access unauthorized areas</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Scale className="mr-2 h-5 w-5" />
                Liability & Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Service Disclaimer:</h4>
                  <p className="text-gray-600">
                    The service is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted or error-free service.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Limitation of Liability:</h4>
                  <p className="text-gray-600">
                    Our liability is limited to the fees paid for the service. We are not liable for indirect, consequential, or incidental damages.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Third-Party Services:</h4>
                  <p className="text-gray-600">
                    We are not responsible for the performance or policies of third-party payment processors or other external services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <FileText className="mr-2 h-5 w-5" />
                Termination & Modifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <strong>Account Termination:</strong> We may suspend or terminate user accounts for violations of these terms or suspicious activities.
                </p>
                <p className="text-gray-600">
                  <strong>Service Changes:</strong> We reserve the right to modify, suspend, or discontinue any part of the service with appropriate notice.
                </p>
                <p className="text-gray-600">
                  <strong>Terms Updates:</strong> These terms may be updated periodically. Continued use of the service constitutes acceptance of modified terms.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-700">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="space-y-2 text-gray-600">
                <p><strong>Email:</strong> legal@epassport.gov.bd</p>
                <p><strong>Phone:</strong> 16345 (9 AM - 5 PM, Working Days)</p>
                <p><strong>Address:</strong> Department of Immigration & Passports, Government of Bangladesh</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-gray-500 text-sm">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>Department of Immigration & Passports, Government of Bangladesh</p>
          </div>
        </div>
      </section>
    </div>
  );
}