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
        const heartBeat = Math.sin(newTime * 0.8) * 50 * Math.exp(-((newTime % 10) - 2) ** 2);
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
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4" />
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
