import { providerAPI, DashboardData } from './providerAPIClient';

export interface Provider {
  id: number;
  professional_title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  organization_facility: string;
  professional_role: string;
  specialization?: string;
  license_number: string;
  is_verified: boolean;
  is_active: boolean;
  date_joined: string;
  bio?: string;
  years_of_experience?: number;
  consultation_fee?: number;
}

export interface ProviderProfile {
  id: string;
  professional_title: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  organization_facility: string;
  professional_role: string;
  specialization?: string;
  license_number: string;
  license_verified: boolean;
  bio?: string;
  years_of_experience?: number;
  consultation_fee?: number;
  additional_information?: string;
}

export interface ProviderStats {
  provider_profile: {
    id: string;
    full_name: string;
    professional_title: string;
    specialization?: string;
    years_of_experience?: number;
    consultation_fee?: string;
    organization_facility: string;
    professional_role: string;
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

export class ProviderService {
  private static instance: ProviderService;
  
  public static getInstance(): ProviderService {
    if (!ProviderService.instance) {
      ProviderService.instance = new ProviderService();
    }
    return ProviderService.instance;
  }

  /**
   * Get provider dashboard statistics
   */
  async getDashboardStats(): Promise<ProviderStats> {
    try {
      const response = await providerAPI.getDashboard();
      console.log('Raw dashboard API response:', response);
      
      if (response.success) {
        const dashboardData = response.dashboard;
        console.log('Dashboard data received:', dashboardData);
        
        // Handle different possible response structures
        let stats: any = {};
        
        // Check for different possible stats structures
        if (dashboardData.stats) {
          stats = dashboardData.stats;
        } else if (dashboardData.statistics) {
          // If backend uses 'statistics' instead of 'stats'
          stats = dashboardData.statistics;
        } else if (dashboardData.total_patients !== undefined) {
          // If stats are at the root level (legacy format)
          stats = {
            total_appointments: dashboardData.total_patients || 0,
            patients_count: dashboardData.active_monitoring_sessions || 0,
            upcoming_appointments: dashboardData.recent_alerts || 0,
            completed_appointments: 0
          };
        } else {
          // Default empty stats
          stats = {
            total_appointments: 0,
            patients_count: 0,
            upcoming_appointments: 0,
            completed_appointments: 0
          };
        }
        
        // Ensure the response matches our ProviderStats interface
        const normalizedResponse: ProviderStats = {
          provider_profile: dashboardData.provider_profile || this.getDefaultProviderProfile(),
          stats: {
            total_appointments: Number(stats.total_appointments) || 0,
            patients_count: Number(stats.patients_count) || 0,
            upcoming_appointments: Number(stats.upcoming_appointments) || 0,
            completed_appointments: Number(stats.completed_appointments) || 0
          },
          recent_activities: dashboardData.recent_activities || [],
          notifications: dashboardData.notifications || [],
          license_status: dashboardData.license_status || 'pending_verification'
        };
        
        console.log('Normalized dashboard stats:', normalizedResponse);
        return normalizedResponse;
      } else {
        console.error('Dashboard API returned error:', response.errors);
        throw new Error(response.errors?.message || 'Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Return default stats if API fails
      return this.getDefaultStats();
    }
  }
  
  private getDefaultProviderProfile() {
    return {
      id: '',
      full_name: 'Unknown Provider',
      professional_title: 'Healthcare Provider',
      specialization: '',
      years_of_experience: 0,
      consultation_fee: '0',
      organization_facility: '',
      professional_role: '',
      license_verified: false
    };
  }
  
  private getDefaultStats(): ProviderStats {
    return {
      provider_profile: this.getDefaultProviderProfile(),
      stats: {
        total_appointments: 0,
        patients_count: 0,
        upcoming_appointments: 0,
        completed_appointments: 0
      },
      recent_activities: [],
      notifications: [],
      license_status: 'pending_verification'
    };
  }

  /**
   * Get provider profile
   */
  async getProviderProfile(): Promise<ProviderProfile> {
    try {
      const response = await providerAPI.getProfile();
      
      if (response.success) {
        return response.profile;
      } else {
        throw new Error(response.errors?.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching provider profile:', error);
      throw error;
    }
  }

  /**
   * Update provider profile
   */
  async updateProviderProfile(profileData: Partial<ProviderProfile>): Promise<ProviderProfile> {
    try {
      const response = await providerAPI.updateProfile(profileData);
      
      if (response.success) {
        return response.profile;
      } else {
        throw new Error(response.errors?.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating provider profile:', error);
      throw error;
    }
  }

  /**
   * Get all providers (for directory/search)
   */
  async getProviders(params: Record<string, any> = {}): Promise<{ providers: Provider[]; pagination?: any }> {
    try {
      const response = await providerAPI.getProviders(params);
      
      if (response.success) {
        return {
          providers: response.providers,
          pagination: response.pagination
        };
      } else {
        throw new Error(response.errors?.message || 'Failed to fetch providers');
      }
    } catch (error) {
      console.error('Error fetching providers:', error);
      return { providers: [] };
    }
  }

  /**
   * Search providers
   */
  async searchProviders(query: string, filters: Record<string, any> = {}): Promise<Provider[]> {
    try {
      const response = await providerAPI.searchProviders(query, filters);
      
      if (response.success) {
        return response.providers;
      } else {
        throw new Error(response.errors?.message || 'Failed to search providers');
      }
    } catch (error) {
      console.error('Error searching providers:', error);
      return [];
    }
  }

  /**
   * Get provider dropdown list
   */
  async getProviderDropdown(): Promise<Array<{ id: string; name: string; role: string }>> {
    try {
      const response = await providerAPI.getProviderDropdown();
      
      if (response.success) {
        return response.providers;
      } else {
        throw new Error(response.errors?.message || 'Failed to fetch provider dropdown');
      }
    } catch (error) {
      console.error('Error fetching provider dropdown:', error);
      return [];
    }
  }

  /**
   * Get provider details by ID
   */
  async getProviderById(providerId: string): Promise<Provider> {
    try {
      const response = await providerAPI.getProviderDetail(providerId);
      
      if (response.success) {
        return response.provider;
      } else {
        throw new Error(response.errors?.message || 'Failed to fetch provider details');
      }
    } catch (error) {
      console.error('Error fetching provider details:', error);
      throw error;
    }
  }

  /**
   * Get providers by hospital
   */
  async getProvidersByHospital(hospitalId: string): Promise<Provider[]> {
    try {
      const response = await providerAPI.getProvidersByHospital(hospitalId);
      
      if (response.success) {
        return response.providers;
      } else {
        throw new Error(response.errors?.message || 'Failed to fetch hospital providers');
      }
    } catch (error) {
      console.error('Error fetching hospital providers:', error);
      return [];
    }
  }

  /**
   * Format provider full name
   */
  formatProviderName(provider: Provider | ProviderProfile): string {
    const title = provider.professional_title || '';
    const firstName = provider.first_name || '';
    const lastName = provider.last_name || '';
    
    return `${title} ${firstName} ${lastName}`.trim();
  }

  /**
   * Check if provider is verified
   */
  isProviderVerified(provider: Provider | ProviderProfile): boolean {
    return 'is_verified' in provider ? provider.is_verified : provider.license_verified;
  }

  /**
   * Get provider display role
   */
  getProviderDisplayRole(provider: Provider | ProviderProfile): string {
    return provider.professional_role || 'Healthcare Professional';
  }

  /**
   * Get provider experience display
   */
  getExperienceDisplay(years: number | undefined): string {
    if (!years || years === 0) return 'New Professional';
    if (years === 1) return '1 year experience';
    return `${years} years experience`;
  }

  /**
   * Format consultation fee
   */
  formatConsultationFee(fee: number | string | undefined): string {
    if (!fee || fee === 0 || fee === '0.00') return 'Free consultation';
    
    const numFee = typeof fee === 'string' ? parseFloat(fee) : fee;
    return `$${numFee.toFixed(2)} consultation`;
  }

  /**
   * Get license status display
   */
  getLicenseStatusDisplay(status: 'pending_verification' | 'verified' | 'rejected'): { text: string; color: string } {
    switch (status) {
      case 'verified':
        return { text: 'License Verified', color: 'green' };
      case 'rejected':
        return { text: 'License Rejected', color: 'red' };
      case 'pending_verification':
      default:
        return { text: 'Pending Verification', color: 'orange' };
    }
  }

  // Legacy methods for backward compatibility
  async getProvider(id: number): Promise<Provider> {
    return this.getProviderById(id.toString());
  }

  async getProviderDropdownData(): Promise<{ roles: string[], organizations: string[] }> {
    // This is a placeholder - you may need to implement a separate endpoint
    // or extract this data from the providers list
    return {
      roles: ['Physician', 'Registered Nurse', 'Specialist', 'Healthcare Administrator', 'Medical Technician'],
      organizations: []
    };
  }
}

export const providerService = ProviderService.getInstance();
