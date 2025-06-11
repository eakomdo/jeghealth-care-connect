import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Bell, 
  Monitor, 
  Shield, 
  Clock, 
  Heart, 
  Activity,
  Save,
  RefreshCw,
  LogOut
} from "lucide-react";

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel = ({ onClose }: SettingsPanelProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // User Profile Settings
  const [userSettings, setUserSettings] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    department: "Cardiology",
    license: "MD123456",
    timezone: "UTC-5"
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    criticalAlerts: true,
    warningAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    desktopNotifications: true,
    soundAlerts: true,
    alertFrequency: "immediate"
  });

  // Data Display Settings
  const [displaySettings, setDisplaySettings] = useState({
    refreshInterval: "30",
    chartTheme: "default",
    dataRetention: "7",
    showPredictions: true,
    autoRefresh: true,
    compactView: false,
    showTrends: true
  });

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    dataBackup: true,
    secureMode: true,
    sessionTimeout: "30",
    twoFactorAuth: false,
    auditLog: true,
    dataEncryption: true
  });

  const handleSaveSettings = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('dashboard-settings', JSON.stringify({
      user: userSettings,
      notifications: notificationSettings,
      display: displaySettings,
      system: systemSettings
    }));
    
    console.log('Settings saved successfully');
    onClose();
  };

  const handleResetSettings = () => {
    // Reset to default values
    setNotificationSettings({
      criticalAlerts: true,
      warningAlerts: true,
      emailNotifications: true,
      smsNotifications: false,
      desktopNotifications: true,
      soundAlerts: true,
      alertFrequency: "immediate"
    });
    
    setDisplaySettings({
      refreshInterval: "30",
      chartTheme: "default",
      dataRetention: "7",
      showPredictions: true,
      autoRefresh: true,
      compactView: false,
      showTrends: true
    });
    
    console.log('Settings reset to defaults');
  };

  const handleLogout = async () => {
    try {
      const { authService } = await import('@/services/authService');
      authService.logout();
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Error",
        description: "Something went wrong during logout.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Monitor className="w-6 h-6" />
            Dashboard Settings
          </CardTitle>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Display
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              System
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Account
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userSettings.name}
                  onChange={(e) => setUserSettings({...userSettings, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userSettings.email}
                  onChange={(e) => setUserSettings({...userSettings, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={userSettings.department} onValueChange={(value) => setUserSettings({...userSettings, department: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Emergency">Emergency Medicine</SelectItem>
                    <SelectItem value="ICU">Intensive Care</SelectItem>
                    <SelectItem value="General">General Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="license">Medical License</Label>
                <Input
                  id="license"
                  value={userSettings.license}
                  onChange={(e) => setUserSettings({...userSettings, license: e.target.value})}
                />
              </div>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Alert Types</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Critical Alerts</Label>
                    <p className="text-sm text-muted-foreground">Life-threatening conditions</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">Critical</Badge>
                    <Switch
                      checked={notificationSettings.criticalAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, criticalAlerts: checked})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Warning Alerts</Label>
                    <p className="text-sm text-muted-foreground">Concerning vital signs</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">Warning</Badge>
                    <Switch
                      checked={notificationSettings.warningAlerts}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, warningAlerts: checked})}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <h3 className="text-lg font-semibold">Delivery Methods</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Email Notifications</Label>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>SMS Notifications</Label>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Desktop Notifications</Label>
                  <Switch
                    checked={notificationSettings.desktopNotifications}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, desktopNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Sound Alerts</Label>
                  <Switch
                    checked={notificationSettings.soundAlerts}
                    onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, soundAlerts: checked})}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Refresh Interval (seconds)</Label>
                  <Select value={displaySettings.refreshInterval} onValueChange={(value) => setDisplaySettings({...displaySettings, refreshInterval: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                      <SelectItem value="300">5 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Data Retention (days)</Label>
                  <Select value={displaySettings.dataRetention} onValueChange={(value) => setDisplaySettings({...displaySettings, dataRetention: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 day</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto Refresh</Label>
                    <p className="text-sm text-muted-foreground">Automatically update data</p>
                  </div>
                  <Switch
                    checked={displaySettings.autoRefresh}
                    onCheckedChange={(checked) => setDisplaySettings({...displaySettings, autoRefresh: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Show Predictions</Label>
                    <p className="text-sm text-muted-foreground">AI-powered health predictions</p>
                  </div>
                  <Switch
                    checked={displaySettings.showPredictions}
                    onCheckedChange={(checked) => setDisplaySettings({...displaySettings, showPredictions: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Compact View</Label>
                    <p className="text-sm text-muted-foreground">Reduce spacing and size</p>
                  </div>
                  <Switch
                    checked={displaySettings.compactView}
                    onCheckedChange={(checked) => setDisplaySettings({...displaySettings, compactView: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Show Trends</Label>
                    <p className="text-sm text-muted-foreground">Display trend indicators</p>
                  </div>
                  <Switch
                    checked={displaySettings.showTrends}
                    onCheckedChange={(checked) => setDisplaySettings({...displaySettings, showTrends: checked})}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system" className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Session Timeout (minutes)</Label>
                <Select value={systemSettings.sessionTimeout} onValueChange={(value) => setSystemSettings({...systemSettings, sessionTimeout: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">Enhanced security</p>
                  </div>
                  <Switch
                    checked={systemSettings.twoFactorAuth}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, twoFactorAuth: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Backup</Label>
                    <p className="text-sm text-muted-foreground">Automatic data backup</p>
                  </div>
                  <Switch
                    checked={systemSettings.dataBackup}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, dataBackup: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Audit Logging</Label>
                    <p className="text-sm text-muted-foreground">Track all user actions</p>
                  </div>
                  <Switch
                    checked={systemSettings.auditLog}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, auditLog: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-muted-foreground">Encrypt sensitive data</p>
                  </div>
                  <Switch
                    checked={systemSettings.dataEncryption}
                    onCheckedChange={(checked) => setSystemSettings({...systemSettings, dataEncryption: checked})}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Account Management</h3>
              
              <div className="p-4 border rounded-lg space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Sign Out</h4>
                  <p className="text-sm text-muted-foreground">
                    This will log you out of your account and return you to the home page.
                  </p>
                  <Button 
                    variant="destructive" 
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button variant="outline" onClick={handleResetSettings} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
