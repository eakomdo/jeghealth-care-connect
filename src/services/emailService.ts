
interface EmailRequest {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
}

interface WelcomeEmailData {
  firstName: string;
  lastName: string;
  email: string;
  userType: 'professional' | 'caretaker';
  title?: string;
  organization?: string;
  relationship?: string;
}

export class EmailService {
  private static instance: EmailService;
  
  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendWelcomeEmail(userData: WelcomeEmailData): Promise<boolean> {
    console.log('Sending welcome email to:', userData.email);
    
    const emailContent = this.generateWelcomeEmailContent(userData);
    
    try {
      // Simulate email sending - in production this would connect to an email service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store sent email for demo purposes
      const sentEmails = JSON.parse(localStorage.getItem('sentEmails') || '[]');
      sentEmails.push({
        to: userData.email,
        subject: emailContent.subject,
        content: emailContent.html,
        sentAt: new Date().toISOString(),
        userType: userData.userType
      });
      localStorage.setItem('sentEmails', JSON.stringify(sentEmails));
      
      console.log('Welcome email sent successfully to:', userData.email);
      return true;
    } catch (error) {
      console.error('Failed to send welcome email:', error);
      return false;
    }
  }

  private generateWelcomeEmailContent(userData: WelcomeEmailData) {
    const fullName = `${userData.title || ''} ${userData.firstName} ${userData.lastName}`.trim();
    
    if (userData.userType === 'professional') {
      return {
        subject: 'Welcome to JEGHealth - Your Professional Account is Ready',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to JEGHealth</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Healthcare IoT Monitoring Platform</p>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #1f2937; margin-top: 0;">Hello ${fullName},</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Welcome to JEGHealth! Your professional account has been successfully created and verified.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Account Details:</h3>
                <ul style="color: #4b5563; line-height: 1.8;">
                  <li><strong>Email:</strong> ${userData.email}</li>
                  <li><strong>Organization:</strong> ${userData.organization || 'Not specified'}</li>
                  <li><strong>Account Type:</strong> Healthcare Professional</li>
                </ul>
              </div>
              
              <h3 style="color: #1f2937;">What's Next?</h3>
              <ul style="color: #4b5563; line-height: 1.8;">
                <li>Access your dashboard to start monitoring patients</li>
                <li>Add patients to your care network</li>
                <li>Configure IoT devices and monitoring parameters</li>
                <li>Set up alerts and notifications</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${window.location.origin}/dashboard" 
                   style="background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Access Your Dashboard
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                If you have any questions, please don't hesitate to contact our support team.
              </p>
            </div>
            
            <div style="background: #1f2937; padding: 20px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                © 2024 JEGHealth. All rights reserved.
              </p>
            </div>
          </div>
        `,
        text: `Welcome to JEGHealth, ${fullName}! Your professional account has been created successfully.`
      };
    } else {
      return {
        subject: 'Welcome to JEGHealth - Your Caretaker Account is Ready',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #059669, #10b981); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to JEGHealth</h1>
              <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Healthcare IoT Monitoring Platform</p>
            </div>
            
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #1f2937; margin-top: 0;">Hello ${fullName},</h2>
              
              <p style="color: #4b5563; line-height: 1.6;">
                Welcome to JEGHealth! Your caretaker account has been successfully created and linked to your patient.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #059669; margin-top: 0;">Account Details:</h3>
                <ul style="color: #4b5563; line-height: 1.8;">
                  <li><strong>Email:</strong> ${userData.email}</li>
                  <li><strong>Relationship:</strong> ${userData.relationship || 'Not specified'}</li>
                  <li><strong>Account Type:</strong> Caretaker</li>
                </ul>
              </div>
              
              <h3 style="color: #1f2937;">What You Can Do:</h3>
              <ul style="color: #4b5563; line-height: 1.8;">
                <li>Monitor your patient's vital signs in real-time</li>
                <li>Receive alerts for critical health events</li>
                <li>View health trends and reports</li>
                <li>Communicate with healthcare professionals</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${window.location.origin}/dashboard" 
                   style="background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                  Access Your Dashboard
                </a>
              </div>
              
              <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
                If you have any questions, please don't hesitate to contact our support team.
              </p>
            </div>
            
            <div style="background: #1f2937; padding: 20px; text-align: center;">
              <p style="color: #9ca3af; margin: 0; font-size: 14px;">
                © 2024 JEGHealth. All rights reserved.
              </p>
            </div>
          </div>
        `,
        text: `Welcome to JEGHealth, ${fullName}! Your caretaker account has been created successfully.`
      };
    }
  }

  // Method to get sent emails for demo purposes
  getSentEmails(): any[] {
    return JSON.parse(localStorage.getItem('sentEmails') || '[]');
  }
}

export const emailService = EmailService.getInstance();
