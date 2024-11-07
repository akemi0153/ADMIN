'use client'

import { useState } from 'react'
import { Bell, ChevronDown, Globe, Home, LineChart, MapPin, Shield, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

// Mock data for the chart
const visitorData = [
  { month: 'Jan', visitors: 4000 },
  { month: 'Feb', visitors: 3000 },
  { month: 'Mar', visitors: 5000 },
  { month: 'Apr', visitors: 4500 },
  { month: 'May', visitors: 6000 },
  { month: 'Jun', visitors: 7000 },
]

export function DashboardComponent() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardContent setActivePage={setActivePage} />
      case 'inspectors':
        return <InspectorManagement />
      case 'clients':
        return <ClientOversight />
      case 'compliance':
        return <ComplianceMonitoring />
      case 'statistics':
        return <TourismStatistics />
      case 'alerts':
        return <AlertsNotifications />
      default:
        return <DashboardContent setActivePage={setActivePage} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-blue-600">Tourism Admin</h1>
        </div>
        <nav className="mt-6">
          <SidebarItem icon={<Home />} label="Dashboard" active={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')} />
          <SidebarItem icon={<Users />} label="Inspector Management" active={activePage === 'inspectors'} onClick={() => setActivePage('inspectors')} />
          <SidebarItem icon={<Globe />} label="Client Oversight" active={activePage === 'clients'} onClick={() => setActivePage('clients')} />
          <SidebarItem icon={<Shield />} label="Compliance Monitoring" active={activePage === 'compliance'} onClick={() => setActivePage('compliance')} />
          <SidebarItem icon={<LineChart />} label="Tourism Statistics" active={activePage === 'statistics'} onClick={() => setActivePage('statistics')} />
          <SidebarItem icon={<Bell />} label="Alerts & Notifications" active={activePage === 'alerts'} onClick={() => setActivePage('alerts')} />
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
              {activePage.charAt(0).toUpperCase() + activePage.slice(1)}
            </h2>
            <Button variant="outline" className="flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <a
      href="#"
      className={`flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
        active ? 'bg-blue-50 text-blue-600' : ''
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="mx-3">{label}</span>
    </a>
  )
}

function DashboardContent({ setActivePage }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Inspector Management</CardTitle>
          <CardDescription>Manage and monitor inspector activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setActivePage('inspectors')}>View Inspectors</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Client Oversight</CardTitle>
          <CardDescription>Track tourism clients and their activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setActivePage('clients')}>View Clients</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Compliance Monitoring</CardTitle>
          <CardDescription>Ensure adherence to tourism regulations</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setActivePage('compliance')}>View Compliance</Button>
        </CardContent>
      </Card>
      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Visitor Statistics</CardTitle>
          <CardDescription>Monthly visitor trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              visitors: {
                label: "Visitors",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="visitors" stroke="var(--color-visitors)" fill="var(--color-visitors)" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

function InspectorManagement() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Inspector Management</h2>
      {/* Add inspector management content here */}
    </div>
  )
}

function ClientOversight() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Client Oversight</h2>
      {/* Add client oversight content here */}
    </div>
  )
}

function ComplianceMonitoring() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Compliance Monitoring</h2>
      {/* Add compliance monitoring content here */}
    </div>
  )
}

function TourismStatistics() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tourism Statistics & Analytics</h2>
      {/* Add tourism statistics content here */}
    </div>
  )
}

function AlertsNotifications() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Alerts & Notifications</h2>
      {/* Add alerts and notifications content here */}
    </div>
  )
}