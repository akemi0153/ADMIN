'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpDown, BarChart3, CheckCircle, Clock, Hotel, LogOut, Menu, Settings, Users } from "lucide-react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const municipalities = ['Baler', 'Maria Aurora', 'San Luis']

const mockData = {
  accommodations: [
    { id: 1, name: "Sunset Hotel", municipality: "Baler", status: "Approved", lastInspection: "2024-03-15" },
    { id: 2, name: "Ocean View Resort", municipality: "Maria Aurora", status: "Pending", lastInspection: "2024-02-28" },
    { id: 3, name: "Mountain Retreat", municipality: "San Luis", status: "Approved", lastInspection: "2024-03-10" },
    { id: 4, name: "Surfside Inn", municipality: "Baler", status: "Pending", lastInspection: "2024-03-05" },
    { id: 5, name: "Forest Lodge", municipality: "Maria Aurora", status: "Approved", lastInspection: "2024-03-20" },
  ],
  inspectorLogs: [
    { id: 1, inspector: "John Doe", action: "Completed inspection", hotel: "Sunset Hotel", date: "2024-03-15", municipality: "Baler" },
    { id: 2, inspector: "Jane Smith", action: "Scheduled inspection", hotel: "Ocean View Resort", date: "2024-03-01", municipality: "Maria Aurora" },
    { id: 3, inspector: "Mike Johnson", action: "Updated form", hotel: "Mountain Retreat", date: "2024-03-10", municipality: "San Luis" },
    { id: 4, inspector: "Sarah Brown", action: "Completed inspection", hotel: "Surfside Inn", date: "2024-03-05", municipality: "Baler" },
    { id: 5, inspector: "Chris Lee", action: "Scheduled inspection", hotel: "Forest Lodge", date: "2024-03-18", municipality: "Maria Aurora" },
  ],
  growthData: {
    Baler: [
      { month: 'Jan', accommodations: 10 },
      { month: 'Feb', accommodations: 12 },
      { month: 'Mar', accommodations: 15 },
      { month: 'Apr', accommodations: 18 },
    ],
    'Maria Aurora': [
      { month: 'Jan', accommodations: 8 },
      { month: 'Feb', accommodations: 9 },
      { month: 'Mar', accommodations: 11 },
      { month: 'Apr', accommodations: 13 },
    ],
    'San Luis': [
      { month: 'Jan', accommodations: 6 },
      { month: 'Feb', accommodations: 7 },
      { month: 'Mar', accommodations: 9 },
      { month: 'Apr', accommodations: 10 },
    ],
  },
}

export default function SuperAdminDashboard() {
  const [accommodations, setAccommodations] = useState(mockData.accommodations)
  const [inspectorLogs, setInspectorLogs] = useState(mockData.inspectorLogs)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const [selectedMunicipality, setSelectedMunicipality] = useState('All')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const sortedAccommodations = [...accommodations].sort((a, b) => {
    if (sortConfig.key === null) return 0
    const aValue = a[sortConfig.key]
    const bValue = b[sortConfig.key]
    if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1
    return 0
  })

  const filteredAccommodations = selectedMunicipality === 'All'
    ? sortedAccommodations
    : sortedAccommodations.filter(acc => acc.municipality === selectedMunicipality)

  const stats = {
    total: filteredAccommodations.length,
    pending: filteredAccommodations.filter(acc => acc.status === 'Pending').length,
    approved: filteredAccommodations.filter(acc => acc.status === 'Approved').length,
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/placeholder-aurora-logo.png" // Replace with actual logo URL
                alt="Aurora Provincial Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white hidden md:block">Aurora Provincial Tourism</h1>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-4">
                <Button variant="ghost">Dashboard</Button>
                <Button variant="ghost">Inspectors</Button>
                <Button variant="ghost">Reports</Button>
              </nav>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder-avatar.png" alt="Super Admin" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Super Admin</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@aurora.gov.ph
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
          {isMobileMenuOpen && (
            <nav className="mt-4 md:hidden">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                <Button variant="ghost" className="w-full justify-start">Inspectors</Button>
                <Button variant="ghost" className="w-full justify-start">Reports</Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Super Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Accommodations</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Inspections</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Inspections</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approved}</div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Municipality Growth Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {municipalities.map((municipality) => (
              <Card key={municipality}>
                <CardHeader>
                  <CardTitle>{municipality} Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={mockData.growthData[municipality]}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="accommodations" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs defaultValue="accommodations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="accommodations">Accommodations</TabsTrigger>
            <TabsTrigger value="inspectorLogs">Inspector Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="accommodations">
            <Card>
              <CardHeader>
                <CardTitle>Accommodations Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <Label htmlFor="municipality-filter">Filter by Municipality:</Label>
                  <select
                    id="municipality-filter"
                    className="border rounded p-2"
                    value={selectedMunicipality}
                    onChange={(e) => setSelectedMunicipality(e.target.value)}
                  >
                    <option value="All">All Municipalities</option>
                    {municipalities.map((municipality) => (
                      <option key={municipality} value={municipality}>{municipality}</option>
                    ))}
                  </select>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                        Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('municipality')}>
                        Municipality {sortConfig.key === 'municipality' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('status')}>
                        Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort('lastInspection')}>
                        Last Inspection {sortConfig.key === 'lastInspection' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAccommodations.map((accommodation) => (
                      <TableRow key={accommodation.id}>
                        <TableCell>{accommodation.name}</TableCell>
                        <TableCell>{accommodation.municipality}</TableCell>
                        <TableCell>{accommodation.status}</TableCell>
                        <TableCell>{accommodation.lastInspection}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inspectorLogs">
            <Card>
              <CardHeader>
                <CardTitle>Inspector Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Hotel</TableHead>
                      <TableHead>Municipality</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inspectorLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>{log.inspector}</TableCell>
                        <TableCell>{log.action}</TableCell>
                        <TableCell>{log.hotel}</TableCell>
                        <TableCell>{log.municipality}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}