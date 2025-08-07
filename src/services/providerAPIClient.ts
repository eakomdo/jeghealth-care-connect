/**
 * Provider API Client - Production-ready API integration
 * Based on the comprehensive integration guide specifications
 */

const API_BASE_URL = 'http://192.168.1.50:8000/api/v1';
const AUTH_BASE_URL = `${API_BASE_URL}/auth`;
const PROVIDER_BASE_URL = `${API_BASE_URL}/providers`;

// Authentication Headers
const getAuthHeaders = (token?: string | null) => ({
  'Content-Type': 'application/json',
  ...(token && { 'Authorization': `Bearer ${token}` })
});

// File Upload Headers
const getFileUploadHeaders = (token?: string | null) => ({
  ...(token && { 'Authorization': `Bearer ${token}` })
  // Don't set Content-Type for FormData
});

// Token Management
export const TokenManager = {
  getAccessToken: () => localStorage.getItem('access_token'),
  getRefreshToken: () => localStorage.getItem('refresh_token'),
  
  setTokens: (access: string, refresh: string) => {
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  },
  
  clearTokens: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  
  isTokenExpired: (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return Date.now() >= payload.exp * 1000;
    } catch {
      return true;
    }
  }
};

// Token refresh functionality
const refreshToken = async (refreshTokenValue: string | null): Promise<string | null> => {
  if (!refreshTokenValue) return null;
  
  try {
    const response = await fetch(`${AUTH_BASE_URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshTokenValue
      })
    });

    const data = await response.json();
    
    if (response.ok) {
      TokenManager.setTokens(data.access, refreshTokenValue);
      return data.access;
    } else {
      // Refresh token expired, redirect to login
      TokenManager.clearTokens();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return null;
    }
  } catch (error) {
    console.error('Token refresh failed:', error);
    return null;
  }
};

// Main Provider API Client
export class ProviderAPIClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.authURL = AUTH_BASE_URL;
    this.providerURL = PROVIDER_BASE_URL;
  }

  baseURL: string;
  authURL: string;
  providerURL: string;

  async request(url: string, options: RequestInit = {}): Promise<Response> {
    const token = TokenManager.getAccessToken();
    
    // Check if token needs refresh
    if (token && TokenManager.isTokenExpired(token)) {
      const newToken = await refreshToken(TokenManager.getRefreshToken());
      if (!newToken) {
        throw new Error('Authentication required');
      }
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(TokenManager.getAccessToken()),
        ...options.headers
      }
    });

    if (response.status === 401) {
      // Token expired, try to refresh
      const newToken = await refreshToken(TokenManager.getRefreshToken());
      if (newToken) {
        // Retry request with new token
        return this.request(url, options);
      } else {
        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        throw new Error('Authentication expired');
      }
    }

    return response;
  }

  // Authentication methods
  async register(data: any): Promise<any> {
    const response = await fetch(`${this.authURL}/provider/register/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(this.formatErrorMessage(responseData));
    }

    return responseData;
  }

  async login(credentials: { email: string; password: string }): Promise<any> {
    const response = await fetch(`${this.authURL}/login/`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(credentials)
    });

    const data = await response.json();

    if (response.ok) {
      // Store tokens
      TokenManager.setTokens(data.access, data.refresh);
      
      return {
        success: true,
        user: data.user,
        tokens: {
          access: data.access,
          refresh: data.refresh
        }
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.authURL}/token/validate/`, {
        method: 'POST',
        headers: getAuthHeaders(token)
      });

      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Provider Profile methods
  async getProfile(): Promise<any> {
    const response = await this.request(`${this.authURL}/provider/profile/`);
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        profile: data
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  async updateProfile(profileData: any): Promise<any> {
    const response = await this.request(`${this.authURL}/provider/profile/`, {
      method: 'PATCH', // Use PATCH for partial updates
      body: JSON.stringify(profileData)
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        profile: data
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  // Provider Dashboard
  async getDashboard(): Promise<any> {
    const response = await this.request(`${this.authURL}/provider/dashboard/`);
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        dashboard: data
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  // Provider Search & Directory
  async getProviders(params: Record<string, any> = {}): Promise<any> {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.providerURL}/?${queryString}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        providers: data.results || data,
        pagination: {
          count: data.count,
          next: data.next,
          previous: data.previous
        }
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  async searchProviders(searchQuery: string, filters: Record<string, any> = {}): Promise<any> {
    const params = {
      q: searchQuery,
      ...filters
    };

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${this.providerURL}/search/?${queryString}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        providers: data
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  async getProviderDropdown(): Promise<any> {
    const response = await fetch(`${this.providerURL}/dropdown/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        providers: data
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  async getProviderDetail(providerId: string): Promise<any> {
    const response = await fetch(`${this.providerURL}/${providerId}/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        provider: data
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  // Hospital Integration
  async getProvidersByHospital(hospitalId: string): Promise<any> {
    const response = await fetch(`${this.providerURL}/hospital/${hospitalId}/`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        providers: data
      };
    } else {
      return {
        success: false,
        errors: data
      };
    }
  }

  // Error handling utility
  private formatErrorMessage(errors: any): string {
    if (typeof errors === 'string') {
      return errors;
    }

    if (errors.detail) {
      return errors.detail;
    }

    if (errors.message) {
      return errors.message;
    }

    if (errors.error) {
      return errors.error;
    }

    if (typeof errors === 'object') {
      // Handle field validation errors
      const fieldErrors = [];
      for (const [field, fieldError] of Object.entries(errors)) {
        if (Array.isArray(fieldError)) {
          fieldErrors.push(`${field}: ${fieldError.join(', ')}`);
        } else if (typeof fieldError === 'string') {
          fieldErrors.push(`${field}: ${fieldError}`);
        }
      }
      if (fieldErrors.length > 0) {
        return fieldErrors.join('; ');
      }
    }

    return 'An unexpected error occurred';
  }
}

// Export singleton instance
export const providerAPI = new ProviderAPIClient();

// Validation Rules
export const validationRules = {
  // Required field validation
  required: {
    professional_title: "Professional title is required",
    first_name: "First name is required",
    last_name: "Last name is required", 
    email: "Email address is required",
    password: "Password is required",
    password_confirm: "Please confirm your password",
    organization_facility: "Organization/Facility is required",
    professional_role: "Professional role is required",
    license_number: "License number is required"
  },

  // Format validation
  email: "Please enter a valid email address",
  password_length: "Password must be at least 8 characters long",
  password_match: "Passwords do not match",
  phone_format: "Please enter a valid phone number",
  license_unique: "A provider with this license number already exists",

  // Character limits
  first_name_max: "First name cannot exceed 100 characters",
  last_name_max: "Last name cannot exceed 100 characters",
  organization_facility_max: "Organization name cannot exceed 200 characters",
  specialization_max: "Specialization cannot exceed 100 characters",
  license_number_max: "License number cannot exceed 50 characters",
  additional_info_max: "Additional information cannot exceed 1000 characters"
};

// Form Configuration
export const providerRegistrationForm = {
  // Step 1: Personal Information
  personalInfo: {
    professional_title: {
      type: 'select',
      required: true,
      label: 'Professional Title',
      options: [
        { value: 'Dr.', label: 'Dr. (Doctor)' },
        { value: 'Prof.', label: 'Prof. (Professor)' },
        { value: 'RN', label: 'RN (Registered Nurse)' },
        { value: 'LPN', label: 'LPN (Licensed Practical Nurse)' },
        { value: 'NP', label: 'NP (Nurse Practitioner)' },
        { value: 'PA', label: 'PA (Physician Assistant)' },
        { value: 'RPh', label: 'RPh (Pharmacist)' },
        { value: 'PT', label: 'PT (Physical Therapist)' },
        { value: 'OT', label: 'OT (Occupational Therapist)' },
        { value: 'RT', label: 'RT (Respiratory Therapist)' },
        { value: 'MT', label: 'MT (Medical Technologist)' },
        { value: 'RD', label: 'RD (Registered Dietitian)' },
        { value: 'MSW', label: 'MSW (Medical Social Worker)' },
        { value: 'Mr.', label: 'Mr.' },
        { value: 'Ms.', label: 'Ms.' },
        { value: 'Mrs.', label: 'Mrs.' }
      ]
    },
    first_name: {
      type: 'text',
      required: true,
      label: 'First Name',
      placeholder: 'Joseph',
      validation: { minLength: 2, maxLength: 100 }
    },
    last_name: {
      type: 'text',
      required: true,
      label: 'Last Name', 
      placeholder: 'Ewool',
      validation: { minLength: 2, maxLength: 100 }
    }
  },

  // Step 2: Contact Information
  contactInfo: {
    email: {
      type: 'email',
      required: true,
      label: 'Professional Email',
      placeholder: 'joseph.ewool@hospital.com',
      validation: { format: 'email', unique: true }
    },
    phone_number: {
      type: 'tel',
      required: false,
      label: 'Phone Number',
      placeholder: '+1 (555) 123-4567',
      validation: { format: 'phone' }
    }
  },

  // Step 3: Account Security
  accountSecurity: {
    username: {
      type: 'text',
      required: false,
      label: 'Username',
      placeholder: 'Auto-generated from email if left empty',
      validation: { unique: true }
    },
    password: {
      type: 'password',
      required: true,
      label: 'Password',
      placeholder: 'Minimum 8 characters',
      validation: { minLength: 8, strength: true }
    },
    password_confirm: {
      type: 'password',
      required: true,
      label: 'Confirm Password',
      placeholder: 'Re-enter password',
      validation: { matches: 'password' }
    }
  },

  // Step 4: Professional Information
  professionalInfo: {
    organization_facility: {
      type: 'text',
      required: true,
      label: 'Organization/Facility',
      placeholder: 'General Hospital, Private Practice, Clinic Name',
      validation: { maxLength: 200 }
    },
    professional_role: {
      type: 'select',
      required: true,
      label: 'Professional Role',
      options: [
        { value: 'Physician', label: 'Physician' },
        { value: 'Registered Nurse', label: 'Registered Nurse' },
        { value: 'Specialist', label: 'Specialist' },
        { value: 'Healthcare Administrator', label: 'Healthcare Administrator' },
        { value: 'Medical Technician', label: 'Medical Technician' },
        { value: 'Other', label: 'Other' }
      ]
    },
    specialization: {
      type: 'text',
      required: false,
      label: 'Specialization',
      placeholder: 'Cardiology, Pediatrics, General Practice, etc.',
      validation: { maxLength: 100 }
    }
  },

  // Step 5: License Information
  licenseInfo: {
    license_number: {
      type: 'text',
      required: true,
      label: 'Professional License Number',
      placeholder: 'Enter your medical license number',
      validation: { unique: true, maxLength: 50 }
    }
  },

  // Step 6: Additional Information (Optional)
  additionalInfo: {
    additional_information: {
      type: 'textarea',
      required: false,
      label: 'Additional Information',
      placeholder: 'Tell us about your specific IoT monitoring needs or any questions you might have',
      validation: { maxLength: 1000 }
    }
  },

  // Legacy Fields (for backward compatibility)
  legacyFields: {
    years_of_experience: {
      type: 'number',
      required: false,
      label: 'Years of Experience',
      default: 0,
      validation: { min: 0 }
    },
    consultation_fee: {
      type: 'number',
      required: false,
      label: 'Consultation Fee',
      default: 0.00,
      validation: { min: 0, decimal: 2 }
    },
    bio: {
      type: 'textarea',
      required: false,
      label: 'Professional Biography',
      placeholder: 'Brief description of your background and expertise'
    }
  }
};

// Registration Steps Configuration
export const registrationSteps = [
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

// Dashboard Data Structure
export interface DashboardData {
  provider_profile: {
    id: string;
    professional_title: string;
    first_name: string;
    last_name: string;
    email: string;
    organization_facility: string;
    professional_role: string;
    specialization?: string;
    license_verified: boolean;
  };
  stats: {
    total_appointments: number;
    upcoming_appointments: number;
    completed_appointments: number;
    patients_count: number;
  };
  recent_activities: any[];
  notifications: any[];
  license_status: 'pending_verification' | 'verified' | 'rejected';
}

// Error handling utility
export const handleErrors = (errors: any): Record<string, string> => {
  const errorMessages: Record<string, string> = {};
  
  if (typeof errors === 'object' && errors !== null) {
    Object.keys(errors).forEach(field => {
      if (Array.isArray(errors[field])) {
        errorMessages[field] = errors[field][0]; // First error message
      } else {
        errorMessages[field] = errors[field];
      }
    });
  }
  
  return errorMessages;
};
