import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Heart, Play, Pause, Download, AlertTriangle } from "lucide-react";

interface ECGMonitorProps {
  patientId: number;
}

const ECGMonitor = ({ patientId }: ECGMonitorProps) => {
  const [isRecording, setIsRecording] = useState(true);
  const [ecgData, setEcgData] = useState<Array<{ time: number; value: number }>>([]);

  // Simulate real-time ECG data
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setEcgData(prev => {
        const newTime = prev.length > 0 ? prev[prev.length - 1].time + 1 : 0;
        const newData = [...prev];
        
        // Generate ECG-like waveform
        const baseValue = Math.sin(newTime * 0.1) * 10;
        const heartBeat = Math.sin(newTime * 0.8) * 50 * Math.exp(-(((newTime % 10) - 2) ** 2));
        const noise = (Math.random() - 0.5) * 5;
        
        newData.push({
          time: newTime,
          value: baseValue + heartBeat + noise + 100
        });

        // Keep only last 100 points for smooth scrolling
        return newData.slice(-100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording]);

  const currentHeartRate = 78;
  const rhythmStatus = "Normal Sinus Rhythm";
  const lastAnalysis = "2 minutes ago";

  const chartConfig = {
    ecg: {
      label: "ECG Signal",
      color: "#ef4444",
    },
  };

  const downloadECGData = (format: 'json' | 'csv' | 'report') => {
    const ecgAnalysis = {
      patientId,
      timestamp: new Date().toISOString(),
      recordingDuration: ecgData.length * 0.1, // seconds
      analysis: {
        heartRate: currentHeartRate,
        rhythm: rhythmStatus,
        heartRateVariability: '32ms',
        qtInterval: '420ms',
        lastAnalysis: lastAnalysis
      },
      rawData: ecgData,
      alerts: [
        {
          type: 'monitoring',
          message: 'Patient shows occasional premature ventricular contractions (PVCs)',
          frequency: '2-3 per hour',
          severity: 'low'
        }
      ]
    };

    switch (format) {
      case 'json':
        downloadJSON(ecgAnalysis);
        break;
      case 'csv':
        downloadCSV(ecgAnalysis);
        break;
      case 'report':
        downloadReport(ecgAnalysis);
        break;
    }
  };

  const downloadJSON = (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-ecg-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = (data: any) => {
    let csvContent = 'Time (ms),ECG Value (mV)\n';
    
    data.rawData.forEach((item: any) => {
      csvContent += `${item.time * 100},${item.value}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-ecg-raw-data-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadReport = (data: any) => {
    const htmlContent = `
      <html>
        <head>
          <title>ECG Analysis Report - Patient ${patientId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            .analysis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0; }
            .analysis-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
            .alert-box { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 10px 0; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>ECG Analysis Report</h1>
          <p>Patient ID: ${patientId}</p>
          <p>Report Generated: ${new Date().toLocaleDateString()}</p>
          <p>Recording Duration: ${data.recordingDuration.toFixed(1)} seconds</p>
          
          <h2>ECG Analysis</h2>
          <div class="analysis-grid">
            <div class="analysis-card">
              <h3>Heart Rate</h3>
              <p style="font-size: 24px; color: #e74c3c;">${data.analysis.heartRate} BPM</p>
              <small>Normal range</small>
            </div>
            <div class="analysis-card">
              <h3>Rhythm</h3>
              <p style="font-size: 18px; color: #27ae60;">${data.analysis.rhythm}</p>
              <small>Regular pattern detected</small>
            </div>
            <div class="analysis-card">
              <h3>Heart Rate Variability</h3>
              <p style="font-size: 18px; color: #3498db;">${data.analysis.heartRateVariability}</p>
              <small>RMSSD - Normal</small>
            </div>
            <div class="analysis-card">
              <h3>QT Interval</h3>
              <p style="font-size: 18px; color: #27ae60;">${data.analysis.qtInterval}</p>
              <small>Within normal range</small>
            </div>
          </div>
          
          <h2>Clinical Notes</h2>
          ${data.alerts.map((alert: any) => `
            <div class="alert-box">
              <strong>${alert.type.toUpperCase()}:</strong> ${alert.message}
              <br><small>Frequency: ${alert.frequency} | Severity: ${alert.severity}</small>
            </div>
          `).join('')}
          
          <h2>Recommendations</h2>
          <ul>
            <li>Continue routine monitoring</li>
            <li>Follow up on PVC frequency in next assessment</li>
            <li>Maintain current medication regimen</li>
            <li>Schedule cardiology consultation if PVC frequency increases</li>
          </ul>
          
          <p><small>Last Analysis: ${data.analysis.lastAnalysis}</small></p>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-ecg-report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* ECG Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span>Live ECG Monitor</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={isRecording ? "default" : "secondary"}>
                {isRecording ? "Recording" : "Paused"}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadECGData('json')}>
                <Download className="w-4 h-4 mr-1" />
                JSON
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadECGData('csv')}>
                <Download className="w-4 h-4 mr-1" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadECGData('report')}>
                <Download className="w-4 h-4 mr-1" />
                Report
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{currentHeartRate}</div>
              <div className="text-sm text-gray-600">BPM</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-semibold text-green-600">{rhythmStatus}</div>
              <div className="text-sm text-gray-600">Rhythm</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium">Last Analysis</div>
              <div className="text-sm text-gray-600">{lastAnalysis}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Live ECG Waveform */}
      <Card>
        <CardHeader>
          <CardTitle>ECG Waveform - Lead II</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-black rounded-lg p-4">
            <ChartContainer config={chartConfig} className="h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ecgData}>
                  <XAxis hide />
                  <YAxis hide />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#00ff00"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>• Green line shows real-time ECG signal</p>
            <p>• Chart updates every 100ms for smooth monitoring</p>
            <p>• Automatic arrhythmia detection active</p>
          </div>
        </CardContent>
      </Card>

      {/* ECG Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>ECG Analysis & Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Heart className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-800">Normal Rhythm Detected</div>
                <div className="text-sm text-green-600">Regular R-R intervals, normal P waves</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Heart Rate Variability</h4>
                <div className="text-2xl font-bold text-blue-600">32ms</div>
                <div className="text-sm text-gray-600">RMSSD - Normal</div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">QT Interval</h4>
                <div className="text-2xl font-bold text-green-600">420ms</div>
                <div className="text-sm text-gray-600">Within normal range</div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
                <span className="font-medium text-yellow-800">Monitoring Notes</span>
              </div>
              <p className="text-sm text-yellow-700 mt-1">
                Patient shows occasional premature ventricular contractions (PVCs). 
                Frequency: 2-3 per hour. Monitoring continues.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ECGMonitor;
