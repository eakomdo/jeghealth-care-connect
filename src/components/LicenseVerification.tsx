
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FileCheck, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface LicenseVerificationProps {
  licenseNumber: string;
  onLicenseNumberChange: (value: string) => void;
  onDocumentUpload: (file: File | null) => void;
  onVerificationComplete: (isValid: boolean) => void;
}

const LicenseVerification = ({ 
  licenseNumber, 
  onLicenseNumberChange, 
  onDocumentUpload,
  onVerificationComplete 
}: LicenseVerificationProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');

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
      setVerificationMessage('Please enter a license number');
      return;
    }

    setVerificationStatus('verifying');
    setVerificationMessage('Verifying license number...');

    // Simulate license verification API call
    setTimeout(() => {
      // Mock verification logic - in real implementation, this would call a license verification API
      const isValid = licenseNumber.length >= 6 && /^[A-Z0-9]+$/i.test(licenseNumber);
      
      if (isValid) {
        setVerificationStatus('verified');
        setVerificationMessage('License number verified successfully');
        onVerificationComplete(true);
      } else {
        setVerificationStatus('failed');
        setVerificationMessage('License number could not be verified. Please check and try again.');
        onVerificationComplete(false);
      }
    }, 2000);
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'verifying':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FileCheck className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'verifying':
        return 'text-blue-600';
      case 'verified':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <FileCheck className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">License Verification</h3>
          </div>

          {/* License Number Input */}
          <div>
            <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">
              License Number *
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="licenseNumber"
                value={licenseNumber}
                onChange={(e) => onLicenseNumberChange(e.target.value)}
                className="flex-1"
                placeholder="Enter your professional license number"
              />
              <Button
                type="button"
                onClick={handleVerifyLicense}
                disabled={verificationStatus === 'verifying' || !licenseNumber.trim()}
                className="bg-green-600 hover:bg-green-700"
              >
                {verificationStatus === 'verifying' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Verify'
                )}
              </Button>
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <Label htmlFor="licenseDocument" className="text-sm font-medium text-gray-700">
              License Document (Optional)
            </Label>
            <div className="mt-1">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    {uploadedFile ? uploadedFile.name : 'Click to upload license document'}
                  </p>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG (MAX. 10MB)</p>
                </div>
                <input
                  id="licenseDocument"
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          {/* Verification Status */}
          {verificationMessage && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              verificationStatus === 'verified' ? 'bg-green-50' :
              verificationStatus === 'failed' ? 'bg-red-50' :
              verificationStatus === 'verifying' ? 'bg-blue-50' : 'bg-gray-50'
            }`}>
              {getStatusIcon()}
              <p className={`text-sm ${getStatusColor()}`}>
                {verificationMessage}
              </p>
            </div>
          )}

          {/* Verification Guidelines */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Verification Guidelines:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• License number should be at least 6 characters</li>
              <li>• Document should be clear and legible</li>
              <li>• Verification typically takes 24-48 hours</li>
              <li>• You'll receive email confirmation once verified</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseVerification;
