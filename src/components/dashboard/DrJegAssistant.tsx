
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Send, User, Bot, Heart, Activity, TrendingUp, AlertTriangle } from "lucide-react";
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

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface DrJegAssistantProps {
  patient: Patient;
}

const DrJegAssistant = ({ patient }: DrJegAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm Dr. JEG, your AI medical assistant. I've reviewed ${patient.name}'s current health data. How can I help you today?`,
      timestamp: new Date(),
      suggestions: [
        'Analyze current vital signs',
        'Suggest medication adjustments',
        'Review health trends',
        'Emergency protocols'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Mock AI responses based on patient data and user input
    if (lowerMessage.includes('vital') || lowerMessage.includes('heart rate') || lowerMessage.includes('oxygen')) {
      return `Based on ${patient.name}'s current vitals:
      
**Heart Rate**: ${patient.heartRate || 'N/A'} bpm - ${patient.heartRate && patient.heartRate > 90 ? 'Slightly elevated, consider monitoring stress levels' : 'Within normal range'}

**Oxygen Saturation**: ${patient.oxygenLevel || 'N/A'}% - ${patient.oxygenLevel && patient.oxygenLevel < 95 ? 'Below optimal, recommend oxygen therapy assessment' : 'Good saturation levels'}

**Recommendation**: Continue current monitoring protocol. Consider 24-hour Holter monitoring if heart rate irregularities persist.`;
    }
    
    if (lowerMessage.includes('medication') || lowerMessage.includes('drug') || lowerMessage.includes('prescription')) {
      return `**Medication Analysis for ${patient.name}**:

Based on age (${patient.age}) and current status (${patient.status}):

**Suggested Medications**:
- **ACE Inhibitor**: Lisinopril 10mg daily (if hypertensive)
- **Beta Blocker**: Metoprolol 50mg BID (for heart rate control)
- **Aspirin**: 81mg daily (cardiovascular protection)

**Contraindications**: Monitor kidney function with ACE inhibitors. Check for drug interactions.

**Note**: This is AI-generated guidance. Always verify with current medical guidelines and patient history.`;
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('analysis') || lowerMessage.includes('pattern')) {
      return `**Health Trend Analysis for ${patient.name}**:

**Past 24 Hours**:
- Heart rate trending stable with minor fluctuations
- Oxygen levels consistently above 95%
- Activity patterns show normal daily routine

**Risk Assessment**: Low risk based on current data
**Recommendations**: 
1. Continue current monitoring
2. Encourage regular light exercise
3. Monitor for any sudden changes`;
    }
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('alert')) {
      return `**Emergency Protocol for ${patient.name}**:

**Current Status**: ${patient.status.toUpperCase()}

**Alert Thresholds**:
- Heart Rate: <50 or >120 bpm
- SpO2: <90%
- No response for >30 minutes

**Emergency Actions**:
1. Contact emergency services if critical thresholds met
2. Notify primary physician
3. Activate family emergency contacts
4. Prepare for potential hospitalization

**Current Risk**: ${patient.status === 'critical' ? 'HIGH - Immediate attention required' : 'MODERATE - Continue monitoring'}`;
    }
    
    // Default response
    return `I understand you're asking about "${userMessage}". Based on ${patient.name}'s current health profile:

**Patient Summary**:
- Age: ${patient.age} years
- Current Status: ${patient.status}
- Last Reading: ${patient.lastReading}

Could you be more specific about what aspect of their care you'd like me to analyze? I can help with:
- Vital signs interpretation
- Medication recommendations
- Health trend analysis
- Emergency protocols`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <div key={index} className="font-semibold text-gray-900 mt-2 mb-1">
              {line.slice(2, -2)}
            </div>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <div key={index} className="ml-4 text-gray-700">
              • {line.slice(2)}
            </div>
          );
        }
        return line ? (
          <div key={index} className="text-gray-700 mb-1">
            {line}
          </div>
        ) : (
          <div key={index} className="mb-2"></div>
        );
      });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-xl">Dr. JEG AI Assistant</CardTitle>
              <p className="text-gray-600">AI-powered medical analysis for {patient.name}</p>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              <Activity className="w-4 h-4 mr-1" />
              Active
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Patient Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Patient Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Age: {patient.age}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm text-gray-600">HR: {patient.heartRate || 'N/A'} bpm</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-600">SpO2: {patient.oxygenLevel || 'N/A'}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <Badge variant={patient.status === 'stable' ? 'default' : 'destructive'}>
                {patient.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat Interface */}
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="text-lg">Medical Consultation</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-80 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      {message.type === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                      <span className="text-xs font-medium">
                        {message.type === 'user' ? 'You' : 'Dr. JEG'}
                      </span>
                    </div>
                    <div className="text-sm">
                      {message.type === 'ai' ? formatMessage(message.content) : message.content}
                    </div>
                    {message.suggestions && (
                      <div className="mt-3 space-y-1">
                        <p className="text-xs font-medium">Quick suggestions:</p>
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            size="sm"
                            variant="outline"
                            className="mr-2 mb-1 h-6 text-xs"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4" />
                      <span className="text-xs">Dr. JEG is typing...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask Dr. JEG about medications, analysis, or recommendations..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrJegAssistant;
