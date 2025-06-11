import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";
import { Activity, Droplets, TrendingUp, AlertCircle, Download } from "lucide-react";

interface PulseOximeterProps {
  patientId: number;
}

const PulseOximeter = ({ patientId }: PulseOximeterProps) => {
  const oxygenTrendData = [
    { time: '00:00', spo2: 98, heartRate: 72 },
    { time: '02:00', spo2: 97, heartRate: 70 },
    { time: '04:00', spo2: 98, heartRate: 68 },
    { time: '06:00', spo2: 97, heartRate: 75 },
    { time: '08:00', spo2: 98, heartRate: 78 },
    { time: '10:00', spo2: 96, heartRate: 80 },
    { time: '12:00', spo2: 97, heartRate: 78 },
    { time: '14:00', spo2: 98, heartRate: 82 },
    { time: '16:00', spo2: 97, heartRate: 85 },
    { time: '18:00', spo2: 98, heartRate: 76 },
    { time: '20:00', spo2: 98, heartRate: 74 },
    { time: '22:00', spo2: 97, heartRate: 72 },
  ];

  const chartConfig = {
    spo2: {
      label: "SpO2 (%)",
      color: "#3b82f6",
    },
    heartRate: {
      label: "Heart Rate (BPM)",
      color: "#ef4444",
    },
  };

  const downloadOximeterData = (format: 'json' | 'csv' | 'report') => {
    const oximeterData = {
      patientId,
      timestamp: new Date().toISOString(),
      deviceInfo: {
        model: 'MAX30102 Sensor',
        status: 'Connected',
        signalQuality: 'Excellent',
        batteryLevel: '75%',
        lastSync: '2 minutes ago'
      },
      currentReadings: {
        spo2: 98,
        pulseRate: 78,
        trend: 'Stable'
      },
      trendData: oxygenTrendData
    };

    switch (format) {
      case 'json':
        downloadJSON(oximeterData);
        break;
      case 'csv':
        downloadCSV(oximeterData);
        break;
      case 'report':
        downloadReport(oximeterData);
        break;
    }
  };

  const downloadJSON = (data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-pulse-oximeter-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = (data: any) => {
    let csvContent = 'Time,SpO2 (%),Heart Rate (BPM)\n';
    
    data.trendData.forEach((item: any) => {
      csvContent += `${item.time},${item.spo2},${item.heartRate}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-pulse-oximeter-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadReport = (data: any) => {
    const htmlContent = `
      <html>
        <head>
          <title>Pulse Oximeter Report - Patient ${patientId}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            .metrics { display: flex; gap: 20px; margin: 20px 0; }
            .metric-card { border: 1px solid #ddd; padding: 15px; border-radius: 5px; }
            table { border-collapse: collapse; width: 100%; margin: 20px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Pulse Oximeter Report</h1>
          <p>Patient ID: ${patientId}</p>
          <p>Report Generated: ${new Date().toLocaleDateString()}</p>
          
          <h2>Current Readings</h2>
          <div class="metrics">
            <div class="metric-card">
              <h3>SpO2</h3>
              <p>${data.currentReadings.spo2}%</p>
              <small>Normal Range</small>
            </div>
            <div class="metric-card">
              <h3>Pulse Rate</h3>
              <p>${data.currentReadings.pulseRate} BPM</p>
              <small>Normal</small>
            </div>
            <div class="metric-card">
              <h3>Trend</h3>
              <p>${data.currentReadings.trend}</p>
              <small>Last 4 hours</small>
            </div>
          </div>
          
          <h2>Device Information</h2>
          <table>
            <tr><th>Parameter</th><th>Value</th></tr>
            <tr><td>Device Model</td><td>${data.deviceInfo.model}</td></tr>
            <tr><td>Connection Status</td><td>${data.deviceInfo.status}</td></tr>
            <tr><td>Signal Quality</td><td>${data.deviceInfo.signalQuality}</td></tr>
            <tr><td>Battery Level</td><td>${data.deviceInfo.batteryLevel}</td></tr>
            <tr><td>Last Sync</td><td>${data.deviceInfo.lastSync}</td></tr>
          </table>
          
          <h2>24-Hour Trend Data</h2>
          <table>
            <tr><th>Time</th><th>SpO2 (%)</th><th>Heart Rate (BPM)</th></tr>
            ${data.trendData.map((item: any) => `<tr><td>${item.time}</td><td>${item.spo2}</td><td>${item.heartRate}</td></tr>`).join('')}
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patient-${patientId}-pulse-oximeter-report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Download Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Pulse Oximeter Data</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => downloadOximeterData('json')}>
                <Download className="w-4 h-4 mr-1" />
                JSON
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadOximeterData('csv')}>
                <Download className="w-4 h-4 mr-1" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={() => downloadOximeterData('report')}>
                <Download className="w-4 h-4 mr-1" />
                Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Current Readings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">SpO2</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">98%</div>
            <div className="text-sm text-green-600">Normal Range</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Pulse Rate</span>
            </div>
            <div className="text-3xl font-bold text-red-600">78</div>
            <div className="text-sm text-green-600">BPM</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Trend</span>
            </div>
            <div className="text-lg font-bold text-green-600">Stable</div>
            <div className="text-sm text-gray-600">Last 4 hours</div>
          </CardContent>
        </Card>
      </div>

      {/* SpO2 Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Oxygen Saturation Trend (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <AreaChart data={oxygenTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={[94, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="spo2"
                stroke="var(--color-spo2)"
                fill="var(--color-spo2)"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Combined Heart Rate and SpO2 */}
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate vs SpO2 Correlation</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={oxygenTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis yAxisId="spo2" domain={[94, 100]} />
              <YAxis yAxisId="hr" orientation="right" domain={[60, 90]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                yAxisId="spo2"
                type="monotone"
                dataKey="spo2"
                stroke="var(--color-spo2)"
                strokeWidth={2}
                dot={{ fill: "var(--color-spo2)" }}
              />
              <Line
                yAxisId="hr"
                type="monotone"
                dataKey="heartRate"
                stroke="var(--color-heartRate)"
                strokeWidth={2}
                dot={{ fill: "var(--color-heartRate)" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Device Status and Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Device Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">MAX30102 Sensor</span>
                <span className="text-green-600 text-sm">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Signal Quality</span>
                <span className="text-green-600 text-sm">Excellent</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Battery Level</span>
                <span className="text-yellow-600 text-sm">75%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Sync</span>
                <span className="text-gray-600 text-sm">2 minutes ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <Activity className="w-4 h-4 text-green-600" />
                <div>
                  <div className="text-sm font-medium text-green-800">Normal Reading</div>
                  <div className="text-xs text-green-600">All vitals within range</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <div>
                  <div className="text-sm font-medium text-yellow-800">Reminder</div>
                  <div className="text-xs text-yellow-600">Device maintenance due in 3 days</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PulseOximeter;
