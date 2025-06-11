
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Shield, Mail, Heart, User, Stethoscope, CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !userType) return;

    setIsLoading(true);
    
    // Simulate email sending
    console.log("Password reset request:", { email, userType });
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
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
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-4">
              <div className="p-3 bg-green-100 rounded-full inline-block mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Email Sent!</h2>
              <p className="text-gray-600">Check your inbox for reset instructions</p>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  If you don't see the email, check your spam folder or try again.
                </p>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail("");
                      setUserType("");
                    }}
                    variant="outline" 
                    className="w-full mb-3"
                  >
                    Try Different Email
                  </Button>
                  
                  <Link to="/login">
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <p className="text-gray-600 mt-2">Reset Your Password</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-4">
            <div className="p-3 bg-green-100 rounded-full inline-block mx-auto mb-4">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Forgot Password?</h2>
            <p className="text-gray-600">Enter your details to reset your password</p>
          </CardHeader>
          
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-3 block">
                  I am a:
                </Label>
                <RadioGroup value={userType} onValueChange={setUserType} className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50">
                    <RadioGroupItem value="professional" id="professional" />
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                      <Label htmlFor="professional" className="cursor-pointer">
                        Healthcare Professional
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 border rounded-lg p-4 hover:bg-gray-50">
                    <RadioGroupItem value="caretaker" id="caretaker" />
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-green-600" />
                      <Label htmlFor="caretaker" className="cursor-pointer">
                        Caretaker
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                  placeholder="Enter your registered email"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter the email address associated with your JEGHealth account
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium"
                disabled={!userType || !email || isLoading}
              >
                {isLoading ? "Sending Reset Link..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link to="/login" className="text-green-600 hover:text-green-500 font-medium">
                  Back to Sign In
                </Link>
              </p>
            </div>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <p className="text-sm text-green-800">
                  For security reasons, password reset instructions will only be sent to verified email addresses.
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

export default ForgotPassword;
