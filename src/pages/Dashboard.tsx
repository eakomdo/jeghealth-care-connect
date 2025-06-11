
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Heart, Activity, User, MapPin, AlertTriangle, TrendingUp } from "lucide-react";
import PatientList from "@/components/dashboard/PatientList";
import HealthMetrics from "@/components/dashboard/HealthMetrics";
import ECGMonitor from "@/components/dashboard/ECGMonitor";
import PulseOximeter from "@/components/dashboard/PulseOximeter";
import MovementTracker from "@/components/dashboard/MovementTracker";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import SettingsPanel from "@/components/dashboard/SettingsPanel";

type PatientStatus = "stable" | "warning" | "critical";

interface Patient {
  id: number;
  name: string;
  age: number;
  careCode: string;
  status: PatientStatus;
  lastReading: string;
}

interface UserData {
  title?: string;
  firstName: string;
  lastName: string;
  email: string;
  relationship?: string;
}

const Dashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<Patient>({
    id: 1,
    name: "John Doe",
    age: 72,
    careCode: "JD2024001",
    status: "stable",
    lastReading: "2 minutes ago"
  });

  const [activeTab, setActiveTab] = useState("overview");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userType, setUserType] = useState<string>('');

  useEffect(() => {
    // Load user data from localStorage (demo purposes)
    const storedUserData = localStorage.getItem('userData');
    const storedUserType = localStorage.getItem('userType');
    
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      // Default demo data if no stored data
      setUserData({
        title: "Dr.",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@hospital.com"
      });
    }
    
    if (storedUserType) {
      setUserType(storedUserType);
    } else {
      setUserType('professional'); // Default
    }
  }, []);

  const getDisplayName = () => {
    if (!userData) return "Healthcare Professional";
    
    const title = userData.title ? userData.title + " " : "";
    return `${title}${userData.firstName} ${userData.lastName}`;
  };

  const getUserRole = () => {
    if (userType === 'caretaker') {
      return userData?.relationship ? `Caretaker (${userData.relationship.replace('family-', '').replace('-', ' ')})` : 'Caretaker';
    }
    return 'Healthcare Professional';
  };

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
              <Button>Add Patient</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Patient List Sidebar */}
          <div className="lg:col-span-1">
            <PatientList 
              selectedPatient={selectedPatient}
              onSelectPatient={setSelectedPatient}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
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

            {/* Tabs for different views */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="ecg">ECG</TabsTrigger>
                <TabsTrigger value="vitals">Vitals</TabsTrigger>
                <TabsTrigger value="movement">Movement</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <HealthMetrics patientId={selectedPatient.id} />
              </TabsContent>

              <TabsContent value="ecg" className="space-y-6">
                <ECGMonitor patientId={selectedPatient.id} />
              </TabsContent>

              <TabsContent value="vitals" className="space-y-6">
                <PulseOximeter patientId={selectedPatient.id} />
              </TabsContent>

              <TabsContent value="movement" className="space-y-6">
                <MovementTracker patientId={selectedPatient.id} />
              </TabsContent>

              <TabsContent value="alerts" className="space-y-6">
                <AlertsPanel patientId={selectedPatient.id} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
          <SettingsPanel onClose={() => setIsSettingsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
