import { FileText, HelpCircle, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>16345 (Working Days: 9am-5pm)</span>
              </li>
              <li className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:info@epassport.gov.bd" className="hover:text-green-600">
                  info@epassport.gov.bd
                </a>
              </li>
              <li className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Department of Immigration & Passports</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-green-600 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/requirements" className="text-gray-600 hover:text-green-600 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Documentation Requirements
                </Link>
              </li>
              <li>
                <Link href="/fees" className="text-gray-600 hover:text-green-600 flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Fees & Payment
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Language</h3>
            <div className="flex space-x-4">
              <button className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors">
                English
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                বাংলা
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Department of Immigration & Passports, Government of
            the People&apos;s Republic of Bangladesh
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link href="/privacy" className="hover:text-green-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-green-600">
              Terms of Service
            </Link>
            <Link href="/accessibility" className="hover:text-green-600">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
} 