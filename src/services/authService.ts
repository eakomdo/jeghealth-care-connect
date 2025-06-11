
interface UserAccount {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  title?: string;
  userType: 'professional' | 'caretaker';
  organization?: string;
  relationship?: string;
  licenseNumber?: string;
  phone?: string;
  password?: string; // Added password field
  createdAt: string;
  isActive: boolean;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  user?: UserAccount;
  message: string;
}

export class AuthService {
  private static instance: AuthService;
  
  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async createAccount(userData: any): Promise<UserAccount> {
    console.log('Creating account for:', userData.email);
    
    // Check if user already exists
    const accounts = this.getAccounts();
    const existingUser = accounts.find(account => 
      account.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (existingUser) {
      throw new Error('An account with this email already exists');
    }
    
    // Create user account
    const userAccount: UserAccount = {
      id: this.generateUserId(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      title: userData.title,
      userType: userData.userType,
      organization: userData.organization,
      relationship: userData.relationship,
      licenseNumber: userData.licenseNumber,
      phone: userData.phone,
      password: userData.password, // Store password (in production, this should be hashed)
      createdAt: new Date().toISOString(),
      isActive: true
    };

    // Store in accounts database
    accounts.push(userAccount);
    localStorage.setItem('userAccounts', JSON.stringify(accounts));
    
    // Set current user
    localStorage.setItem('currentUser', JSON.stringify(userAccount));
    localStorage.setItem('userType', userData.userType);
    localStorage.setItem('userData', JSON.stringify(userAccount));
    
    console.log('Account created successfully:', userAccount);
    return userAccount;
  }

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('Attempting login for:', credentials.email);
    
    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const accounts = this.getAccounts();
    const user = accounts.find(account => 
      account.email.toLowerCase() === credentials.email.toLowerCase() && 
      account.isActive
    );
    
    if (!user) {
      return {
        success: false,
        message: 'No account found with this email address. Please sign up first.'
      };
    }
    
    // Check password (in production, compare with hashed password)
    if (user.password && user.password !== credentials.password) {
      return {
        success: false,
        message: 'Incorrect password. Please try again.'
      };
    }
    
    // Set current user
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('userType', user.userType);
    localStorage.setItem('userData', JSON.stringify(user));
    
    console.log('Login successful for:', user.email);
    return {
      success: true,
      user,
      message: 'Login successful!'
    };
  }

  logout(): void {
    console.log('Logging out user');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
  }

  getCurrentUser(): UserAccount | null {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }

  private getAccounts(): UserAccount[] {
    return JSON.parse(localStorage.getItem('userAccounts') || '[]');
  }

  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

  // Admin method to view all accounts (for demo purposes)
  getAllAccounts(): UserAccount[] {
    return this.getAccounts();
  }
}

export const authService = AuthService.getInstance();
