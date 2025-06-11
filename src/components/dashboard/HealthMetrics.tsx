
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Heart, Activity, MapPin, TrendingUp } from "lucide-react";

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

  return (
    <div className="space-y-6">
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
