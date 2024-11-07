"use client"

import { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bell, Home, Hotel, ClipboardCheck, Menu, User } from 'lucide-react'
import { motion } from 'framer-motion'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const chartData = {
    labels: ['Pending', 'Completed', 'Failed'],
    datasets: [
      {
        label: 'Inspection Status',
        data: [12, 19, 3],
        backgroundColor: ['rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Inspection Status Overview',
      },
    },
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ duration: 0.3 }}
        className="w-64 bg-white shadow-md"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold text-purple-600">Aurora Tourism</h2>
        </div>
        <nav className="mt-6">
          <Button variant="ghost" className="w-full justify-start p-4">
            <Home className="mr-2 h-5 w-5" />
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start p-4">
            <Hotel className="mr-2 h-5 w-5" />
            Accommodations
          </Button>
          <Button variant="ghost" className="w-full justify-start p-4">
            <ClipboardCheck className="mr-2 h-5 w-5" />
            Inspections
          </Button>
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-sm">
          <Button variant="ghost" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Inspection Dashboard</h1>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Accommodations</CardTitle>
                <Hotel className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Inspections</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">-5% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed Inspections</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">189</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Inspection Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Bar data={chartData} options={chartOptions} />
            </CardContent>
          </Card>

          {/* Recent Inspections Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Inspections</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Accommodation</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Aurora Lights Hotel</TableCell>
                    <TableCell>2024-03-15</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        Completed
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Northern Sky Lodge</TableCell>
                    <TableCell>2024-03-14</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Polar Bear Inn</TableCell>
                    <TableCell>2024-03-13</TableCell>
                    <TableCell>Mike Johnson</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                        Failed
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}