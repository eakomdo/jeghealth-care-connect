import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, CheckCircle, Stethoscope, Heart, AlertCircle, Eye, EyeOff, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LicenseVerification from "@/components/LicenseVerification";

const SignupProfessional = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    professional_title: "",
    first_name: "",
    last_name: "",
    
    // Step 2: Contact Information
    email: "",
    phone_number: "",
    
    // Step 3: Account Security
    username: "",
    password: "",
    password_confirm: "",
    
    // Step 4: Professional Information
    organization_facility: "",
    professional_role: "",
    specialization: "",
    
    // Step 5: License Information
    license_number: "",
    
    // Step 6: Additional Information (Optional)
    additional_information: "",
    
    // Legacy Fields (for backward compatibility)
    years_of_experience: 0,
    consultation_fee: 0.00,
    bio: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const totalSteps = 6;
  
  const [licenseDocument, setLicenseDocument] = useState<File | null>(null);
  const [isLicenseVerified, setIsLicenseVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const registrationSteps = [
    {
      step: 1,
      title: "Personal Information",
      description: "Let's start with your basic details",
      fields: ["professional_title", "first_name", "last_name"]
    },
    {
      step: 2,
      title: "Contact Information", 
      description: "How can patients and colleagues reach you?",
      fields: ["email", "phone_number"]
    },
    {
      step: 3,
      title: "Account Security",
      description: "Create a secure account",
      fields: ["username", "password", "password_confirm"]
    },
    {
      step: 4,
      title: "Professional Details",
      description: "Tell us about your professional background",
      fields: ["organization_facility", "professional_role", "specialization"]
    },
    {
      step: 5,
      title: "License Verification",
      description: "Professional license for verification",
      fields: ["license_number"]
    },
    {
      step: 6,
      title: "Additional Information",
      description: "Anything else you'd like us to know? (Optional)",
      fields: ["additional_information", "years_of_experience", "consultation_fee", "bio"]
    }
  ];

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    const stepFields = registrationSteps[step - 1].fields;

    stepFields.forEach(field => {
      if (field === "professional_title" && !formData.professional_title) {
        errors.professional_title = "Professional title is required";
      }
      if (field === "first_name" && !formData.first_name) {
        errors.first_name = "First name is required";
      }
      if (field === "last_name" && !formData.last_name) {
        errors.last_name = "Last name is required";
      }
      if (field === "email") {
        if (!formData.email) {
          errors.email = "Email address is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = "Please enter a valid email address";
        }
      }
      if (field === "password" && !formData.password) {
        errors.password = "Password is required";
      }
      if (field === "password_confirm") {
        if (!formData.password_confirm) {
          errors.password_confirm = "Please confirm your password";
        } else if (formData.password !== formData.password_confirm) {
          errors.password_confirm = "Passwords do not match";
        }
      }
      if (field === "organization_facility" && !formData.organization_facility) {
        errors.organization_facility = "Organization/Facility is required";
      }
      if (field === "professional_role" && !formData.professional_role) {
        errors.professional_role = "Professional role is required";
      }
      if (field === "license_number" && !formData.license_number) {
        errors.license_number = "License number is required";
      }
    });

    // Password strength validation
    if (step === 3 && formData.password && formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all steps before submission
    let allValid = true;
    for (let i = 1; i <= totalSteps; i++) {
      if (!validateStep(i)) {
        allValid = false;
        break;
      }
    }

    if (!allValid) {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 5 && !isLicenseVerified) {
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
      console.log("Organization/Facility:", formData.organization_facility);
      console.log("Years of Experience:", formData.years_of_experience);

      // Import services
      const { authService } = await import('@/services/authService');

      // Create account with backend API using proper field names
      const accountData = {
        professional_title: formData.professional_title,
        firstName: formData.first_name, // authService expects firstName
        lastName: formData.last_name, // authService expects lastName
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.password_confirm, // authService expects confirmPassword
        phone: formData.phone_number, // authService expects phone
        organization: formData.organization_facility, // authService expects organization
        role: formData.professional_role, // authService expects role
        licenseNumber: formData.license_number, // authService expects licenseNumber
        message: formData.additional_information, // authService expects message
        specialization: formData.specialization,
        years_of_experience: formData.years_of_experience,
        consultation_fee: formData.consultation_fee,
        bio: formData.bio,
        userType: 'professional' as const
      };
      
      console.log("Account data being sent:", accountData);

      const userAccount = await authService.createAccount(accountData);

      console.log('Account created:', userAccount);

      toast({
        title: "Account Created Successfully!",
        description: "Welcome to JEGHealth! You can now access your professional dashboard.",
      });

      // Redirect to dashboard after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (error) {
      console.error("Signup error:", error);
      
      let errorTitle = "Registration Failed";
      let errorDescription = error instanceof Error ? error.message : "There was an error creating your account. Please try again.";
      
      // Customize error messages for better user experience
      if (error instanceof Error) {
        if (error.message?.includes('email or license number already exists')) {
          errorTitle = "Account Already Exists";
          errorDescription = "A provider account with this email address or license number already exists. Please check your details or try logging in instead.";
        } else if (error.message?.includes('email')) {
          errorTitle = "Email Already Registered";
          errorDescription = "This email address is already registered. Please use a different email address or try logging in.";
        } else if (error.message?.includes('license')) {
          errorTitle = "License Number Already Registered";
          errorDescription = "This license number is already in use. Please verify your license number or contact support if you believe this is an error.";
        } else if (error.message?.includes('Missing required fields')) {
          errorTitle = "Missing Information";
          errorDescription = error.message;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle number inputs properly
    let processedValue: string | number = value;
    if (type === 'number') {
      if (name === 'years_of_experience') {
        processedValue = value === '' ? 0 : parseInt(value, 10) || 0;
      } else if (name === 'consultation_fee') {
        processedValue = value === '' ? 0.00 : parseFloat(value) || 0.00;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      phone_number: value
    }));
    
    if (formErrors.phone_number) {
      setFormErrors(prev => ({
        ...prev,
        phone_number: ""
      }));
    }
  };

  const handleLicenseNumberChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      license_number: value
    }));
    
    if (formErrors.license_number) {
      setFormErrors(prev => ({
        ...prev,
        license_number: ""
      }));
    }
  };

  // Create full name for verification
  const fullName = `${formData.professional_title} ${formData.first_name} ${formData.last_name}`.trim();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Professional Title */}
            <div>
              <Label htmlFor="professional_title" className="text-sm font-medium text-gray-700">
                Professional Title *
              </Label>
              <select
                id="professional_title"
                name="professional_title"
                required
                value={formData.professional_title}
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
              {formErrors.professional_title && (
                <p className="mt-1 text-sm text-red-600">{formErrors.professional_title}</p>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name" className="text-sm font-medium text-gray-700">
                  First Name *
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  required
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Joseph"
                />
                {formErrors.first_name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.first_name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="last_name" className="text-sm font-medium text-gray-700">
                  Last Name *
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  required
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Ewool"
                />
                {formErrors.last_name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.last_name}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Professional Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="joseph.ewool@hospital.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <PhoneInput
                  value={formData.phone_number}
                  onChange={handlePhoneChange}
                  className="mt-1"
                  placeholder="+1 (555) 123-4567"
                  defaultCountry="US"
                />
                {formErrors.phone_number && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.phone_number}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Username */}
            <div>
              <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="Auto-generated from email if left empty"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty to auto-generate from your email address
              </p>
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
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password_confirm" className="text-sm font-medium text-gray-700">
                  Confirm Password *
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password_confirm"
                    name="password_confirm"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.password_confirm}
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
                {formErrors.password_confirm && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password_confirm}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            {/* Organization/Facility */}
            <div>
              <Label htmlFor="organization_facility" className="text-sm font-medium text-gray-700">
                Organization/Facility *
              </Label>
              <Input
                id="organization_facility"
                name="organization_facility"
                required
                value={formData.organization_facility}
                onChange={handleInputChange}
                className="mt-1"
                placeholder="General Hospital, Private Practice, Clinic Name"
              />
              {formErrors.organization_facility && (
                <p className="mt-1 text-sm text-red-600">{formErrors.organization_facility}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="professional_role" className="text-sm font-medium text-gray-700">
                  Professional Role *
                </Label>
                <select
                  id="professional_role"
                  name="professional_role"
                  required
                  value={formData.professional_role}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Select your role</option>
                  <option value="Physician">Physician</option>
                  <option value="Registered Nurse">Registered Nurse</option>
                  <option value="Specialist">Specialist</option>
                  <option value="Healthcare Administrator">Healthcare Administrator</option>
                  <option value="Medical Technician">Medical Technician</option>
                  <option value="Other">Other</option>
                </select>
                {formErrors.professional_role && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.professional_role}</p>
                )}
              </div>

              <div>
                <Label htmlFor="specialization" className="text-sm font-medium text-gray-700">
                  Specialization
                </Label>
                <Input
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Cardiology, Pediatrics, General Practice, etc."
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            {/* License Verification Component */}
            <LicenseVerification
              licenseNumber={formData.license_number}
              onLicenseNumberChange={handleLicenseNumberChange}
              onDocumentUpload={setLicenseDocument}
              onVerificationComplete={setIsLicenseVerified}
              holderName={fullName}
            />

            {formErrors.license_number && (
              <p className="mt-1 text-sm text-red-600">{formErrors.license_number}</p>
            )}

            {/* License Status Alert */}
            {formData.license_number && !isLicenseVerified && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <p className="text-sm text-orange-800">
                    Please verify your license number before proceeding to the next step.
                  </p>
                </div>
              </div>
            )}

            {isLicenseVerified && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-green-800">
                    License successfully verified! You can proceed to the next step.
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="additional_information" className="text-sm font-medium text-gray-700">
                Additional Information
              </Label>
              <textarea
                id="additional_information"
                name="additional_information"
                rows={4}
                value={formData.additional_information}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Tell us about your specific IoT monitoring needs or any questions you have..."
              />
            </div>

            {/* Legacy Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="years_of_experience" className="text-sm font-medium text-gray-700">
                  Years of Experience
                </Label>
                <Input
                  id="years_of_experience"
                  name="years_of_experience"
                  type="number"
                  min="0"
                  value={formData.years_of_experience}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="consultation_fee" className="text-sm font-medium text-gray-700">
                  Consultation Fee ($)
                </Label>
                <Input
                  id="consultation_fee"
                  name="consultation_fee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.consultation_fee}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                Professional Biography
              </Label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={formData.bio}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Brief description of your background and expertise..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
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
            <h2 className="text-2xl font-semibold text-gray-900">
              {registrationSteps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {registrationSteps[currentStep - 1].description}
            </p>

            {/* Progress Indicator */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-gray-500">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={currentStep === 5 && !isLicenseVerified}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <CheckCircle className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
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
