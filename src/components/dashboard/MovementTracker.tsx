
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";
import { MapPin, TrendingUp, Clock, Footprints } from "lucide-react";

interface MovementTrackerProps {
  patientId: number;
}

const MovementTracker = ({ patientId }: MovementTrackerProps) => {
  const dailyActivityData = [
    { hour: '06:00', steps: 50, activity: 'light' },
    { hour: '07:00', steps: 120, activity: 'moderate' },
    { hour: '08:00', steps: 200, activity: 'moderate' },
    { hour: '09:00', steps: 180, activity: 'moderate' },
    { hour: '10:00', steps: 150, activity: 'light' },
    { hour: '11:00', steps: 100, activity: 'light' },
    { hour: '12:00', steps: 80, activity: 'rest' },
    { hour: '13:00', steps: 90, activity: 'light' },
    { hour: '14:00', steps: 160, activity: 'moderate' },
    { hour: '15:00', steps: 200, activity: 'moderate' },
    { hour: '16:00', steps: 140, activity: 'light' },
    { hour: '17:00', steps: 110, activity: 'light' },
    { hour: '18:00', steps: 70, activity: 'rest' },
  ];

  const weeklyData = [
    { day: 'Mon', steps: 2500, distance: 1.8 },
    { day: 'Tue', steps: 3200, distance: 2.3 },
    { day: 'Wed', steps: 1800, distance: 1.3 },
    { day: 'Thu', steps: 2800, distance: 2.0 },
    { day: 'Fri', steps: 3500, distance: 2.5 },
    { day: 'Sat', steps: 4200, distance: 3.0 },
    { day: 'Sun', steps: 1500, distance: 1.1 },
  ];

  const currentLocation = {
    name: "Home",
    address: "123 Main St, City",
    lastUpdate: "2 minutes ago",
    coordinates: { lat: 40.7128, lng: -74.0060 }
  };

  const chartConfig = {
    steps: {
      label: "Steps",
      color: "#10b981",
    },
    distance: {
      label: "Distance (km)",
      color: "#3b82f6",
    },
  };

  return (
    <div className="space-y-6">
      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Footprints className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Today's Steps</span>
            </div>
            <div className="text-3xl font-bold text-green-600">2,450</div>
            <div className="text-sm text-gray-600">Goal: 3,000</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Distance</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">1.8</div>
            <div className="text-sm text-gray-600">km today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Active Time</span>
            </div>
            <div className="text-3xl font-bold text-purple-600">4.5</div>
            <div className="text-sm text-gray-600">hours</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Location</span>
            </div>
            <div className="text-lg font-bold text-red-600">{currentLocation.name}</div>
            <div className="text-sm text-gray-600">{currentLocation.lastUpdate}</div>
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Activity Pattern</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={dailyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="steps"
                fill="var(--color-steps)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="steps" />
              <YAxis yAxisId="distance" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                yAxisId="steps"
                type="monotone"
                dataKey="steps"
                stroke="var(--color-steps)"
                strokeWidth={2}
                dot={{ fill: "var(--color-steps)" }}
              />
              <Line
                yAxisId="distance"
                type="monotone"
                dataKey="distance"
                stroke="var(--color-distance)"
                strokeWidth={2}
                dot={{ fill: "var(--color-distance)" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Location and Movement Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Current Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-medium">{currentLocation.name}</div>
                <div className="text-sm text-gray-600">{currentLocation.address}</div>
                <div className="text-xs text-gray-500">Last updated: {currentLocation.lastUpdate}</div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm font-medium mb-2">GPS Coordinates</div>
                <div className="text-sm text-gray-600">
                  Lat: {currentLocation.coordinates.lat}<br/>
                  Lng: {currentLocation.coordinates.lng}
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Safe Zone</span>
                </div>
                <div className="text-sm text-green-600">Patient is within designated safe area</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Movement Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Morning Activity</span>
                <span className="text-green-600 text-sm">Active</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Afternoon Rest</span>
                <span className="text-blue-600 text-sm">Light Activity</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Evening Walk</span>
                <span className="text-green-600 text-sm">Moderate</span>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800 mb-1">Activity Goal</div>
                <div className="text-sm text-blue-600">
                  82% of daily goal achieved<br/>
                  550 steps remaining
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MovementTracker;
