import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Database, Eye, Lock, Shield, UserCheck } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl opacity-90">How we protect and handle your personal information</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Database className="mr-2 h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Personal Information:</h4>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Full name, date of birth, and address</li>
                  <li>• National ID number and supporting documents</li>
                  <li>• Contact information (phone, email)</li>
                  <li>• Biometric data (fingerprints, photograph)</li>
                  <li>• Payment information for processing fees</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Technical Information:</h4>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• IP address and browser information</li>
                  <li>• Login timestamps and session data</li>
                  <li>• Device information for security purposes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Eye className="mr-2 h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start">
                  <UserCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Processing your e-Passport application and verification
                </li>
                <li className="flex items-start">
                  <UserCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Conducting background checks and security screening
                </li>
                <li className="flex items-start">
                  <UserCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Communicating about application status and updates
                </li>
                <li className="flex items-start">
                  <UserCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Maintaining system security and preventing fraud
                </li>
                <li className="flex items-start">
                  <UserCheck className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  Complying with legal and regulatory requirements
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Lock className="mr-2 h-5 w-5" />
                Data Protection & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Security Measures:</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• 256-bit SSL encryption</li>
                    <li>• Multi-factor authentication</li>
                    <li>• Regular security audits</li>
                    <li>• Secure data centers</li>
                    <li>• Access control systems</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Data Storage:</h4>
                  <ul className="text-gray-600 space-y-2">
                    <li>• Encrypted database storage</li>
                    <li>• Regular automated backups</li>
                    <li>• Government-approved facilities</li>
                    <li>• Limited access protocols</li>
                    <li>• Audit trail maintenance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <Shield className="mr-2 h-5 w-5" />
                Information Sharing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                We share your information only in the following circumstances:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• With government agencies for verification and security checks</li>
                <li>• With authorized third-party service providers under strict contracts</li>
                <li>• When required by law, court order, or legal process</li>
                <li>• To protect national security or prevent fraud</li>
                <li>• With your explicit consent for specific purposes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <UserCheck className="mr-2 h-5 w-5" />
                Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Access Rights:</h4>
                  <p className="text-gray-600">You can request access to your personal data we hold.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Correction Rights:</h4>
                  <p className="text-gray-600">You can request correction of inaccurate personal data.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Portability:</h4>
                  <p className="text-gray-600">You can request a copy of your data in a structured format.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Complaints:</h4>
                  <p className="text-gray-600">You can file complaints about data handling with relevant authorities.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-amber-700">
                <AlertCircle className="mr-2 h-5 w-5" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <strong>Data Retention:</strong> Personal data is retained as per government regulations and legal requirements, typically for the validity period of your passport plus additional years for security purposes.
                </p>
                <p className="text-gray-600">
                  <strong>Policy Updates:</strong> This privacy policy may be updated periodically. Changes will be posted on this page with the effective date.
                </p>
                <p className="text-gray-600">
                  <strong>Contact:</strong> For privacy-related queries, contact us at privacy@epassport.gov.bd or call 16345.
                </p>
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