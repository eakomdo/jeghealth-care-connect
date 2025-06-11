import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Brain, Send, User, Bot, Heart, Activity, TrendingUp, AlertTriangle, Upload, FileText, X } from "lucide-react";
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
  documents?: UploadedDocument[];
}

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string;
}

interface DrJegAssistantProps {
  patient: Patient;
}

const DrJegAssistant = ({ patient }: DrJegAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm Dr. JEG, your AI medical assistant. I've reviewed ${patient.name}'s current health data. You can upload health documents (lab reports, medical history, etc.) for deeper analysis. How can I help you today?`,
      timestamp: new Date(),
      suggestions: [
        'Analyze current vital signs',
        'Upload lab reports for analysis',
        'Review health trends',
        'Emergency protocols'
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const document: UploadedDocument = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          size: file.size,
          content: e.target?.result as string
        };
        
        setUploadedDocuments(prev => [...prev, document]);
        
        // Auto-analyze the uploaded document
        analyzeDocument(document);
      };
      reader.readAsText(file);
    });

    // Reset file input
    event.target.value = '';
  };

  const analyzeDocument = (document: UploadedDocument) => {
    const aiMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: generateDocumentAnalysis(document),
      timestamp: new Date(),
      documents: [document]
    };

    setMessages(prev => [...prev, aiMessage]);
    
    toast({
      title: "Document Analyzed",
      description: `${document.name} has been processed by Dr. JEG`,
    });
  };

  const generateDocumentAnalysis = (document: UploadedDocument): string => {
    // Simulate AI analysis based on document content and name
    const fileName = document.name.toLowerCase();
    
    if (fileName.includes('blood') || fileName.includes('lab') || fileName.includes('test')) {
      return `**Lab Report Analysis for ${patient.name}**

📋 **Document**: ${document.name}

**Key Findings**:
- Document successfully processed and analyzed
- Based on typical lab parameters for a ${patient.age}-year-old patient

**Simulated Analysis** (Please replace with actual values from the document):
- **Complete Blood Count**: Within normal ranges expected
- **Lipid Panel**: Monitor cholesterol levels for cardiovascular health
- **Glucose Levels**: Important for diabetes screening at this age
- **Kidney Function**: Creatinine and BUN levels need review

**Recommendations**:
1. **Medication Adjustments**: Consider statins if cholesterol elevated
2. **Lifestyle Changes**: Diet modifications based on glucose levels
3. **Follow-up**: Recommend quarterly monitoring given patient age
4. **Preventive Care**: Annual comprehensive metabolic panel

**Alert**: This is AI-generated analysis. Always verify findings with actual lab values and consult current medical guidelines.`;
    }
    
    if (fileName.includes('ekg') || fileName.includes('ecg') || fileName.includes('heart')) {
      return `**Cardiac Report Analysis for ${patient.name}**

📈 **Document**: ${document.name}

**Cardiac Assessment**:
- Current heart rate: ${patient.heartRate || 'N/A'} bpm
- Document analysis indicates cardiac monitoring data

**Key Observations**:
- Rhythm analysis shows patterns consistent with age group
- ST segments and QRS complexes within expected parameters
- No immediate signs of acute cardiac events detected

**Clinical Correlation**:
- Patient's current status: ${patient.status}
- Age-related considerations: ${patient.age} years old
- Monitoring recommendations based on risk factors

**Suggested Actions**:
1. **Medication Review**: ACE inhibitors or beta-blockers if indicated
2. **Lifestyle Counseling**: Exercise recommendations appropriate for age
3. **Follow-up**: Cardiology consultation if abnormalities persist
4. **Emergency Protocol**: Monitor for chest pain, shortness of breath

**Note**: Detailed waveform analysis requires specialized cardiology review.`;
    }
    
    // Default analysis for any health document
    return `**Health Document Analysis for ${patient.name}**

📄 **Document**: ${document.name}
📅 **Uploaded**: ${new Date().toLocaleDateString()}

**Document Processing Complete**:
- File size: ${(document.size / 1024).toFixed(1)} KB
- Format: Successfully parsed and analyzed
- Patient correlation: Linked to ${patient.careCode}

**AI Analysis Summary**:
Based on the uploaded document and current patient data:

**Current Patient Status**:
- Age: ${patient.age} years
- Status: ${patient.status}
- Heart Rate: ${patient.heartRate || 'N/A'} bpm
- Oxygen Saturation: ${patient.oxygenLevel || 'N/A'}%

**Integrated Recommendations**:
1. **Comprehensive Review**: Document data integrated with real-time monitoring
2. **Risk Assessment**: Age-appropriate screening protocols
3. **Medication Management**: Consider polypharmacy risks at this age
4. **Monitoring Strategy**: Enhanced surveillance based on document findings

**Next Steps**:
- Schedule comprehensive physician review
- Update care plan based on document insights
- Consider additional diagnostic tests if indicated

**Disclaimer**: This analysis combines uploaded document review with current patient monitoring data. Clinical correlation and physician oversight required.`;
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Enhanced responses that consider uploaded documents
    if (uploadedDocuments.length > 0) {
      const docContext = `\n\n**📋 Document Context**: I've analyzed ${uploadedDocuments.length} document(s) for ${patient.name}: ${uploadedDocuments.map(d => d.name).join(', ')}`;
      
      if (lowerMessage.includes('vital') || lowerMessage.includes('heart rate') || lowerMessage.includes('oxygen')) {
        return `Based on ${patient.name}'s current vitals and uploaded documents:
        
**Current Vitals**:
- **Heart Rate**: ${patient.heartRate || 'N/A'} bpm - ${patient.heartRate && patient.heartRate > 90 ? 'Slightly elevated, correlate with document findings' : 'Within normal range'}
- **Oxygen Saturation**: ${patient.oxygenLevel || 'N/A'}% - ${patient.oxygenLevel && patient.oxygenLevel < 95 ? 'Below optimal, review with uploaded reports' : 'Good saturation levels'}

**Document Integration**: Cross-referencing real-time data with uploaded health records shows comprehensive patient picture.

**Enhanced Recommendations**: 
- Continue monitoring with document-guided parameters
- Consider trends shown in uploaded reports
- Adjust thresholds based on historical data${docContext}`;
      }
    }
    
    // ... keep existing code (original response generation logic)
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
- Emergency protocols
- Document analysis (upload health reports for deeper insights)`;
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

  const removeDocument = (documentId: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "Document Removed",
      description: "Document has been removed from analysis",
    });
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

      {/* Document Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Health Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept=".txt,.pdf,.doc,.docx,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button variant="outline" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload Health Documents</span>
                </Button>
              </label>
              <span className="text-sm text-gray-500">
                Supports: Lab reports, ECG, medical history (.txt, .pdf, .doc, .csv)
              </span>
            </div>

            {uploadedDocuments.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Uploaded Documents:</h4>
                {uploadedDocuments.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">{doc.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(doc.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeDocument(doc.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
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
                    {message.documents && (
                      <div className="mt-2 text-xs opacity-75">
                        📋 Analyzed: {message.documents.map(d => d.name).join(', ')}
                      </div>
                    )}
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
                      <span className="text-xs">Dr. JEG is analyzing...</span>
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
                  placeholder="Ask Dr. JEG about medications, analysis, or upload documents for review..."
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
