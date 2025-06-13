import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Baby, CheckCircle, Download, FileText, UserCheck } from "lucide-react";
import Link from "next/link";

export default function Requirements() {
  const newPassportRequirements = [
    "National ID Card (NID) - Original and photocopy",
    "Birth Certificate (English/Bengali) - Original and photocopy", 
    "2 recent passport-size photographs (white background)",
    "SSC/Equivalent Certificate (if applicable)",
    "Marriage Certificate (for married women)",
    "Divorce Certificate (if applicable)",
    "Death Certificate of spouse (for widows/widowers)"
  ];

  const renewalRequirements = [
    "Previous/Current passport - Original and photocopy",
    "National ID Card (NID) - Original and photocopy",
    "2 recent passport-size photographs (white background)",
    "Marriage Certificate (for name change)",
    "Legal documents for any personal information changes"
  ];

  const replacementRequirements = [
    "Police report (GD) for lost/stolen passport",
    "National ID Card (NID) - Original and photocopy",
    "Birth Certificate - Original and photocopy",
    "2 recent passport-size photographs (white background)",
    "Affidavit stating the loss/damage of passport",
    "Newspaper advertisement (for lost passport)",
    "Previous passport pages (if damaged passport)"
  ];

  const minorRequirements = [
    "Birth Certificate - Original and photocopy",
    "Parents' National ID Cards - Original and photocopy",
    "Parents' passports (if available) - Original and photocopy",
    "2 recent passport-size photographs of the child",
    "Consent letter from both parents",
    "Marriage Certificate of parents",
    "Legal guardianship documents (if applicable)"
  ];

  const photographRequirements = [
    "Size: 35mm x 45mm (passport size)",
    "Background: White/off-white only",
    "Recent photos (taken within last 6 months)",
    "Full face visible, looking directly at camera",
    "No shadows on face or background",
    "No glasses, hats, or head coverings (except religious)",
    "Natural facial expression with mouth closed",
    "High quality print on photo paper"
  ];

  const documentGuidelines = [
    "All original documents must be presented for verification",
    "Photocopies should be clear and legible",
    "Foreign documents must be translated into Bengali/English",
    "Translated documents must be notarized",
    "Damaged or unclear documents will not be accepted",
    "All information must match across different documents"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="mx-auto h-16 w-16 mb-4" />
            <h1 className="text-4xl font-bold mb-4">
              Documentation Requirements
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Complete list of required documents for your e-Passport application
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="new-passport" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              <TabsTrigger value="new-passport" className="flex items-center">
                <UserCheck className="h-4 w-4 mr-2" />
                New Passport
              </TabsTrigger>
              <TabsTrigger value="renewal" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Renewal
              </TabsTrigger>
              <TabsTrigger value="replacement" className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Replacement
              </TabsTrigger>
              <TabsTrigger value="minor" className="flex items-center">
                <Baby className="h-4 w-4 mr-2" />
                Minor (Under 18)
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new-passport" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <UserCheck className="mr-2 h-5 w-5" />
                    New Passport Application Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {newPassportRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="renewal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <FileText className="mr-2 h-5 w-5" />
                    Passport Renewal Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {renewalRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="replacement" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <AlertCircle className="mr-2 h-5 w-5" />
                    Lost/Damaged Passport Replacement Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {replacementRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="minor" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Baby className="mr-2 h-5 w-5" />
                    Minor (Under 18) Passport Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {minorRequirements.map((requirement, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Additional Requirements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Photograph Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {photographRequirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Document Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documentGuidelines.map((guideline, index) => (
                    <div key={index} className="flex items-start">
                      <AlertCircle className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{guideline}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Download Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-green-700">Download Forms & Checklists</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4">
                  <Download className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Application Form</div>
                    <div className="text-xs text-gray-500">PDF - 250KB</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <Download className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Document Checklist</div>
                    <div className="text-xs text-gray-500">PDF - 150KB</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4">
                  <Download className="mr-2 h-4 w-4" />
                  <div className="text-left">
                    <div className="font-medium">Consent Form (Minor)</div>
                    <div className="text-xs text-gray-500">PDF - 180KB</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Apply?
            </h3>
            <p className="text-gray-600 mb-6">
              Make sure you have all required documents before starting your application.
            </p>
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