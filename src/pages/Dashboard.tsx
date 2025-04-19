import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, LineChart, PieChart } from '@/components/dashboard/Charts';
import { AlertsTable } from '@/components/dashboard/AlertsTable';
import { ScanHistoryTable } from '@/components/dashboard/ScanHistoryTable';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Download, BarChart as BarChartIcon, AlertCircle, Shield, FileWarning, MoveDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Dashboard mockup with threat statistics and monitoring data
export function Dashboard() {
  // Date range state for filtering
  const [date, setDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState('7d');
  
  // Generate mock data for charts
  const generateMockData = () => {
    return {
      threatsByType: [
        { name: 'Malware', value: 42 },
        { name: 'Phishing', value: 28 },
        { name: 'Vulnerability', value: 15 },
        { name: 'Suspicious', value: 10 },
        { name: 'PUA', value: 5 },
      ],
      threatTrend: Array.from({ length: 7 }, (_, i) => ({
        date: format(new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), 'MMM dd'),
        count: Math.floor(Math.random() * 25) + 5,
      })),
      scanActivity: Array.from({ length: 7 }, (_, i) => ({
        date: format(new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000), 'MMM dd'),
        files: Math.floor(Math.random() * 40) + 10,
        urls: Math.floor(Math.random() * 30) + 5,
      })),
      // Mock alerts for the alerts table
      recentAlerts: Array.from({ length: 5 }, (_, i) => ({
        id: `alert-${i + 1}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 72) * 60 * 60 * 1000).toISOString(),
        type: ['Malware', 'Phishing', 'Vulnerability', 'Suspicious Activity', 'Ransomware'][Math.floor(Math.random() * 5)],
        source: ['File Scan', 'URL Scan', 'System Monitor', 'Network Scanner'][Math.floor(Math.random() * 4)],
        severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
        status: ['new', 'investigating', 'resolved'][Math.floor(Math.random() * 3)],
        description: [
          'Trojan detected in uploaded file',
          'Phishing attempt blocked',
          'Critical vulnerability found in system',
          'Suspicious network activity detected',
          'Potential ransomware behavior observed'
        ][Math.floor(Math.random() * 5)],
      })),
      // Mock scan history
      scanHistory: Array.from({ length: 10 }, (_, i) => ({
        id: `scan-${i + 1}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 168) * 60 * 60 * 1000).toISOString(),
        type: ['File', 'URL'][Math.floor(Math.random() * 2)],
        target: ['File', 'URL'][Math.floor(Math.random() * 2)] === 'File' 
          ? ['document.pdf', 'setup.exe', 'archive.zip', 'image.png', 'script.js'][Math.floor(Math.random() * 5)]
          : ['https://example.com', 'https://test.org', 'https://demo.net'][Math.floor(Math.random() * 3)],
        result: ['clean', 'malicious', 'suspicious'][Math.floor(Math.random() * 3)],
        threats: Math.floor(Math.random() * 5),
      })),
      // Summary stats
      summary: {
        totalScans: 427,
        threatsBlocked: 78,
        criticalAlerts: 12,
        avgScanTime: '1.8s',
      }
    };
  };

  const data = generateMockData();

  return (
    <div className="space-y-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <BarChartIcon className="mr-2 h-6 w-6" /> Security Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">Monitor your security posture and track threat activity</p>
      </div>

      {/* Date range and controls */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.totalScans}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
            <FileWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.threatsBlocked}</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.criticalAlerts}</div>
            <p className="text-xs text-destructive">+2 in last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Scan Time</CardTitle>
            <MoveDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.summary.avgScanTime}</div>
            <p className="text-xs text-muted-foreground">-0.3s from last week</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Threat Activity</CardTitle>
            <CardDescription>Daily detected threats over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={data.threatTrend} /> 
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Threats by Type</CardTitle>
            <CardDescription>Distribution of detected threats</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart data={data.threatsByType} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scan Activity</CardTitle>
          <CardDescription>Number of files and URLs scanned</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart data={data.scanActivity} />
        </CardContent>
      </Card>

      {/* Tabs for alerts and scan history */}
      <Tabs defaultValue="alerts" className="w-full">
        <TabsList>
          <TabsTrigger value="alerts">
            <AlertCircle className="mr-2 h-4 w-4" />
            Recent Alerts
          </TabsTrigger>
          <TabsTrigger value="history">
            <Shield className="mr-2 h-4 w-4" />
            Scan History
          </TabsTrigger>
        </TabsList>
        <TabsContent value="alerts" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Alerts</CardTitle>
              <CardDescription>Recent security alerts and notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsTable alerts={data.recentAlerts} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>Recent file and URL scans</CardDescription>
            </CardHeader>
            <CardContent>
              <ScanHistoryTable history={data.scanHistory} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
