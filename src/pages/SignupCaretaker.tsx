import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, User, Heart, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignupCaretaker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    careCode: "",
    relationship: "",
    emergencyContact: "",
    emergencyPhone: "",
    additionalInfo: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Caretaker signup request:", formData);
    
    // Demo validation - check if required fields are filled
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone || !formData.careCode || !formData.relationship) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Import services
      const { authService } = await import('@/services/authService');
      const { emailService } = await import('@/services/emailService');

      // Create account
      const userAccount = await authService.createAccount({
        ...formData,
        userType: 'caretaker'
      });

      // Send welcome email
      const emailSent = await emailService.sendWelcomeEmail({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        userType: 'caretaker',
        title: formData.title,
        relationship: formData.relationship
      });

      console.log('Email sent:', emailSent);
      
      toast({
        title: "Registration Successful!",
        description: `Welcome to JEGHealth! ${emailSent ? 'A welcome email has been sent to your inbox.' : 'You can now access the patient dashboard.'}`,
      });
      
      // Redirect to dashboard after successful registration
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
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

  const handlePhoneChange = (value: string) => {
    setFormData({
      ...formData,
      phone: value
    });
  };

  const handleEmergencyPhoneChange = (value: string) => {
    setFormData({
      ...formData,
      emergencyPhone: value
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
          <p className="text-gray-600 mt-2">Caretaker Registration</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <div className="p-3 bg-green-100 rounded-full inline-block mx-auto mb-4">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Caretaker Registration</h2>
            <p className="text-gray-600">Register as a caretaker to monitor and support patients</p>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Important Notice */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium mb-1">Important:</p>
                  <p className="text-sm text-blue-700">
                    You need a unique care code from the patient or healthcare professional who registered you through their mobile app. Please contact them if you don't have this code.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title and Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                    Title
                  </Label>
                  <select
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select title</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                    <option value="Rev.">Rev.</option>
                  </select>
                </div>
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
                    placeholder="Jane"
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
                    placeholder="Smith"
                  />
                </div>
              </div>

              {/* Email Address and Phone */}
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
                    placeholder="jane.smith@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <PhoneInput
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    className="mt-1"
                    placeholder="(555) 123-4567"
                    defaultCountry="US"
                  />
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password *
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Minimum 8 characters"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                    Confirm Password *
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter password"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Care Code - Most Important Field */}
              <div className="p-4 border-2 border-green-200 rounded-lg bg-green-50">
                <Label htmlFor="careCode" className="text-sm font-medium text-gray-700">
                  Care Code *
                </Label>
                <Input
                  id="careCode"
                  name="careCode"
                  required
                  value={formData.careCode}
                  onChange={handleInputChange}
                  className="mt-1 bg-white"
                  placeholder="Enter the care code provided by the patient or healthcare professional"
                />
                <p className="text-xs text-green-700 mt-1">
                  This unique code links you to the patient you'll be caring for
                </p>
              </div>

              {/* Relationship Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="relationship" className="text-sm font-medium text-gray-700">
                    Relationship to Patient *
                  </Label>
                  <select
                    id="relationship"
                    name="relationship"
                    required
                    value={formData.relationship}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">Select relationship</option>
                    <option value="family-spouse">Spouse/Partner</option>
                    <option value="family-child">Child</option>
                    <option value="family-parent">Parent</option>
                    <option value="family-sibling">Sibling</option>
                    <option value="family-other">Other Family Member</option>
                    <option value="professional">Professional Caregiver</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="emergencyContact" className="text-sm font-medium text-gray-700">
                    Emergency Contact Name
                  </Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder="Emergency contact person"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="emergencyPhone" className="text-sm font-medium text-gray-700">
                  Emergency Contact Phone
                </Label>
                <PhoneInput
                  value={formData.emergencyPhone}
                  onChange={handleEmergencyPhoneChange}
                  className="mt-1"
                  placeholder="(555) 987-6543"
                  defaultCountry="US"
                />
              </div>

              <div>
                <Label htmlFor="additionalInfo" className="text-sm font-medium text-gray-700">
                  Additional Information
                </Label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={4}
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Any additional information about your caregiving experience or special requirements..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register as Caretaker"}
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

            {/* Information */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                After Registration:
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    1
                  </div>
                  <p>Your care code will be verified against our system</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    2
                  </div>
                  <p>You'll get access to the patient's monitoring dashboard</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    3
                  </div>
                  <p>You can start monitoring vital signs and receive alerts</p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">
                  Your registration is processed securely. All patient data access is logged and HIPAA compliant.
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

export default SignupCaretaker;
