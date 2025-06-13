import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Accessibility,
    Ear,
    Eye,
    HelpCircle,
    Keyboard,
    Mail,
    Monitor,
    MousePointer,
    Phone,
    Type
} from "lucide-react";
import Link from "next/link";

export default function AccessibilityPage() {
  const features = [
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Visual Accessibility",
      items: [
        "High contrast mode for better visibility",
        "Screen reader compatible design",
        "Scalable text up to 200% zoom",
        "Alternative text for all images",
        "Clear visual focus indicators"
      ]
    },
    {
      icon: <Ear className="h-6 w-6" />,
      title: "Hearing Accessibility", 
      items: [
        "Text alternatives for audio content",
        "Visual notifications and alerts",
        "Sign language interpretation available",
        "Written communication options",
        "No auto-playing audio content"
      ]
    },
    {
      icon: <MousePointer className="h-6 w-6" />,
      title: "Motor Accessibility",
      items: [
        "Large clickable areas and buttons",
        "Keyboard navigation support",
        "No time-sensitive actions required",
        "Drag and drop alternatives",
        "Voice control compatibility"
      ]
    },
    {
      icon: <Type className="h-6 w-6" />,
      title: "Cognitive Accessibility",
      items: [
        "Simple and clear language",
        "Consistent navigation patterns",
        "Progress indicators for forms",
        "Error prevention and correction",
        "Multiple ways to find information"
      ]
    }
  ];

  const assistiveTechnologies = [
    {
      name: "Screen Readers",
      description: "Compatible with JAWS, NVDA, VoiceOver, and TalkBack",
      tested: true
    },
    {
      name: "Voice Recognition",
      description: "Supports Dragon NaturallySpeaking and similar tools",
      tested: true
    },
    {
      name: "Switch Navigation",
      description: "Works with single-switch and multi-switch devices",
      tested: true
    },
    {
      name: "Eye Tracking",
      description: "Compatible with Tobii and similar eye-tracking systems",
      tested: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Accessibility className="mx-auto h-16 w-16 mb-4" />
          <h1 className="text-4xl font-bold mb-4">Accessibility</h1>
          <p className="text-xl opacity-90">
            Our commitment to making e-Passport services accessible to everyone
          </p>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Accessibility Features
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We&apos;ve designed our platform to be inclusive and accessible to users with diverse abilities and needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.items.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assistive Technologies */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Assistive Technology Support
            </h2>
            <p className="text-gray-600">
              Our platform has been tested with various assistive technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assistiveTechnologies.map((tech, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-2">{tech.name}</h3>
                      <p className="text-gray-600 text-sm">{tech.description}</p>
                    </div>
                    <div className={`ml-4 px-2 py-1 rounded text-xs font-medium ${
                      tech.tested 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {tech.tested ? 'Tested' : 'In Progress'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Navigation */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Keyboard Navigation
              </h2>
              <p className="text-gray-600 mb-6">
                                 Our entire platform can be navigated using only a keyboard, ensuring accessibility for users who cannot use a mouse or touch interface.
              </p>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Keyboard className="mr-2 h-5 w-5" />
                    Keyboard Shortcuts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Skip to main content</span>
                      <kbd className="bg-gray-100 px-2 py-1 rounded text-sm">Alt + M</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Navigate through page</span>
                      <kbd className="bg-gray-100 px-2 py-1 rounded text-sm">Tab</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Activate buttons/links</span>
                      <kbd className="bg-gray-100 px-2 py-1 rounded text-sm">Enter</kbd>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Go back</span>
                      <kbd className="bg-gray-100 px-2 py-1 rounded text-sm">Shift + Tab</kbd>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-green-700">
                    <Monitor className="mr-2 h-5 w-5" />
                    Browser Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Text Size:</h4>
                      <p className="text-gray-600 text-sm">
                        Use Ctrl + (+) to increase text size or Ctrl + (-) to decrease. 
                        Our design supports up to 200% zoom.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">High Contrast:</h4>
                      <p className="text-gray-600 text-sm">
                        Enable high contrast mode in your browser or operating system 
                        for better visibility.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Screen Reader:</h4>
                      <p className="text-gray-600 text-sm">
                        Our content is optimized for screen readers with proper 
                        headings, labels, and descriptions.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-green-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Need Accessibility Support?
          </h2>
          <p className="text-gray-600 mb-8">
            If you encounter any accessibility barriers or need assistance with using our services, 
            we&apos;re here to help.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6 text-center">
                <Phone className="mx-auto h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-medium mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm mb-2">16345</p>
                <p className="text-xs text-gray-500">Accessibility Support Line</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <Mail className="mx-auto h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-medium mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">accessibility@epassport.gov.bd</p>
                <p className="text-xs text-gray-500 mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <HelpCircle className="mx-auto h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-medium mb-2">Get Help</h3>
                <Link href="/faq">
                  <Button variant="outline" size="sm">
                    Visit FAQ
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg border">
            <h3 className="font-medium text-gray-900 mb-3">
              Alternative Application Methods
            </h3>
            <p className="text-gray-600">
              If you cannot use our online platform, you can apply for your e-Passport 
              in person at any of our enrollment centers. Our staff is trained to assist 
              applicants with disabilities and provide necessary accommodations.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-700">
                Accessibility Standards Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  Our e-Passport portal strives to meet Level AA of the Web Content Accessibility Guidelines (WCAG) 2.1 
                  and complies with applicable accessibility laws and regulations.
                </p>
                <p className="text-gray-600">
                  We regularly review and update our accessibility features to ensure the best possible 
                  experience for all users.
                </p>
                <div className="text-sm text-gray-500 mt-6">
                  <p>Last accessibility audit: {new Date().toLocaleDateString()}</p>
                  <p>Next scheduled review: {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 