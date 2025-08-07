
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Heart, AlertTriangle, Clock, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Patient {
  id: number;
  name: string;
  age: number;
  careCode: string;
  status: 'stable' | 'warning' | 'critical' | 'pending';
  lastReading: string;
  heartRate?: number;
  oxygenLevel?: number;
}

interface PatientListProps {
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
  patients: Patient[];
  onApprovePatient: (patientId: number) => void;
}

const PatientList = ({ selectedPatient, onSelectPatient, patients, onApprovePatient }: PatientListProps) => {
  const { toast } = useToast();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable': return <Heart className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const handleApprove = (patient: Patient, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the patient
    onApprovePatient(patient.id);
    toast({
      title: "Patient Approved",
      description: `${patient.name} has been approved for monitoring.`,
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Patients</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Search patients..." className="pl-10" />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {patients.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-sm">No patients connected yet</p>
              <p className="text-xs mt-2">Connect patients to start monitoring</p>
            </div>
          ) : (
            patients.map((patient) => (
              <div
                key={patient.id}
                className={`p-4 cursor-pointer border-l-4 hover:bg-gray-50 transition-colors ${
                  selectedPatient?.id === patient.id
                    ? 'bg-green-50 border-l-green-500'
                    : 'border-l-transparent'
                }`}
                onClick={() => onSelectPatient(patient)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{patient.name}</h3>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(patient.status)}>
                      {getStatusIcon(patient.status)}
                    </Badge>
                    {patient.status === 'pending' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => handleApprove(patient, e)}
                        className="h-6 px-2 text-xs"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Age: {patient.age}</p>
                  <p>Code: {patient.careCode}</p>
                  <p className="text-xs">{patient.lastReading}</p>
                  {patient.heartRate && patient.oxygenLevel && (
                    <div className="flex justify-between text-xs">
                      <span>HR: {patient.heartRate} bpm</span>
                      <span>SpO2: {patient.oxygenLevel}%</span>
                    </div>
                  )}
                  {patient.status === 'pending' && (
                    <p className="text-xs text-blue-600 font-medium">
                      Awaiting patient approval
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientList;
