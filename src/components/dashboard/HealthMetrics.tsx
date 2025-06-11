import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Heart, Activity, MapPin, TrendingUp, Download } from "lucide-react";

interface HealthMetricsProps {
  patientId: number;
}

const HealthMetrics = ({ patientId }: HealthMetricsProps) => {
  // Sample data for the last 24 hours
  const heartRateData = [
    { time: '00:00', value: 72 },
    { time: '04:00', value: 68 },
    { time: '08:00', value: 75 },
    { time: '12:00', value: 78 },
    { time: '16:00', value: 82 },
    { time: '20:00', value: 76 },
    { time: '24:00', value: 74 },
  ];

  const oxygenData = [
    { time: '00:00', value: 98 },
    { time: '04:00', value: 97 },
    { time: '08:00', value: 98 },
    { time: '12:00', value: 97 },
    { time: '16:00', value: 96 },
    { time: '20:00', value: 98 },
    { time: '24:00', value: 98 },
  ];

  const movementData = [
    { time: '00:00', steps: 0, activity: 'sleep' },
    { time: '06:00', steps: 50, activity: 'light' },
    { time: '09:00', steps: 200, activity: 'moderate' },
    { time: '12:00', steps: 150, activity: 'light' },
    { time: '15:00', steps: 300, activity: 'moderate' },
    { time: '18:00', steps: 100, activity: 'light' },
    { time: '21:00', steps: 20, activity: 'rest' },
  ];

  const chartConfig = {
    heartRate: {
      label: "Heart Rate",
      color: "#ef4444",
    },
    oxygen: {
      label: "Oxygen Saturation",
      color: "#3b82f6",
    },
    movement: {
      label: "Movement",
      color: "#10b981",
    },
  };

  const downloadHealthData = (format: 'pdf' | 'csv' | 'json') => {
    const patientData = {
      patientId,
      timestamp: new Date().toISOString(),
      currentMetrics: {
        heartRate: 78,
        spO2: 98,
        activity: 1250,
        location: 'Home'
      },
      heartRateData,
      oxygenData,
      movementData
    };

    switch (format) {
      case 'json':
        downloadJSON(patientData);
        break;
      case 'csv':
        downloadCSV(patientData);
        break;
      case 'pdf':
        downloadPDF(patientData);
        break;
    }
  };

  const downloadJSON = (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-health-metrics-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = (data: any) => {
    let csvContent = 'Type,Time,Value,Unit\n';
    
    data.heartRateData.forEach((item: any) => {
      csvContent += `Heart Rate,${item.time},${item.value},bpm\n`;
    });
    
    data.oxygenData.forEach((item: any) => {
      csvContent += `Oxygen Saturation,${item.time},${item.value},%\n`;
    });
    
    data.movementData.forEach((item: any) => {
      csvContent += `Movement,${item.time},${item.steps},steps\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-health-metrics-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPDF = (data: any) => {
    // Simple HTML to PDF conversion (for demo purposes)
    const htmlContent = `
      <html>
        <head>
          <title>Health Metrics Report - Patient ${patientId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Health Metrics Report</h1>
          <p>Patient ID: ${patientId}</p>
          <p>Report Generated: ${new Date().toLocaleDateString()}</p>
          
          <h2>Current Metrics</h2>
          <table>
            <tr><th>Metric</th><th>Value</th><th>Status</th></tr>
            <tr><td>Heart Rate</td><td>${data.currentMetrics.heartRate} bpm</td><td>Normal</td></tr>
            <tr><td>Oxygen Saturation</td><td>${data.currentMetrics.spO2}%</td><td>Normal</td></tr>
            <tr><td>Daily Steps</td><td>${data.currentMetrics.activity}</td><td>Active</td></tr>
            <tr><td>Location</td><td>${data.currentMetrics.location}</td><td>Safe</td></tr>
          </table>
          
          <h2>24-Hour Heart Rate Data</h2>
          <table>
            <tr><th>Time</th><th>Heart Rate (bpm)</th></tr>
            ${data.heartRateData.map((item: any) => `<tr><td>${item.time}</td><td>${item.value}</td></tr>`).join('')}
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-health-metrics-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    console.log('HTML report downloaded. For PDF conversion, you can print this HTML file as PDF from your browser.');
  };

  return (
    <div className="space-y-6">
      {/* Download Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Health Metrics Overview</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => downloadHealthData('json')}>
                <Download className="w-4 h-4 mr-1" />
                JSON
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadHealthData('csv')}>
                <Download className="w-4 h-4 mr-1" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadHealthData('pdf')}>
                <Download className="w-4 h-4 mr-1" />
                Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Heart Rate</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-gray-500">bpm • Normal</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">SpO2</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-gray-500">Oxygen • Normal</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Activity</span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold">1,250</div>
              <p className="text-xs text-gray-500">steps today</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Location</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold">Home</div>
              <p className="text-xs text-gray-500">Last update: 2min ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heart Rate Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate Trend (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={heartRateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-heartRate)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-heartRate)" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Oxygen Saturation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Oxygen Saturation (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={oxygenData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[95, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-oxygen)" 
                fill="var(--color-oxygen)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthMetrics;
