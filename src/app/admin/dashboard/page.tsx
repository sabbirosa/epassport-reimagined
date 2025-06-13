"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ServerStatus } from "@/lib/services/server-status";
import { Activity, AlertTriangle, BarChart, CheckCircle, Clock, Database, Server, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch server status data
  const fetchServerStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/server-status?history=true");
      
      if (!response.ok) {
        throw new Error("Failed to fetch server status");
      }
      
      const data = await response.json();
      setServerStatus(data.status);
      setError(null);
    } catch (err) {
      setError("Could not load server status data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // Initialize and set up polling interval
  useEffect(() => {
    // Initial fetch
    fetchServerStatus();
    
    // Set up polling every 30 seconds
    const intervalId = setInterval(fetchServerStatus, 30000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // Helper function to get color based on value
  const getColorForValue = (value: number, thresholds: { warning: number, critical: number }) => {
    if (value >= thresholds.critical) return "text-red-600";
    if (value >= thresholds.warning) return "text-amber-500";
    return "text-green-600";
  };
  
  // Helper function to render status badge
  const renderStatusBadge = (status: 'normal' | 'high' | 'critical') => {
    const config = {
      normal: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
      high: { bg: "bg-amber-100", text: "text-amber-800", icon: Clock },
      critical: { bg: "bg-red-100", text: "text-red-800", icon: AlertTriangle },
    };
    
    const { bg, text, icon: Icon } = config[status];
    
    return (
      <div className={`${bg} ${text} px-3 py-1 rounded-full text-sm font-medium inline-flex items-center`}>
        <Icon className="h-4 w-4 mr-1" />
        {status === 'normal' ? 'Normal' : status === 'high' ? 'High Load' : 'Critical'}
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Server Status Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle><Skeleton className="h-4 w-32" /></CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-6">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Server Status Dashboard</h1>
        <div className="flex items-center space-x-2">
          {serverStatus && renderStatusBadge(serverStatus.status)}
          <span className="text-sm text-gray-500">
            Last updated: {new Date(serverStatus?.timestamp || "").toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="applications">Application Queue</TabsTrigger>
          <TabsTrigger value="documents">Document Verification</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* System status cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CPU Load */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Server className="h-4 w-4 mr-1" /> CPU Load
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">
                  <span className={getColorForValue(serverStatus?.cpuLoad || 0, { warning: 70, critical: 85 })}>
                    {serverStatus?.cpuLoad}%
                  </span>
                </div>
                <Progress 
                  value={serverStatus?.cpuLoad} 
                  className={`h-2 ${
                    serverStatus?.cpuLoad && serverStatus.cpuLoad > 85 
                      ? "bg-red-200" 
                      : serverStatus?.cpuLoad && serverStatus.cpuLoad > 70 
                        ? "bg-amber-200" 
                        : "bg-green-200"
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {serverStatus?.cpuLoad && serverStatus.cpuLoad > 85 
                    ? "System under heavy load" 
                    : serverStatus?.cpuLoad && serverStatus.cpuLoad > 70 
                      ? "Moderate load" 
                      : "Normal operation"}
                </p>
              </CardContent>
            </Card>
            
            {/* Memory Usage */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Database className="h-4 w-4 mr-1" /> Memory Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">
                  <span className={getColorForValue(serverStatus?.memoryUsage || 0, { warning: 65, critical: 80 })}>
                    {serverStatus?.memoryUsage}%
                  </span>
                </div>
                <Progress 
                  value={serverStatus?.memoryUsage} 
                  className={`h-2 ${
                    serverStatus?.memoryUsage && serverStatus.memoryUsage > 80 
                      ? "bg-red-200" 
                      : serverStatus?.memoryUsage && serverStatus.memoryUsage > 65 
                        ? "bg-amber-200" 
                        : "bg-green-200"
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {serverStatus?.memoryUsage && serverStatus.memoryUsage > 80 
                    ? "High memory pressure" 
                    : serverStatus?.memoryUsage && serverStatus.memoryUsage > 65 
                      ? "Moderate memory usage" 
                      : "Normal memory usage"}
                </p>
              </CardContent>
            </Card>
            
            {/* Active Users */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="h-4 w-4 mr-1" /> Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">
                  {serverStatus?.activeUsers.toLocaleString()}
                </div>
                <Progress 
                  value={Math.min(100, (serverStatus?.activeUsers || 0) / 20)} 
                  className="h-2 bg-blue-200"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Current online users
                </p>
              </CardContent>
            </Card>
            
            {/* Response Time */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Activity className="h-4 w-4 mr-1" /> Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">
                  <span className={getColorForValue(serverStatus?.responseTime || 0, { warning: 200, critical: 300 })}>
                    {serverStatus?.responseTime} ms
                  </span>
                </div>
                <Progress 
                  value={Math.min(100, (serverStatus?.responseTime || 0) / 5)} 
                  className={`h-2 ${
                    serverStatus?.responseTime && serverStatus.responseTime > 300 
                      ? "bg-red-200" 
                      : serverStatus?.responseTime && serverStatus.responseTime > 200 
                        ? "bg-amber-200" 
                        : "bg-green-200"
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Average response time
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional server information */}
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Current server status and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">System Status</h3>
                  <p className="text-lg font-medium">
                    {serverStatus?.maintenanceMode ? (
                      <span className="text-amber-600">Maintenance Mode</span>
                    ) : (
                      <span className={
                        serverStatus?.status === 'critical' 
                          ? 'text-red-600' 
                          : serverStatus?.status === 'high' 
                            ? 'text-amber-600' 
                            : 'text-green-600'
                      }>
                        {serverStatus?.status === 'critical' 
                          ? 'Critical' 
                          : serverStatus?.status === 'high' 
                            ? 'High Load' 
                            : 'Normal Operation'}
                      </span>
                    )}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Uptime</h3>
                  <p className="text-lg font-medium">
                    {serverStatus?.uptime ? (
                      serverStatus.uptime >= 24 
                        ? `${Math.floor(serverStatus.uptime / 24)} days, ${serverStatus.uptime % 24} hours` 
                        : `${serverStatus.uptime} hours`
                    ) : 'N/A'}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Application Queue</h3>
                  <p className="text-lg font-medium">
                    {serverStatus?.queueLength} applications
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Server Time</h3>
                  <p className="text-lg font-medium">
                    {new Date(serverStatus?.timestamp || "").toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Charts</CardTitle>
              <CardDescription>Historical performance data (24 hours)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <BarChart className="h-16 w-16 text-gray-300" />
                <p className="text-gray-500 ml-4">Performance charts will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Queue</CardTitle>
              <CardDescription>Manage pending applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <p className="text-gray-500">Application queue management will be implemented here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Document Stats Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">254</div>
                <p className="text-xs text-gray-500 mt-1">Documents uploaded</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-600">38</div>
                <p className="text-xs text-gray-500 mt-1">Awaiting verification</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">189</div>
                <p className="text-xs text-gray-500 mt-1">Verified documents</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">27</div>
                <p className="text-xs text-gray-500 mt-1">Requiring resubmission</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Processing Times */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Average Processing Time</CardTitle>
                <CardDescription>Time to verify documents by type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>National ID Card</span>
                      <span className="font-medium">38 minutes</span>
                    </div>
                    <Progress value={38} max={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Birth Certificate</span>
                      <span className="font-medium">55 minutes</span>
                    </div>
                    <Progress value={55} max={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Passport Photo</span>
                      <span className="font-medium">22 minutes</span>
                    </div>
                    <Progress value={22} max={60} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                      <span>Signature</span>
                      <span className="font-medium">18 minutes</span>
                    </div>
                    <Progress value={18} max={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>Documents processed in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[220px] flex items-end justify-between gap-2">
                  {[12, 18, 15, 9, 4, 21, 16].map((value, index) => (
                    <div key={index} className="relative h-full flex flex-col items-center">
                      <div 
                        className="w-12 bg-blue-100 rounded-t-sm hover:bg-blue-200 transition-colors" 
                        style={{ height: `${(value / 21) * 100}%` }}
                      >
                        <div className="absolute top-0 -mt-6 text-xs font-medium">{value}</div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-end">
            <Button asChild>
              <Link href="/admin/documents">View All Documents</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 