
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Upload, CheckCircle, AlertCircle, Loader2, Shield, Clock, User, Building } from "lucide-react";
import { licenseVerificationService } from "@/services/licenseVerificationService";

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
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed' | 'expired' | 'not_found'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [verificationDetails, setVerificationDetails] = useState<any>(null);
  const [verificationId, setVerificationId] = useState('');
  const [documentVerification, setDocumentVerification] = useState<any>(null);
  const [isVerifyingDocument, setIsVerifyingDocument] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedFile(file);
    onDocumentUpload(file);
    
    if (file) {
      setVerificationMessage(`Document "${file.name}" uploaded successfully`);
      
      // Automatically verify the document
      setIsVerifyingDocument(true);
      try {
        const result = await licenseVerificationService.verifyDocument(file);
        setDocumentVerification(result);
        
        if (result.isValid && result.extractedInfo?.licenseNumber) {
          // Auto-fill license number if extracted from document
          onLicenseNumberChange(result.extractedInfo.licenseNumber);
        }
      } catch (error) {
        console.error('Document verification failed:', error);
      } finally {
        setIsVerifyingDocument(false);
      }
    }
  };

  const handleVerifyLicense = async () => {
    if (!licenseNumber.trim()) {
      setVerificationMessage('Please enter a license number');
      return;
    }

    setVerificationStatus('verifying');
    setVerificationMessage('Verifying license with international databases...');
    setVerificationDetails(null);

    try {
      const result = await licenseVerificationService.verifyLicense({
        licenseNumber: licenseNumber.trim()
      });

      setVerificationId(result.verificationId);
      setVerificationMessage(result.message);
      
      if (result.isValid) {
        setVerificationStatus('verified');
        setVerificationDetails(result.licenseDetails);
        onVerificationComplete(true);
      } else {
        switch (result.status) {
          case 'expired':
            setVerificationStatus('expired');
            setVerificationDetails(result.licenseDetails);
            break;
          case 'not_found':
            setVerificationStatus('not_found');
            break;
          default:
            setVerificationStatus('failed');
        }
        onVerificationComplete(false);
      }
    } catch (error) {
      setVerificationStatus('failed');
      setVerificationMessage('Verification service temporarily unavailable. Please try again later.');
      onVerificationComplete(false);
      console.error('License verification error:', error);
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'verifying':
        return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'expired':
        return <Clock className="w-5 h-5 text-orange-600" />;
      case 'failed':
      case 'not_found':
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
      case 'expired':
        return 'text-orange-600';
      case 'failed':
      case 'not_found':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = () => {
    switch (verificationStatus) {
      case 'verified':
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>;
      case 'expired':
        return <Badge className="bg-orange-100 text-orange-800">Expired</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'not_found':
        return <Badge className="bg-red-100 text-red-800">Not Found</Badge>;
      case 'verifying':
        return <Badge className="bg-blue-100 text-blue-800">Verifying...</Badge>;
      default:
        return null;
    }
  };

  // Get test licenses for demo purposes
  const testLicenses = licenseVerificationService.getTestLicenses();

  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">License Verification</h3>
            {getStatusBadge()}
          </div>

          {/* Test License Numbers for Demo */}
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900 mb-2">Demo License Numbers (for testing):</p>
            <div className="flex flex-wrap gap-2">
              {testLicenses.slice(0, 3).map((license) => (
                <button
                  key={license}
                  onClick={() => onLicenseNumberChange(license)}
                  className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  {license}
                </button>
              ))}
            </div>
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
            {verificationId && (
              <p className="text-xs text-gray-500 mt-1">Verification ID: {verificationId}</p>
            )}
          </div>

          {/* Document Upload */}
          <div>
            <Label htmlFor="licenseDocument" className="text-sm font-medium text-gray-700">
              License Document (Optional)
            </Label>
            <div className="mt-1">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {isVerifyingDocument ? (
                    <Loader2 className="w-8 h-8 mb-2 text-blue-600 animate-spin" />
                  ) : (
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  )}
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

          {/* Document Verification Results */}
          {documentVerification && (
            <div className={`p-4 rounded-lg ${
              documentVerification.isValid ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {documentVerification.isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${documentVerification.isValid ? 'text-green-800' : 'text-red-800'}`}>
                  Document {documentVerification.isValid ? 'Verified' : 'Verification Failed'}
                </span>
                <Badge className={documentVerification.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                  {Math.round(documentVerification.confidence * 100)}% confidence
                </Badge>
              </div>
              <p className={`text-sm ${documentVerification.isValid ? 'text-green-700' : 'text-red-700'}`}>
                {documentVerification.message}
              </p>
              {documentVerification.extractedInfo && (
                <div className="mt-3 text-sm">
                  <p className="font-medium text-gray-800">Extracted Information:</p>
                  <ul className="text-gray-600 mt-1 space-y-1">
                    {documentVerification.extractedInfo.licenseNumber && (
                      <li>• License Number: {documentVerification.extractedInfo.licenseNumber}</li>
                    )}
                    {documentVerification.extractedInfo.holderName && (
                      <li>• Name: {documentVerification.extractedInfo.holderName}</li>
                    )}
                    {documentVerification.extractedInfo.issueDate && (
                      <li>• Issue Date: {documentVerification.extractedInfo.issueDate}</li>
                    )}
                    {documentVerification.extractedInfo.expiryDate && (
                      <li>• Expiry Date: {documentVerification.extractedInfo.expiryDate}</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Verification Status */}
          {verificationMessage && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              verificationStatus === 'verified' ? 'bg-green-50' :
              verificationStatus === 'expired' ? 'bg-orange-50' :
              (verificationStatus === 'failed' || verificationStatus === 'not_found') ? 'bg-red-50' :
              verificationStatus === 'verifying' ? 'bg-blue-50' : 'bg-gray-50'
            }`}>
              {getStatusIcon()}
              <p className={`text-sm ${getStatusColor()}`}>
                {verificationMessage}
              </p>
            </div>
          )}

          {/* Detailed License Information */}
          {verificationDetails && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <User className="w-4 h-4" />
                License Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">License Holder:</span>
                  <p className="text-gray-900">{verificationDetails.holderName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Professional Type:</span>
                  <p className="text-gray-900">{verificationDetails.professionalType}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Issuing Authority:</span>
                  <p className="text-gray-900 flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {verificationDetails.issuingAuthority}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Issue Date:</span>
                  <p className="text-gray-900">{verificationDetails.issueDate}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Expiry Date:</span>
                  <p className="text-gray-900">{verificationDetails.expiryDate}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Status:</span>
                  <p className={`capitalize font-medium ${
                    verificationDetails.status === 'active' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {verificationDetails.status}
                  </p>
                </div>
              </div>
              
              {verificationDetails.restrictions && verificationDetails.restrictions.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Restrictions:</span>
                  <ul className="text-gray-900 mt-1">
                    {verificationDetails.restrictions.map((restriction: string, index: number) => (
                      <li key={index} className="text-sm">• {restriction}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Verified via: {verificationDetails.verificationSource}
                </p>
              </div>
            </div>
          )}

          {/* Verification Guidelines */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Verification Process:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• License verified against international databases</li>
              <li>• Document authentication using AI-powered OCR</li>
              <li>• Real-time status checking with licensing authorities</li>
              <li>• Verification typically completed within 2-5 minutes</li>
              <li>• All verifications are logged and auditable</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LicenseVerification;
