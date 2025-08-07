import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Upload, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react";

interface LicenseVerificationProps {
  licenseNumber: string;
  onLicenseNumberChange: (value: string) => void;
  onDocumentUpload: (file: File | null) => void;
  onVerificationComplete: (isValid: boolean) => void;
  holderName?: string;
}

const LicenseVerification = ({ 
  licenseNumber, 
  onLicenseNumberChange, 
  onDocumentUpload,
  onVerificationComplete,
  holderName
}: LicenseVerificationProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
    onDocumentUpload(file);
    
    if (file) {
      setVerificationMessage(`Document "${file.name}" uploaded successfully`);
    }
  };

  const handleVerifyLicense = async () => {
    if (!licenseNumber.trim()) {
      setVerificationMessage("Please enter a license number");
      setVerificationStatus('failed');
      return;
    }

    setIsVerifying(true);
    setVerificationStatus('verifying');
    setVerificationMessage("Verifying license...");

    try {
      // Simulate license verification (replace with real API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, accept any license number with at least 6 characters
      if (licenseNumber.length >= 6) {
        setVerificationStatus('verified');
        setVerificationMessage(`License ${licenseNumber} verified successfully${holderName ? ` for ${holderName}` : ''}`);
        onVerificationComplete(true);
      } else {
        setVerificationStatus('failed');
        setVerificationMessage("License verification failed. Please check the license number.");
        onVerificationComplete(false);
      }
    } catch (error) {
      setVerificationStatus('failed');
      setVerificationMessage("Verification failed. Please try again.");
      onVerificationComplete(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">License Verification</h3>
          </div>

          {/* License Number Input */}
          <div>
            <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">
              Professional License Number *
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => onLicenseNumberChange(e.target.value)}
                placeholder="Enter your license number (e.g., MD123456)"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleVerifyLicense}
                disabled={isVerifying || !licenseNumber.trim()}
                className="px-6"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </div>

          {/* File Upload (Optional) */}
          <div>
            <Label htmlFor="licenseDocument" className="text-sm font-medium text-gray-700">
              License Document (Optional)
            </Label>
            <div className="mt-1">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploadedFile ? (
                    <>
                      <FileCheck className="w-8 h-8 mb-2 text-green-600" />
                      <p className="text-sm text-green-600 font-medium">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">File uploaded successfully</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> your license document
                      </p>
                      <p className="text-xs text-gray-500">PDF, PNG, or JPG (MAX. 10MB)</p>
                    </>
                  )}
                </div>
                <input
                  id="licenseDocument"
                  type="file"
                  className="hidden"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          {/* Verification Status */}
          {verificationStatus !== 'idle' && (
            <div className={`p-4 rounded-lg border ${
              verificationStatus === 'verified' 
                ? 'bg-green-50 border-green-200' 
                : verificationStatus === 'failed'
                ? 'bg-red-50 border-red-200'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center gap-2">
                {verificationStatus === 'verified' && <CheckCircle className="w-5 h-5 text-green-600" />}
                {verificationStatus === 'failed' && <AlertCircle className="w-5 h-5 text-red-600" />}
                {verificationStatus === 'verifying' && <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />}
                
                <p className={`text-sm font-medium ${
                  verificationStatus === 'verified' 
                    ? 'text-green-800' 
                    : verificationStatus === 'failed'
                    ? 'text-red-800'
                    : 'text-blue-800'
                }`}>
                  {verificationMessage}
                </p>
              </div>
            </div>
          )}

          {verificationStatus === 'verified' && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Verified
                </Badge>
                <span className="text-sm text-green-700">Ready to proceed with registration</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseVerification;
