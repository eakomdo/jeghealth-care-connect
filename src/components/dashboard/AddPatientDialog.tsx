
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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

interface AddPatientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPatient: (patient: Patient) => void;
}

const AddPatientDialog = ({ open, onOpenChange, onAddPatient }: AddPatientDialogProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    careCode: '',
    status: 'stable' as const
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.age || !formData.careCode) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const age = parseInt(formData.age);
    if (isNaN(age) || age < 1 || age > 120) {
      toast({
        title: "Error",
        description: "Please enter a valid age between 1 and 120.",
        variant: "destructive"
      });
      return;
    }

    // Validate care code format (simple validation for demo)
    if (formData.careCode.length < 6) {
      toast({
        title: "Error",
        description: "Care code must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call to verify the care code exists and is valid
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPatient: Patient = {
        id: Date.now(), // Simple ID generation for demo
        name: `${formData.firstName} ${formData.lastName}`,
        age: age,
        careCode: formData.careCode.toUpperCase(),
        status: formData.status,
        lastReading: "Just connected",
        heartRate: 75 + Math.floor(Math.random() * 20), // Random baseline
        oxygenLevel: 95 + Math.floor(Math.random() * 5) // Random baseline
      };

      onAddPatient(newPatient);
      
      toast({
        title: "Patient Connected",
        description: `${newPatient.name} has been successfully connected with care code ${newPatient.careCode}.`,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        age: '',
        careCode: '',
        status: 'stable'
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect patient. Please verify the care code is valid.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Connect Patient for Monitoring</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="careCode">Patient Care Code *</Label>
            <Input
              id="careCode"
              value={formData.careCode}
              onChange={(e) => handleInputChange('careCode', e.target.value)}
              placeholder="Enter patient's unique care code"
              disabled={isSubmitting}
              className="font-mono"
            />
            <p className="text-xs text-gray-500">
              Enter the unique code from the patient's monitoring device
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
                disabled={isSubmitting}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              placeholder="Enter age"
              min="1"
              max="120"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleInputChange('status', value)}
              disabled={isSubmitting}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stable">Stable</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Connecting..." : "Connect Patient"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientDialog;
