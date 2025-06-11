import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, CheckCircle, Stethoscope, Heart, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LicenseVerification from "@/components/LicenseVerification";

const SignupProfessional = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLicenseVerified) {
      toast({
        title: "License Verification Required",
        description: "Please verify your professional license before submitting the request.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Professional signup request:", formData);

      // Import services
      const { authService } = await import('@/services/authService');
      const { emailService } = await import('@/services/emailService');

      // Create account
      const userAccount = await authService.createAccount({
        ...formData,
        userType: 'professional'
      });

      // Send welcome email
      const emailSent = await emailService.sendWelcomeEmail({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userType: 'professional',
        title: formData.title,
        organization: formData.organization
      });

      console.log('Email sent:', emailSent);

      toast({
        title: "Account Created Successfully!",
        description: `Welcome to JEGHealth! ${emailSent ? 'A welcome email has been sent to your inbox.' : 'You can now access your dashboard.'}`,
      });

      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
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

              {/* License Status Alert */}
              {formData.licenseNumber && !isLicenseVerified && (
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <p className="text-sm text-orange-800">
                      Please verify your license number before submitting the access request.
                    </p>
                  </div>
                </div>
              )}

              {isLicenseVerified && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-sm text-green-800">
                      License successfully verified! You can now submit your access request.
                    </p>
                  </div>
                </div>
              )}

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
                disabled={!isLicenseVerified || isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing Request...
                  </div>
                ) : isLicenseVerified ? (
                  "Submit Access Request"
                ) : (
                  "Verify License to Continue"
                )}
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
                  <p>Your license is verified automatically using our international database</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    2
                  </div>
                  <p>Immediate access is granted for verified healthcare professionals</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    3
                  </div>
                  <p>You'll be redirected to your personalized dashboard</p>
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
