
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Heart, AlertTriangle } from "lucide-react";

interface Patient {
  id: number;
  name: string;
  age: number;
  careCode: string;
  status: 'stable' | 'warning' | 'critical';
  lastReading: string;
  heartRate?: number;
  oxygenLevel?: number;
}

interface PatientListProps {
  selectedPatient: Patient;
  onSelectPatient: (patient: Patient) => void;
}

const PatientList = ({ selectedPatient, onSelectPatient }: PatientListProps) => {
  const patients: Patient[] = [
    {
      id: 1,
      name: "John Doe",
      age: 72,
      careCode: "JD2024001",
      status: "stable",
      lastReading: "2 minutes ago",
      heartRate: 78,
      oxygenLevel: 98
    },
    {
      id: 2,
      name: "Mary Smith",
      age: 68,
      careCode: "MS2024002",
      status: "warning",
      lastReading: "5 minutes ago",
      heartRate: 95,
      oxygenLevel: 94
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 75,
      careCode: "RJ2024003",
      status: "stable",
      lastReading: "1 minute ago",
      heartRate: 82,
      oxygenLevel: 97
    },
    {
      id: 4,
      name: "Linda Williams",
      age: 70,
      careCode: "LW2024004",
      status: "critical",
      lastReading: "30 seconds ago",
      heartRate: 110,
      oxygenLevel: 89
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable': return <Heart className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
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
          {patients.map((patient) => (
            <div
              key={patient.id}
              className={`p-4 cursor-pointer border-l-4 hover:bg-gray-50 transition-colors ${
                selectedPatient.id === patient.id
                  ? 'bg-green-50 border-l-green-500'
                  : 'border-l-transparent'
              }`}
              onClick={() => onSelectPatient(patient)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{patient.name}</h3>
                <Badge className={getStatusColor(patient.status)}>
                  {getStatusIcon(patient.status)}
                </Badge>
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>Age: {patient.age}</p>
                <p>Code: {patient.careCode}</p>
                <p className="text-xs">{patient.lastReading}</p>
                {patient.heartRate && (
                  <div className="flex justify-between text-xs">
                    <span>HR: {patient.heartRate} bpm</span>
                    <span>SpO2: {patient.oxygenLevel}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientList;
