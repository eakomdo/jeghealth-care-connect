
const API_BASE_URL = 'http://192.168.1.50:8000';

interface UserAccount {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  title?: string;
  userType: 'professional' | 'caretaker';
  organization?: string;
  role?: string;
  license_number?: string;
  phone?: string;
  date_joined?: string;
  is_active: boolean;
  is_verified?: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: UserAccount;
  access?: string;
  refresh?: string;
  message: string;
}

interface RegisterData {
  professional_title?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  organization?: string;
  role?: string;
  licenseNumber?: string;
  message?: string;
  userType: 'professional' | 'caretaker';
  relationship?: string;
  careCode?: string;
  specialization?: string;
  years_of_experience?: number;
  consultation_fee?: number;
  bio?: string;
}

export class AuthService {
  private static instance: AuthService;
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };

    const config: RequestInit = {
      headers: { ...defaultHeaders, ...options.headers },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        data = { message: `Response parsing failed: ${response.statusText}` };
      }

      if (!response.ok) {
        // Handle different types of error responses
        let errorMessage = `HTTP error! status: ${response.status}`;
        
        if (data.detail) {
          errorMessage = data.detail;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
          
          // Parse details if available
          if (data.details) {
            console.log('Error details:', data.details);
            
            // Try to extract meaningful error from details string
            if (data.details.includes('email or license number already exists')) {
              errorMessage = 'A provider with this email or license number already exists. Please use a different email or license number.';
            } else if (data.details.includes('email')) {
              errorMessage = 'This email address is already registered. Please use a different email address.';
            } else if (data.details.includes('license')) {
              errorMessage = 'This license number is already registered. Please verify your license number.';
            }
          }
        } else if (typeof data === 'object') {
          // Handle field validation errors
          const fieldErrors = [];
          for (const [field, errors] of Object.entries(data)) {
            if (Array.isArray(errors)) {
              fieldErrors.push(`${field}: ${errors.join(', ')}`);
            } else if (typeof errors === 'string') {
              fieldErrors.push(`${field}: ${errors}`);
            }
          }
          if (fieldErrors.length > 0) {
            errorMessage = fieldErrors.join('; ');
          }
        }
        
        console.error('API Error Response:', data);
        console.error('Parsed Error Message:', errorMessage);
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async createAccount(userData: RegisterData): Promise<UserAccount> {
    console.log('Creating professional account for:', userData.email);
    console.log('Input userData:', userData);
    
    if (userData.userType === 'professional') {
      // Validate required fields before sending
      const requiredFields = {
        professional_title: userData.professional_title,
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        password: userData.password,
        password_confirm: userData.confirmPassword,
        phone_number: userData.phone,
        organization_facility: userData.organization,
        professional_role: userData.role,
        license_number: userData.licenseNumber
      };
      
      // Check for missing required fields
      const missingFields = [];
      for (const [field, value] of Object.entries(requiredFields)) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          missingFields.push(field);
        }
      }
      
      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userData.email)) {
        throw new Error('Invalid email format');
      }
      
      // Validate password length
      if (userData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      
      // Check password confirmation
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Password confirmation does not match');
      }
      
      const payload = {
        // Basic auth fields
        username: userData.email, // Backend expects username field
        email: userData.email,
        password: userData.password,
        password_confirm: userData.confirmPassword, // Backend expects confirmation
        
        // Professional fields - matching backend exactly
        professional_title: userData.professional_title || '', // Backend expects professional_title
        first_name: userData.firstName,
        last_name: userData.lastName,
        phone_number: userData.phone || '', // Backend expects phone_number
        organization_facility: userData.organization || '', // Backend expects organization_facility (not organization)
        professional_role: userData.role || '', // Backend expects professional_role
        specialization: userData.specialization || '', // Add specialization
        license_number: userData.licenseNumber || '',
        
        // Additional fields
        additional_information: userData.message || '', // Backend expects additional_information
        years_of_experience: Number(userData.years_of_experience) || 0, // Ensure it's a number
        consultation_fee: Number(userData.consultation_fee) || 0.00, // Ensure it's a number
        bio: userData.bio || ''
      };

      console.log('Final payload structure:');
      console.log('- organization_facility:', payload.organization_facility);
      console.log('- years_of_experience:', payload.years_of_experience, typeof payload.years_of_experience);
      console.log('- phone_number:', payload.phone_number);
      console.log('- consultation_fee:', payload.consultation_fee, typeof payload.consultation_fee);
      console.log('Complete sending registration payload:', JSON.stringify(payload, null, 2));

      const response = await this.makeRequest('/api/v1/auth/provider/register/', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      console.log('Registration response:', response);

      // Store user data and tokens
      if (response.tokens && response.tokens.access) {
        localStorage.setItem('access_token', response.tokens.access);
        localStorage.setItem('refresh_token', response.tokens.refresh);
      }

      // Create user account object with proper field mapping
      let userAccount: UserAccount;
      
      if (response.authUser) {
        userAccount = {
          ...response.authUser,
          userType: 'professional'
        };
      } else {
        // Fallback: create user account from original data
        userAccount = {
          id: response.id || 0,
          email: userData.email,
          first_name: userData.firstName,
          last_name: userData.lastName,
          title: userData.professional_title,
          organization: userData.organization,
          role: userData.role,
          license_number: userData.licenseNumber,
          phone: userData.phone,
          userType: 'professional',
          is_active: true,
          is_verified: false
        };
      }
      
      console.log('Storing user account:', userAccount);

      localStorage.setItem('currentUser', JSON.stringify(userAccount));
      localStorage.setItem('userType', 'professional');
      localStorage.setItem('userData', JSON.stringify(userAccount));
      
      console.log('Professional account created successfully:', userAccount);
      return userAccount;
    } else {
      // For caretakers, we'll need to implement this endpoint later
      throw new Error('Caretaker registration not implemented yet');
    }
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('Attempting login for:', credentials.email);
    
    try {
      const response = await this.makeRequest('/api/v1/auth/login/', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      console.log('Login response:', response);

      if (response.tokens && response.tokens.access) {
        localStorage.setItem('access_token', response.tokens.access);
        localStorage.setItem('refresh_token', response.tokens.refresh);
        
        const userAccount: UserAccount = {
          ...response.authUser,
          userType: 'professional'
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userAccount));
        localStorage.setItem('userType', 'professional');
        localStorage.setItem('userData', JSON.stringify(userAccount));
        
        console.log('Login successful for:', userAccount.email);
        return {
          success: true,
          user: userAccount,
          access: response.tokens.access,
          refresh: response.tokens.refresh,
          message: response.message || 'Login successful!'
        };
      }

      return {
        success: false,
        message: response.message || 'Login failed'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }

  async getUserProfile(): Promise<UserAccount> {
    const response = await this.makeRequest('/api/v1/auth/provider/profile/');
    return {
      id: response.user_id,
      email: response.email,
      first_name: response.first_name,
      last_name: response.last_name,
      title: response.professional_title,
      userType: 'professional',
      organization: response.organization_facility,
      role: response.professional_role,
      license_number: response.license_number,
      phone: response.phone_number,
      date_joined: response.created_at,
      is_active: response.is_active,
      is_verified: response.license_verified
    };
  }

  async getDashboardStats(): Promise<any> {
    return await this.makeRequest('/api/v1/auth/provider/dashboard/');
  }

  async updateProfile(updates: Partial<UserAccount>): Promise<UserAccount> {
    const payload = {
      title: updates.title,
      first_name: updates.first_name,
      last_name: updates.last_name,
      phone: updates.phone,
      organization: updates.organization,
      role: updates.role,
    };

    const response = await this.makeRequest('/api/v1/auth/provider/profile/', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });

    const updatedUser = { ...response, userType: 'professional' };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    
    return updatedUser;
  }

  logout(): void {
    console.log('Logging out user');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  getCurrentUser(): UserAccount | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  async validateToken(): Promise<boolean> {
    try {
      await this.makeRequest('/api/v1/auth/token/validate/', {
        method: 'POST',
      });
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      this.logout();
      return false;
    }
  }
}

export const authService = AuthService.getInstance();
