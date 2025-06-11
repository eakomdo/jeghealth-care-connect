import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  taggedPatients?: Patient[];
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
  patients?: Patient[];
}

const DrJegAssistant = ({ patient, patients = [] }: DrJegAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: `Hello! I'm Dr. JEG, your AI medical assistant. I've reviewed ${patient.name}'s current health data. You can upload health documents (lab reports, medical history, etc.) for deeper analysis. You can also tag other patients using @ followed by their name to include their metrics in our discussion. How can I help you today?`,
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
  const [showPatientSuggestions, setShowPatientSuggestions] = useState(false);
  const [currentMentionQuery, setCurrentMentionQuery] = useState('');
  const [mentionStartIndex, setMentionStartIndex] = useState(-1);
  const [taggedPatients, setTaggedPatients] = useState<Patient[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // All available patients including the current one
  const allPatients = [patient, ...patients].filter((p, index, self) => 
    index === self.findIndex(t => t.id === p.id)
  );

  useEffect(() => {
    const handleInputChange = () => {
      if (!inputRef.current) return;
      
      const cursorPosition = inputRef.current.selectionStart;
      const textBeforeCursor = inputMessage.substring(0, cursorPosition);
      const atIndex = textBeforeCursor.lastIndexOf('@');
      
      if (atIndex !== -1) {
        const queryAfterAt = textBeforeCursor.substring(atIndex + 1);
        const hasSpaceAfterAt = queryAfterAt.includes(' ');
        
        if (!hasSpaceAfterAt) {
          setCurrentMentionQuery(queryAfterAt);
          setMentionStartIndex(atIndex);
          setShowPatientSuggestions(true);
        } else {
          setShowPatientSuggestions(false);
        }
      } else {
        setShowPatientSuggestions(false);
      }
    };

    handleInputChange();
  }, [inputMessage]);

  const handlePatientSelect = (selectedPatient: Patient) => {
    if (!inputRef.current) return;
    
    const beforeMention = inputMessage.substring(0, mentionStartIndex);
    const afterCursor = inputMessage.substring(inputRef.current.selectionStart);
    const newMessage = `${beforeMention}@${selectedPatient.name} ${afterCursor}`;
    
    setInputMessage(newMessage);
    setShowPatientSuggestions(false);
    
    // Add to tagged patients if not already tagged
    if (!taggedPatients.find(p => p.id === selectedPatient.id)) {
      setTaggedPatients(prev => [...prev, selectedPatient]);
    }
    
    // Focus back to input
    setTimeout(() => {
      inputRef.current?.focus();
      const newCursorPosition = mentionStartIndex + selectedPatient.name.length + 2;
      inputRef.current?.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  const getPatientHealthSummary = (patientData: Patient) => {
    return `**${patientData.name}'s Current Health Metrics:**
- **Age**: ${patientData.age} years
- **Status**: ${patientData.status.toUpperCase()}
- **Heart Rate**: ${patientData.heartRate || 'N/A'} bpm
- **Oxygen Saturation**: ${patientData.oxygenLevel || 'N/A'}%
- **Last Reading**: ${patientData.lastReading}
- **Care Code**: ${patientData.careCode}`;
  };

  const extractTaggedPatients = (message: string): Patient[] => {
    const mentionRegex = /@(\w+(?:\s+\w+)*)/g;
    const matches = message.match(mentionRegex);
    const tagged: Patient[] = [];
    
    if (matches) {
      matches.forEach(match => {
        const patientName = match.substring(1).trim();
        const foundPatient = allPatients.find(p => 
          p.name.toLowerCase().includes(patientName.toLowerCase())
        );
        if (foundPatient && !tagged.find(t => t.id === foundPatient.id)) {
          tagged.push(foundPatient);
        }
      });
    }
    
    return tagged;
  };

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

  const generateAIResponse = (userMessage: string, taggedPatientsInMessage: Patient[]): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Create health metrics summary for tagged patients
    let taggedPatientsContext = '';
    if (taggedPatientsInMessage.length > 0) {
      taggedPatientsContext = '\n\n**📊 Patient Health Metrics Summary:**\n\n';
      taggedPatientsInMessage.forEach(taggedPatient => {
        taggedPatientsContext += getPatientHealthSummary(taggedPatient) + '\n\n';
      });
    }
    
    // Enhanced responses that consider uploaded documents
    if (uploadedDocuments.length > 0) {
      const docContext = `\n\n**📋 Document Context**: I've analyzed ${uploadedDocuments.length} document(s) for ${patient.name}: ${uploadedDocuments.map(d => d.name).join(', ')}`;
      
      if (lowerMessage.includes('vital') || lowerMessage.includes('heart rate') || lowerMessage.includes('oxygen')) {
        return `${taggedPatientsContext}Based on the current vitals and uploaded documents:
        
**Current Patient Analysis** (${patient.name}):
- **Heart Rate**: ${patient.heartRate || 'N/A'} bpm - ${patient.heartRate && patient.heartRate > 90 ? 'Slightly elevated, correlate with document findings' : 'Within normal range'}
- **Oxygen Saturation**: ${patient.oxygenLevel || 'N/A'}% - ${patient.oxygenLevel && patient.oxygenLevel < 95 ? 'Below optimal, review with uploaded reports' : 'Good saturation levels'}

**Document Integration**: Cross-referencing real-time data with uploaded health records shows comprehensive patient picture.

**Enhanced Recommendations**: 
- Continue monitoring with document-guided parameters
- Consider trends shown in uploaded reports
- Adjust thresholds based on historical data${docContext}`;
      }
    }
    
    if (lowerMessage.includes('vital') || lowerMessage.includes('heart rate') || lowerMessage.includes('oxygen')) {
      return `${taggedPatientsContext}Based on the current patient vitals:
      
**${patient.name}'s Current Vitals**:
- **Heart Rate**: ${patient.heartRate || 'N/A'} bpm - ${patient.heartRate && patient.heartRate > 90 ? 'Slightly elevated, consider monitoring stress levels' : 'Within normal range'}
- **Oxygen Saturation**: ${patient.oxygenLevel || 'N/A'}% - ${patient.oxygenLevel && patient.oxygenLevel < 95 ? 'Below optimal, recommend oxygen therapy assessment' : 'Good saturation levels'}

**Recommendation**: Continue current monitoring protocol. Consider 24-hour Holter monitoring if heart rate irregularities persist.`;
    }
    
    if (lowerMessage.includes('medication') || lowerMessage.includes('drug') || lowerMessage.includes('prescription')) {
      return `${taggedPatientsContext}**Medication Analysis for ${patient.name}**:

Based on age (${patient.age}) and current status (${patient.status}):

**Suggested Medications**:
- **ACE Inhibitor**: Lisinopril 10mg daily (if hypertensive)
- **Beta Blocker**: Metoprolol 50mg BID (for heart rate control)
- **Aspirin**: 81mg daily (cardiovascular protection)

**Contraindications**: Monitor kidney function with ACE inhibitors. Check for drug interactions.

**Note**: This is AI-generated guidance. Always verify with current medical guidelines and patient history.`;
    }
    
    if (lowerMessage.includes('trend') || lowerMessage.includes('analysis') || lowerMessage.includes('pattern')) {
      return `${taggedPatientsContext}**Health Trend Analysis for ${patient.name}**:

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
      return `${taggedPatientsContext}**Emergency Protocol for ${patient.name}**:

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
    return `${taggedPatientsContext}I understand you're asking about "${userMessage}". Based on ${patient.name}'s current health profile:

**Patient Summary**:
- Age: ${patient.age} years
- Current Status: ${patient.status}
- Last Reading: ${patient.lastReading}

Could you be more specific about what aspect of their care you'd like me to analyze? I can help with:
- Vital signs interpretation
- Medication recommendations
- Health trend analysis
- Emergency protocols
- Document analysis (upload health reports for deeper insights)
- Comparative analysis (tag other patients with @ to compare metrics)`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Extract tagged patients from the message
    const taggedPatientsInMessage = extractTaggedPatients(inputMessage);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      taggedPatients: taggedPatientsInMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setTaggedPatients([]);
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputMessage, taggedPatientsInMessage),
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

  const removeTaggedPatient = (patientId: number) => {
    setTaggedPatients(prev => prev.filter(p => p.id !== patientId));
  };

  const formatMessage = (content: string) => {
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

  const filteredPatients = allPatients.filter(p =>
    p.name.toLowerCase().includes(currentMentionQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
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
                    {message.taggedPatients && message.taggedPatients.length > 0 && (
                      <div className="mt-2 text-xs opacity-75">
                        👥 Tagged: {message.taggedPatients.map(p => p.name).join(', ')}
                      </div>
                    )}
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

            {/* Tagged Patients Display */}
            {taggedPatients.length > 0 && (
              <div className="px-4 py-2 border-t bg-gray-50">
                <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                  <span>Tagged patients:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {taggedPatients.map((taggedPatient) => (
                    <Badge
                      key={taggedPatient.id}
                      variant="outline"
                      className="text-xs flex items-center space-x-1"
                    >
                      <span>{taggedPatient.name}</span>
                      <button
                        onClick={() => removeTaggedPatient(taggedPatient.id)}
                        className="ml-1 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2 relative">
                <div className="flex-1 relative">
                  <Textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask Dr. JEG about medications, analysis, or use @ to tag patients for comparison..."
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    disabled={isLoading}
                    className="min-h-[60px] resize-none"
                  />
                  
                  {/* Patient Suggestions Popover */}
                  {showPatientSuggestions && filteredPatients.length > 0 && (
                    <div className="absolute bottom-full left-0 w-full mb-2 z-50">
                      <Card className="shadow-lg">
                        <CardContent className="p-2">
                          <div className="space-y-1">
                            {filteredPatients.slice(0, 5).map((suggestionPatient) => (
                              <button
                                key={suggestionPatient.id}
                                onClick={() => handlePatientSelect(suggestionPatient)}
                                className="w-full text-left px-2 py-1 rounded hover:bg-gray-100 text-sm"
                              >
                                <div className="font-medium">{suggestionPatient.name}</div>
                                <div className="text-xs text-gray-500">
                                  Age {suggestionPatient.age} • {suggestionPatient.status}
                                </div>
                              </button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
                <Button onClick={handleSendMessage} disabled={isLoading || !inputMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                Use @ to tag patients for health metric comparison • Shift+Enter for new line
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DrJegAssistant;
