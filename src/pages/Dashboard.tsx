import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Activity, User, MapPin, AlertTriangle, TrendingUp, Brain, Users, Monitor, Bell, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { providerService, ProviderStats } from "@/services/providerService";
import PatientList from "@/components/dashboard/PatientList";
import HealthMetrics from "@/components/dashboard/HealthMetrics";
import ECGMonitor from "@/components/dashboard/ECGMonitor";
import PulseOximeter from "@/components/dashboard/PulseOximeter";
import MovementTracker from "@/components/dashboard/MovementTracker";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import SettingsPanel from "@/components/dashboard/SettingsPanel";
import AddPatientDialog from "@/components/dashboard/AddPatientDialog";
import DrJegAssistant from "@/components/dashboard/DrJegAssistant";

type PatientStatus = "stable" | "warning" | "critical" | "pending";

interface Patient {
  id: number;
  name: string;
  age: number;
  careCode: string;
  status: PatientStatus;
  lastReading: string;
  heartRate?: number;
  oxygenLevel?: number;
}

interface UserData {
  id?: number;
  title?: string;
  first_name: string;
  last_name: string;
  email: string;
  organization?: string;
  role?: string;
  phone?: string;
  relationship?: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userType, setUserType] = useState<string>('');
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [stats, setStats] = useState<ProviderStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    // Load user data from localStorage and validate authentication
    const storedUserData = localStorage.getItem('userData');
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      setUserData(user);
      setUserType(user.userType || 'professional');
      loadDashboardStats();
    } else {
      // If no user data but we have a token, redirect to login
      navigate('/login');
    }
  }, [navigate, toast]);

  const loadDashboardStats = async () => {
    try {
      setIsLoadingStats(true);
      console.log('Loading dashboard stats...');
      
      const dashboardStats = await providerService.getDashboardStats();
      console.log('Raw dashboard stats received:', dashboardStats);
      
      // Validate the data structure
      if (dashboardStats && typeof dashboardStats === 'object') {
        console.log('Dashboard stats structure:', Object.keys(dashboardStats));
        
        // Ensure stats property exists with valid data
        if (!dashboardStats.stats || typeof dashboardStats.stats !== 'object') {
          console.warn('Invalid stats data structure received:', dashboardStats);
          console.log('dashboardStats.stats:', dashboardStats.stats);
          
          // Set default stats if structure is invalid
          dashboardStats.stats = {
            total_appointments: 0,
            patients_count: 0,
            upcoming_appointments: 0,
            completed_appointments: 0
          };
        } else {
          console.log('Dashboard stats.stats:', dashboardStats.stats);
        }
        
        setStats(dashboardStats);
      } else {
        console.warn('Invalid dashboard stats response:', dashboardStats);
        // Set default complete structure
        const defaultStats: ProviderStats = {
          provider_profile: {
            id: '',
            full_name: 'Unknown',
            professional_title: 'Healthcare Provider',
            specialization: '',
            years_of_experience: 0,
            consultation_fee: '0',
            organization_facility: '',
            professional_role: '',
            license_verified: false
          },
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
        setStats(defaultStats);
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
      
      // Set default complete structure on error
      const defaultStats: ProviderStats = {
        provider_profile: {
          id: '',
          full_name: 'Unknown',
          professional_title: 'Healthcare Provider',
          specialization: '',
          years_of_experience: 0,
          consultation_fee: '0',
          organization_facility: '',
          professional_role: '',
          license_verified: false
        },
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
      setStats(defaultStats);
      
      toast({
        title: "Failed to load statistics",
        description: "Could not fetch dashboard data. Default values are shown.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingStats(false);
    }
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

  const getDisplayName = () => {
    if (!userData) return "Healthcare Professional";
    
    const title = userData.title ? userData.title + " " : "";
    return `${title}${userData.first_name} ${userData.last_name}`;
  };

  const getUserRole = () => {
    if (userType === 'caretaker') {
      return userData?.relationship ? `Caretaker (${userData.relationship.replace('family-', '').replace('-', ' ')})` : 'Caretaker';
    }
    return 'Healthcare Professional';
  };

  const handleAddPatient = (newPatient: Patient) => {
    console.log('New patient connection request:', newPatient);
    setPatients(prev => {
      const updated = [...prev, newPatient];
      // If this is the first patient, select it automatically
      if (prev.length === 0) {
        setSelectedPatient(newPatient);
      }
      return updated;
    });
    
    // Simulate mobile app notification
    console.log(`Confirmation sent to patient ${newPatient.name} at care code ${newPatient.careCode}`);
  };

  const handleApprovePatient = (patientId: number) => {
    setPatients(prev => prev.map(patient => {
      if (patient.id === patientId) {
        const updatedPatient = {
          ...patient,
          status: 'stable' as PatientStatus,
          lastReading: 'Just connected',
          heartRate: 75 + Math.floor(Math.random() * 20),
          oxygenLevel: 95 + Math.floor(Math.random() * 5)
        };
        
        // If this is the selected patient, update it
        if (selectedPatient?.id === patientId) {
          setSelectedPatient(updatedPatient);
        }
        
        return updatedPatient;
      }
      return patient;
    }));
  };

  // Get other patients (excluding the selected one) for the AI assistant
  const otherPatients = selectedPatient ? patients.filter(p => p.id !== selectedPatient.id) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Header */}
      <div className="bg-white dark:bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-foreground">
                JEG<span className="text-green-600">Health</span> Dashboard
              </h1>
              <div className="flex items-center space-x-4 mt-1">
                <p className="text-gray-600 dark:text-muted-foreground">
                  Welcome, {getDisplayName()}
                </p>
                <Badge variant="outline" className="text-blue-600 border-blue-600">
                  {getUserRole()}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Activity className="w-4 h-4 mr-1" />
                Live Monitoring
              </Badge>
              <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
                Settings
              </Button>
              <Button onClick={() => setIsAddPatientOpen(true)}>Connect Patient</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Statistics Overview */}
        {isLoadingStats ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-gray-100 rounded-full mr-4 animate-pulse">
                      <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    </div>
                    <div>
                      <div className="h-8 bg-gray-300 rounded mb-2 w-16 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : stats && stats.stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full mr-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.stats.total_appointments || 0}</p>
                    <p className="text-gray-600 text-sm">Total Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-full mr-4">
                    <Monitor className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.stats.patients_count || 0}</p>
                    <p className="text-gray-600 text-sm">Today's Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-orange-100 rounded-full mr-4">
                    <Bell className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.stats.upcoming_appointments || 0}</p>
                    <p className="text-gray-600 text-sm">Upcoming Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stats.stats.completed_appointments || 0}</p>
                    <p className="text-gray-600 text-sm">Completed Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient List Sidebar */}
          <div className="lg:col-span-1">
            <PatientList 
              selectedPatient={selectedPatient}
              onSelectPatient={setSelectedPatient}
              patients={patients}
              onApprovePatient={handleApprovePatient}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedPatient ? (
              <>
                {/* Patient Header */}
                <Card className="mb-6">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
                          <User className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{selectedPatient.name}</CardTitle>
                          <p className="text-gray-600 dark:text-muted-foreground">
                            Age: {selectedPatient.age} • Care Code: {selectedPatient.careCode}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={selectedPatient.status === 'stable' ? 'default' : 'destructive'}
                          className="mb-2"
                        >
                          {selectedPatient.status.toUpperCase()}
                        </Badge>
                        <p className="text-sm text-gray-500 dark:text-muted-foreground">
                          Last reading: {selectedPatient.lastReading}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Show message for pending patients */}
                {selectedPatient.status === 'pending' ? (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">
                          Patient Approval Pending
                        </h3>
                        <p className="text-blue-700">
                          {selectedPatient.name} needs to approve the connection request on their mobile app 
                          before health monitoring can begin.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Tabs for different views */}
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-6">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="ecg">ECG</TabsTrigger>
                        <TabsTrigger value="vitals">Vitals</TabsTrigger>
                        <TabsTrigger value="movement">Movement</TabsTrigger>
                        <TabsTrigger value="alerts">Alerts</TabsTrigger>
                        <TabsTrigger value="ai-assistant">
                          <Brain className="w-4 h-4 mr-1" />
                          Dr. JEG
                        </TabsTrigger>
                      </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <HealthMetrics patientId={selectedPatient.id} patientName={selectedPatient.name} />
                  </TabsContent>

                  <TabsContent value="ecg" className="space-y-6">
                    <ECGMonitor patientId={selectedPatient.id} patientName={selectedPatient.name} />
                  </TabsContent>

                  <TabsContent value="vitals" className="space-y-6">
                    <PulseOximeter patientId={selectedPatient.id} patientName={selectedPatient.name} />
                  </TabsContent>

                  <TabsContent value="movement" className="space-y-6">
                    <MovementTracker patientId={selectedPatient.id} />
                  </TabsContent>

                  <TabsContent value="alerts" className="space-y-6">
                    <AlertsPanel patientId={selectedPatient.id} />
                  </TabsContent>

                  <TabsContent value="ai-assistant" className="space-y-6">
                    <DrJegAssistant patient={selectedPatient} patients={otherPatients} />
                  </TabsContent>
                </Tabs>
              </>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 bg-blue-100 rounded-full">
                  <User className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">
                  No Patients Connected
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground max-w-md">
                  Connect with patients to start monitoring their health data. Click "Connect Patient" to send a connection request.
                </p>
                <Button onClick={() => setIsAddPatientOpen(true)} className="mt-4">
                  Connect Your First Patient
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Add Patient Dialog */}
      <AddPatientDialog
        open={isAddPatientOpen}
        onOpenChange={setIsAddPatientOpen}
        onAddPatient={handleAddPatient}
      />
    </div>
  );
};

export default Dashboard;
