
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4">
              JEG<span className="text-green-400">Health</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Professional IoT health monitoring platform designed for healthcare 
              professionals and caregivers. Secure, reliable, and compliant 
              healthcare technology solutions.
            </p>
            <div className="flex items-center text-gray-300">
              <Heart className="w-5 h-5 text-red-400 mr-2" />
              <span>Dedicated to improving patient care through technology</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Features</a></li>
              <li><a href="#security" className="text-gray-300 hover:text-green-400 transition-colors">Security</a></li>
              <li><a href="#integrations" className="text-gray-300 hover:text-green-400 transition-colors">Integrations</a></li>
              <li><a href="#api" className="text-gray-300 hover:text-green-400 transition-colors">API Documentation</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-green-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-3" />
                <span>support@jeghealth.com</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-3" />
                <span>1-800-JEG-HEALTH</span>
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-3" />
                <span>Healthcare Technology Center</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} JEGHealth. All rights reserved. HIPAA Compliant Healthcare Technology.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
              <a href="#compliance" className="text-gray-400 hover:text-green-400 transition-colors">HIPAA Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
