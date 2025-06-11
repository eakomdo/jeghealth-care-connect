
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Clock, Bell, Heart, Activity, MapPin } from "lucide-react";

interface AlertsPanelProps {
  patientId: number;
}

interface Alert {
  id: number;
  type: 'critical' | 'warning' | 'info';
  category: 'ecg' | 'vitals' | 'movement' | 'device';
  title: string;
  description: string;
  timestamp: string;
  acknowledged: boolean;
  resolved: boolean;
}

const AlertsPanel = ({ patientId }: AlertsPanelProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'warning',
      category: 'vitals',
      title: 'Elevated Heart Rate',
      description: 'Heart rate peaked at 95 BPM during afternoon activity',
      timestamp: '2 hours ago',
      acknowledged: false,
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      category: 'movement',
      title: 'Daily Goal Achievement',
      description: 'Patient completed 80% of daily step goal',
      timestamp: '4 hours ago',
      acknowledged: true,
      resolved: true
    },
    {
      id: 3,
      type: 'critical',
      category: 'ecg',
      title: 'Irregular Rhythm Detected',
      description: 'Brief episode of atrial fibrillation detected at 14:30',
      timestamp: '6 hours ago',
      acknowledged: true,
      resolved: false
    },
    {
      id: 4,
      type: 'warning',
      category: 'device',
      title: 'Low Battery Warning',
      description: 'ECG device battery level below 20%',
      timestamp: '8 hours ago',
      acknowledged: false,
      resolved: false
    },
    {
      id: 5,
      type: 'info',
      category: 'movement',
      title: 'Location Update',
      description: 'Patient arrived at pharmacy as scheduled',
      timestamp: '1 day ago',
      acknowledged: true,
      resolved: true
    }
  ]);

  const acknowledgeAlert = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const resolveAlert = (alertId: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const getAlertIcon = (category: string) => {
    switch (category) {
      case 'ecg': return <Heart className="w-4 h-4" />;
      case 'vitals': return <Activity className="w-4 h-4" />;
      case 'movement': return <MapPin className="w-4 h-4" />;
      case 'device': return <Bell className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200 text-red-800';
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'info': return 'bg-blue-50 border-blue-200 text-blue-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical': return 'destructive';
      case 'warning': return 'secondary';
      case 'info': return 'outline';
      default: return 'secondary';
    }
  };

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const criticalAlerts = alerts.filter(alert => alert.type === 'critical' && !alert.resolved);
  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged && !alert.resolved);

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-gray-600">Critical</span>
            </div>
            <div className="text-3xl font-bold text-red-600">{criticalAlerts.length}</div>
            <div className="text-sm text-gray-600">Active alerts</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600">Pending</span>
            </div>
            <div className="text-3xl font-bold text-yellow-600">{unacknowledgedAlerts.length}</div>
            <div className="text-sm text-gray-600">Need attention</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Active</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">{activeAlerts.length}</div>
            <div className="text-sm text-gray-600">Total active</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Resolved</span>
            </div>
            <div className="text-3xl font-bold text-green-600">{alerts.filter(a => a.resolved).length}</div>
            <div className="text-sm text-gray-600">This week</div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active ({activeAlerts.length})</TabsTrigger>
              <TabsTrigger value="critical">Critical ({criticalAlerts.length})</TabsTrigger>
              <TabsTrigger value="all">All Alerts ({alerts.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.category)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge variant={getBadgeVariant(alert.type)}>
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{alert.description}</p>
                        <p className="text-xs opacity-75">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!alert.acknowledged && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="critical" className="space-y-4">
              {criticalAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.category)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge variant={getBadgeVariant(alert.type)}>
                            {alert.type.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{alert.description}</p>
                        <p className="text-xs opacity-75">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {!alert.acknowledged && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => acknowledgeAlert(alert.id)}
                        >
                          Acknowledge
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border ${getAlertColor(alert.type)} ${
                    alert.resolved ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.category)}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge variant={getBadgeVariant(alert.type)}>
                            {alert.type.toUpperCase()}
                          </Badge>
                          {alert.acknowledged && (
                            <Badge variant="outline">Acknowledged</Badge>
                          )}
                          {alert.resolved && (
                            <Badge variant="outline">Resolved</Badge>
                          )}
                        </div>
                        <p className="text-sm mb-2">{alert.description}</p>
                        <p className="text-xs opacity-75">{alert.timestamp}</p>
                      </div>
                    </div>
                    {!alert.resolved && (
                      <div className="flex space-x-2">
                        {!alert.acknowledged && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => acknowledgeAlert(alert.id)}
                          >
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => resolveAlert(alert.id)}
                        >
                          Resolve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsPanel;
