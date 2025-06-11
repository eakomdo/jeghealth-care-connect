
interface LicenseVerificationRequest {
  licenseNumber: string;
  professionalType?: string;
  country?: string;
  state?: string;
  document?: File;
}

interface LicenseVerificationResponse {
  isValid: boolean;
  status: 'verified' | 'invalid' | 'expired' | 'suspended' | 'pending' | 'not_found';
  licenseDetails?: {
    licenseNumber: string;
    holderName: string;
    professionalType: string;
    issuingAuthority: string;
    issueDate: string;
    expiryDate: string;
    status: string;
    restrictions?: string[];
    verificationSource: string;
  };
  message: string;
  verificationId: string;
  timestamp: string;
}

// Mock license database for demonstration
const mockLicenseDatabase = [
  {
    licenseNumber: 'MD123456',
    holderName: 'Dr. John Smith',
    professionalType: 'Medical Doctor',
    issuingAuthority: 'California Medical Board',
    issueDate: '2018-03-15',
    expiryDate: '2025-03-15',
    status: 'active',
    country: 'US',
    state: 'CA'
  },
  {
    licenseNumber: 'RN789012',
    holderName: 'Sarah Johnson',
    professionalType: 'Registered Nurse',
    issuingAuthority: 'Texas Board of Nursing',
    issueDate: '2020-06-01',
    expiryDate: '2024-06-01',
    status: 'active',
    country: 'US',
    state: 'TX'
  },
  {
    licenseNumber: 'GMC456789',
    holderName: 'Dr. Emily Williams',
    professionalType: 'General Practitioner',
    issuingAuthority: 'General Medical Council (UK)',
    issueDate: '2019-09-10',
    expiryDate: '2026-09-10',
    status: 'active',
    country: 'UK'
  },
  {
    licenseNumber: 'AHPRA987654',
    holderName: 'Dr. Michael Chen',
    professionalType: 'Specialist Physician',
    issuingAuthority: 'AHPRA (Australia)',
    issueDate: '2017-12-05',
    expiryDate: '2024-12-05',
    status: 'active',
    country: 'AU'
  },
  {
    licenseNumber: 'EXPIRED123',
    holderName: 'Dr. Robert Brown',
    professionalType: 'Medical Doctor',
    issuingAuthority: 'New York State Medical Board',
    issueDate: '2015-01-01',
    expiryDate: '2023-01-01',
    status: 'expired',
    country: 'US',
    state: 'NY'
  }
];

export class LicenseVerificationService {
  private static instance: LicenseVerificationService;
  
  public static getInstance(): LicenseVerificationService {
    if (!LicenseVerificationService.instance) {
      LicenseVerificationService.instance = new LicenseVerificationService();
    }
    return LicenseVerificationService.instance;
  }

  async verifyLicense(request: LicenseVerificationRequest): Promise<LicenseVerificationResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

    const verificationId = this.generateVerificationId();
    const timestamp = new Date().toISOString();

    // Basic validation
    if (!request.licenseNumber || request.licenseNumber.length < 3) {
      return {
        isValid: false,
        status: 'invalid',
        message: 'Invalid license number format. License number must be at least 3 characters long.',
        verificationId,
        timestamp
      };
    }

    // Search in mock database
    const licenseRecord = mockLicenseDatabase.find(
      record => record.licenseNumber.toLowerCase() === request.licenseNumber.toLowerCase()
    );

    if (!licenseRecord) {
      return {
        isValid: false,
        status: 'not_found',
        message: 'License number not found in our database. Please verify the number and try again.',
        verificationId,
        timestamp
      };
    }

    // Check if license is expired
    const expiryDate = new Date(licenseRecord.expiryDate);
    const currentDate = new Date();
    
    if (licenseRecord.status === 'expired' || expiryDate < currentDate) {
      return {
        isValid: false,
        status: 'expired',
        licenseDetails: {
          licenseNumber: licenseRecord.licenseNumber,
          holderName: licenseRecord.holderName,
          professionalType: licenseRecord.professionalType,
          issuingAuthority: licenseRecord.issuingAuthority,
          issueDate: licenseRecord.issueDate,
          expiryDate: licenseRecord.expiryDate,
          status: 'expired',
          verificationSource: this.getVerificationSource(licenseRecord.country)
        },
        message: `License expired on ${licenseRecord.expiryDate}. Please renew your license.`,
        verificationId,
        timestamp
      };
    }

    // Valid license
    return {
      isValid: true,
      status: 'verified',
      licenseDetails: {
        licenseNumber: licenseRecord.licenseNumber,
        holderName: licenseRecord.holderName,
        professionalType: licenseRecord.professionalType,
        issuingAuthority: licenseRecord.issuingAuthority,
        issueDate: licenseRecord.issueDate,
        expiryDate: licenseRecord.expiryDate,
        status: licenseRecord.status,
        restrictions: this.getRandomRestrictions(),
        verificationSource: this.getVerificationSource(licenseRecord.country)
      },
      message: 'License successfully verified. All details are current and valid.',
      verificationId,
      timestamp
    };
  }

  async verifyDocument(file: File): Promise<{
    isValid: boolean;
    confidence: number;
    extractedInfo?: {
      licenseNumber?: string;
      holderName?: string;
      issueDate?: string;
      expiryDate?: string;
    };
    message: string;
  }> {
    // Simulate document processing delay
    await new Promise(resolve => setTimeout(resolve, 3000 + Math.random() * 2000));

    // Mock document verification based on file properties
    const fileSize = file.size;
    const fileName = file.name.toLowerCase();
    
    // Basic file validation
    if (!fileName.includes('license') && !fileName.includes('certificate')) {
      return {
        isValid: false,
        confidence: 0.1,
        message: 'Document does not appear to be a professional license or certificate.'
      };
    }

    if (fileSize < 50000) { // Less than 50KB
      return {
        isValid: false,
        confidence: 0.3,
        message: 'Document quality is too low for verification. Please upload a higher quality image.'
      };
    }

    // Simulate successful document extraction
    const mockExtractedInfo = {
      licenseNumber: 'MD123456',
      holderName: 'Dr. John Smith',
      issueDate: '2018-03-15',
      expiryDate: '2025-03-15'
    };

    return {
      isValid: true,
      confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
      extractedInfo: mockExtractedInfo,
      message: 'Document successfully verified. License information extracted and validated.'
    };
  }

  private generateVerificationId(): string {
    return 'VER-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  private getVerificationSource(country: string): string {
    const sources = {
      'US': 'National Practitioner Data Bank (NPDB)',
      'UK': 'General Medical Council (GMC)',
      'AU': 'Australian Health Practitioner Regulation Agency (AHPRA)',
      'CA': 'College of Physicians and Surgeons of Canada',
      'DE': 'German Medical Association (BÄK)',
      'FR': 'National Order of Physicians (CNOM)'
    };
    return sources[country] || 'International Medical License Registry';
  }

  private getRandomRestrictions(): string[] {
    const possibleRestrictions = [
      'Must practice under supervision',
      'Limited to outpatient care only',
      'Continuing education required',
      'Regular peer review mandatory'
    ];
    
    // 70% chance of no restrictions
    if (Math.random() > 0.3) {
      return [];
    }
    
    // Return 1-2 random restrictions
    const numRestrictions = Math.random() > 0.7 ? 2 : 1;
    const shuffled = possibleRestrictions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numRestrictions);
  }

  // Method to add test licenses for demonstration
  getTestLicenses(): string[] {
    return mockLicenseDatabase.map(license => license.licenseNumber);
  }
}

export const licenseVerificationService = LicenseVerificationService.getInstance();
