
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Shield, Building, User, Stethoscope, Heart } from "lucide-react";

const Signup = () => {
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (userType === "professional") {
      navigate("/signup/professional");
    } else if (userType === "caretaker") {
      navigate("/signup/caretaker");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
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
          <p className="text-gray-600 mt-2">Join JEGHealth</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <div className="p-3 bg-green-100 rounded-full inline-block mx-auto mb-4">
              <Building className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Create Account</h2>
            <p className="text-gray-600">Choose your account type to get started</p>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-4 block">
                  I am a:
                </Label>
                <RadioGroup value={userType} onValueChange={setUserType} className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-3 border rounded-lg p-6 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="professional" id="professional" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Stethoscope className="w-5 h-5 text-green-600" />
                        <Label htmlFor="professional" className="cursor-pointer font-medium">
                          Healthcare Professional
                        </Label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Doctors, nurses, specialists, and other medical professionals who need access to patient monitoring data.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 border rounded-lg p-6 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="caretaker" id="caretaker" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <User className="w-5 h-5 text-green-600" />
                        <Label htmlFor="caretaker" className="cursor-pointer font-medium">
                          Caretaker
                        </Label>
                      </div>
                      <p className="text-sm text-gray-600">
                        Family members, professional caregivers, or support staff who help monitor and care for patients.
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                onClick={handleContinue}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
                disabled={!userType}
              >
                Continue
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-green-600 hover:text-green-500 font-medium">
                  Sign In
                </Link>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">
                  All registrations are processed securely and in compliance with HIPAA regulations.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-500">
            ← Back to JEGHealth Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
