import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, CheckCircle, Stethoscope, Heart } from "lucide-react";
import LicenseVerification from "@/components/LicenseVerification";

const SignupProfessional = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
    role: "",
    licenseNumber: "",
    message: ""
  });

  const [licenseDocument, setLicenseDocument] = useState<File | null>(null);
  const [isLicenseVerified, setIsLicenseVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Professional signup request:", {
      ...formData,
      licenseDocument: licenseDocument?.name,
      isLicenseVerified
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLicenseNumberChange = (value: string) => {
    setFormData({
      ...formData,
      licenseNumber: value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-12 px-6">
      <div className="w-full max-w-2xl mx-auto">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">
                JEG<span className="text-green-600">Health</span>
              </h1>
            </div>
          </Link>
          <p className="text-gray-600 mt-2">Healthcare Professional Registration</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <div className="p-3 bg-green-100 rounded-full inline-block mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Professional Access Request</h2>
            <p className="text-gray-600">Request access to our healthcare IoT monitoring platform</p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Professional Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Professional Title *
                </Label>
                <select
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select your title</option>
                  <option value="Dr.">Dr. (Doctor)</option>
                  <option value="Prof.">Prof. (Professor)</option>
                  <option value="RN">RN (Registered Nurse)</option>
                  <option value="LPN">LPN (Licensed Practical Nurse)</option>
                  <option value="NP">NP (Nurse Practitioner)</option>
                  <option value="PA">PA (Physician Assistant)</option>
                  <option value="RPh">RPh (Pharmacist)</option>
                  <option value="PT">PT (Physical Therapist)</option>
                  <option value="OT">OT (Occupational Therapist)</option>
                  <option value="RT">RT (Respiratory Therapist)</option>
                  <option value="MT">MT (Medical Technologist)</option>
                  <option value="RD">RD (Registered Dietitian)</option>
                  <option value="MSW">MSW (Medical Social Worker)</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                </select>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="john.doe@hospital.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              {/* Professional Information */}
              <div>
                <Label htmlFor="organization" className="text-sm font-medium text-gray-700">
                  Organization/Facility *
                </Label>
                <Input
                  id="organization"
                  name="organization"
                  required
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="General Hospital, Private Practice, etc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                    Professional Role *
                  </Label>
                  <select
                    id="role"
                    name="role"
                    required
                    value={formData.role}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select your role</option>
                    <option value="physician">Physician</option>
                    <option value="nurse">Registered Nurse</option>
                    <option value="specialist">Specialist</option>
                    <option value="administrator">Healthcare Administrator</option>
                    <option value="technician">Medical Technician</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* License Verification Component */}
              <LicenseVerification
                licenseNumber={formData.licenseNumber}
                onLicenseNumberChange={handleLicenseNumberChange}
                onDocumentUpload={setLicenseDocument}
                onVerificationComplete={setIsLicenseVerified}
              />

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Additional Information
                </Label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Tell us about your specific IoT monitoring needs or any questions you have..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
              >
                Submit Access Request
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:text-green-500 font-medium">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Process Information */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                What happens next?
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    1
                  </div>
                  <p>We'll review your application within 24-48 hours</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    2
                  </div>
                  <p>Our team will verify your credentials and organization</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    3
                  </div>
                  <p>You'll receive login credentials and onboarding materials</p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">
                  All applications are processed securely and in compliance with HIPAA regulations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/signup" className="text-sm text-gray-600 hover:text-gray-500">
            ← Back to Account Type Selection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupProfessional;
