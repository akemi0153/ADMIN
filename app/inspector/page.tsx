'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { ArrowLeft, CalendarIcon, Check, Eye, EyeOff, FileText, Hotel, Lock, LogOut, Mail, Settings, UserCircle, Users } from "lucide-react"
import { format } from 'date-fns'

export default function AuroraDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [user, setUser] = useState<{ name: string; municipality: string; email: string; role: string } | null>(null)
  const [forms, setForms] = useState<any[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [enteredName, setEnteredName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [schedules, setSchedules] = useState<any[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedHotel, setSelectedHotel] = useState<string>('')
  const [logs, setLogs] = useState<any[]>([])

  const municipalityLogos: { [key: string]: string } = {
    "Baler": "https://baler.gov.ph/wp-content/uploads/2023/03/BALER-1024x1014.png",
    "Maria Aurora": "https://3.bp.blogspot.com/-MLNqH1WoR0A/TiomxwTp79I/AAAAAAAAADU/7t2tIvAz9R4/s1600/MARIA+AURORA+LOGO.JPG",
    "San Luis": "https://th.bing.com/th/id/OIP.ZEhH5_7fNjVXBuqwmZfD9QHaHZ?rs=1&pid=ImgDetMain",
  }

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setPasswordStrength(password.length > 8 ? (password.length > 12 ? 100 : 66) : 33)
  }, [password])

  useEffect(() => {
    const mockForms = [
      { id: 1, hotelName: "Sunset Hotel", status: "Pending", submittedDate: "2024-10-20", municipality: "Baler", formData: { rooms: 50, amenities: ["Pool", "Restaurant"], lastInspection: "2023-09-15" } },
      { id: 2, hotelName: "Ocean View Resort", status: "Approved", submittedDate: "2024-10-18", municipality: "Maria Aurora", formData: { rooms: 30, amenities: ["Beach access", "Spa"], lastInspection: "2023-10-01" } },
      { id: 3, hotelName: "Mountain Retreat", status: "Pending", submittedDate: "2024-10-15", municipality: "San Luis", formData: { rooms: 20, amenities: ["Hiking trails", "Campfire area"], lastInspection: "2023-08-30" } },
      { id: 4, hotelName: "Coastal Inn", status: "Approved", submittedDate: "2024-10-22", municipality: "Baler", formData: { rooms: 40, amenities: ["Beachfront", "Surfing lessons"], lastInspection: "2023-11-05" } },
      { id: 5, hotelName: "Forest Lodge", status: "Pending", submittedDate: "2024-10-25", municipality: "Maria Aurora", formData: { rooms: 25, amenities: ["Nature trails", "Bird watching"], lastInspection: "2023-09-20" } },
    ]
    setForms(mockForms)

    const mockSchedules = [
      { id: 1, hotelName: "Sunset Hotel", date: new Date(2024, 10, 25), municipality: "Baler" },
      { id: 2, hotelName: "Ocean View Resort", date: new Date(2024, 10, 27), municipality: "Maria Aurora" },
      { id: 3, hotelName: "Mountain Retreat", date: new Date(2024, 10, 30), municipality: "San Luis" },
    ]
    setSchedules(mockSchedules)

    const mockLogs = [
      { id: 1, inspectorName: "John Doe", action: "Completed inspection", hotelName: "Sunset Hotel", date: "2024-10-20", municipality: "Baler" },
      { id: 2, inspectorName: "Jane Smith", action: "Scheduled inspection", hotelName: "Ocean View Resort", date: "2024-10-18", municipality: "Maria Aurora" },
      { id: 3, inspectorName: "Bob Johnson", action: "Updated form", hotelName: "Mountain Retreat", date: "2024-10-15", municipality: "San Luis" },
    ]
    setLogs(mockLogs)
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSignUp) {
      handleSignup(e)
    } else {
      handleLogin(e)
    }
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const mockUsers: { [key: string]: { name: string; municipality: string; role: string } } = {
      'john@baler.com': { name: "John Doe", municipality: "Baler", role: "inspector" },
      'jane@maria-aurora.com': { name: "Jane Smith", municipality: "Maria Aurora", role: "inspector" },
      'bob@san-luis.com': { name: "Bob Johnson", municipality: "San Luis", role: "inspector" },
    }
    const user = mockUsers[email]
    if (user) {
      setIsLoggedIn(true)
      setUser({ ...user, email })
    } else {
      alert("Invalid credentials")
    }
  }

  const handleSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const municipality = formData.get('municipality') as string
    setIsLoggedIn(true)
    setUser({ name, municipality, email, role: 'inspector' })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setEmail('')
    setPassword('')
    setEnteredName('')
    setSelectedCategory(null)
  }

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category)
  }

  const handleScheduleInspection = () => {
    if (selectedDate && selectedHotel) {
      const newSchedule = {
        id: schedules.length + 1,
        hotelName: selectedHotel,
        date: selectedDate,
        municipality: user?.municipality,
      }
      setSchedules([...schedules, newSchedule])
      setSelectedDate(undefined)
      setSelectedHotel('')
      alert('Inspection scheduled successfully!')
    } else {
      alert('Please select both a date and a hotel.')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
           style={{backgroundImage: "url('https://images.wallpaperscraft.com/image/single/sea_ocean_waves_1319791_1920x1080.jpg')"}}>
        <Link href="/" passHref>
          <Button
            variant="ghost"
            className="absolute left-4 top-4 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Preview
          </Button>
        </Link>
        <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="bg-black/30 backdrop-blur-md border-0 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl font-light text-center text-white">
                  {isSignUp ? 'Create an Account' : 'Welcome Back'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {isSignUp && (
                      <motion.div
                        key="name"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Label htmlFor="name" className="sr-only">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Name"
                          className="bg-white/10 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
                          value={enteredName}
                          onChange={(e) => setEnteredName(e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div>
                    <Label htmlFor="email" className="sr-only">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="bg-white/10 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <Label htmlFor="password" className="sr-only">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="bg-white/10 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <AnimatePresence mode="wait">
                    {isSignUp && (
                      <motion.div
                        key="signup-fields"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div>
                          <Label htmlFor="confirmPassword" className="sr-only">Confirm Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm Password"
                            className="bg-white/10 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                            style={{ width: `${passwordStrength}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-300">
                          Password strength: {passwordStrength < 50 ? 'Weak' : passwordStrength < 80 ? 'Medium' : 'Strong'}
                        </p>
                        <div>
                          <Label  htmlFor="municipality" className="sr-only">Municipality</Label>
                          <select
                            id="municipality"
                            name="municipality"
                            aria-label="Municipality"
                            className="w-full bg-black/10 border-0 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md">
                            <option value="">Select Municipality</option>
                            <option value="Baler">Baler</option>
                            <option value="Maria Aurora">Maria Aurora</option>
                            <option value="San Luis">San Luis</option>
                          </select>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    onClick={() => setIsSignUp(!isSignUp)}
                  >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <footer className="w-full bg-black/50 backdrop-blur-sm text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="text-sm">&copy; {new Date().getFullYear()} Aurora Provincial Tourism Office. 
                All rights reserved. Developed by Marigmen, Christian Joseph</div>
              <nav className="flex space-x-4 mt-2 sm:mt-0">
                <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-sm hover:text-blue-400 transition-colors duration-300">Contact Us</a>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  if (selectedCategory) {
    const filteredForms = forms.filter(form => 
      form.municipality === user?.municipality && 
      (selectedCategory === 'Pending Inspections' ? form.status === 'Pending' :
       selectedCategory === 'Approved Inspections' ? form.status === 'Approved' :
       true)
    )

    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {selectedCategory} - {user?.municipality}
                </h1>
              </div>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Accommodation Forms</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Hotel Name</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell>{form.hotelName}</TableCell>
                      <TableCell>{form.submittedDate}</TableCell>
                      <TableCell>{form.status}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{form.hotelName} Inspection Form</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="rooms" className="text-right">
                                  Rooms
                                </Label>
                                <Input id="rooms" value={form.formData.rooms} className="col-span-3" readOnly />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="amenities" className="text-right">
                                  Amenities
                                </Label>
                                <Input id="amenities" value={form.formData.amenities.join(", ")} className="col-span-3" readOnly />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="lastInspection" className="text-right">
                                  Last Inspection
                                </Label>
                                <Input id="lastInspection" value={form.formData.lastInspection} className="col-span-3" readOnly />
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
            {user && (
                <Image
                  src={municipalityLogos[user.municipality] || "/placeholder-logo.png"}
                  alt={`${user.municipality} logo`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              {user && (
                <div>
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {user.municipality === "Baler" && "Municipality of Baler"}
                    {user.municipality === "Maria Aurora" && "Municipality of Maria Aurora"}
                    {user.municipality === "San Luis" && "Municipality of San Luis"}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user.name} - {currentTime.toLocaleString()}</p>
                </div>
              )}
            </div>
            {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://fontawesome.com/icons/user-tie?f=classic&s=solid" alt={user?.name} />
                    <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
             )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => handleCategoryClick('Pending Inspections')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Inspections</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {forms.filter(f => f.status === "Pending" && f.municipality === user?.municipality).length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => handleCategoryClick('Approved Inspections')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Inspections</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {forms.filter(f => f.status === "Approved" && f.municipality === user?.municipality).length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800 cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={() => handleCategoryClick('Total Accommodations')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Accommodations</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {forms.filter(f => f.municipality === user?.municipality).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="forms" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forms">Inspection Forms</TabsTrigger>
            <TabsTrigger value="schedule">Schedule Inspection</TabsTrigger>
            <TabsTrigger value="logs">Inspector Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="forms">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recent Accommodation Inspection Forms</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hotel Name</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {forms
                      .filter(form => form.municipality === user?.municipality)
                      .slice(0, 5)
                      .map((form) => (
                        <TableRow key={form.id}>
                          <TableCell>{form.hotelName}</TableCell>
                          <TableCell>{form.submittedDate}</TableCell>
                          <TableCell>{form.status}</TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <FileText className="mr-2 h-4 w-4" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>{form.hotelName} Inspection Form</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="rooms" className="text-right">
                                      Rooms
                                    </Label>
                                    <Input id="rooms" value={form.formData.rooms} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="amenities" className="text-right">
                                      Amenities
                                    </Label>
                                    <Input id="amenities" value={form.formData.amenities.join(", ")} className="col-span-3" readOnly />
                                  </div>
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="lastInspection" className="text-right">
                                      Last Inspection
                                    </Label>
                                    <Input id="lastInspection" value={form.formData.lastInspection} className="col-span-3" readOnly />
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="schedule">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Schedule Inspection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hotel">Select Hotel</Label>
                    <select
                      id="hotel"
                      className="w-full p-2 border rounded"
                      value={selectedHotel}
                      onChange={(e) => setSelectedHotel(e.target.value)}
                    >
                      <option value="">Select a hotel</option>
                      {forms
                        .filter(form => form.municipality === user?.municipality)
                        .map(form => (
                          <option key={form.id} value={form.hotelName}>
                            {form.hotelName}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Select Date</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </div>
                  <Button onClick={handleScheduleInspection}>Schedule Inspection</Button>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Scheduled Inspections</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hotel Name</TableHead>
                        <TableHead>Inspection Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {schedules
                        .filter(schedule => schedule.municipality === user?.municipality)
                        .map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell>{schedule.hotelName}</TableCell>
                            <TableCell>{format(schedule.date, 'PPP')}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logs">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Inspector Logs</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Inspector</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Hotel</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {logs
                      .filter(log => log.municipality === user?.municipality)
                      .map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>{log.date}</TableCell>
                          <TableCell>{log.inspectorName}</TableCell>
                          <TableCell>{log.action}</TableCell>
                          <TableCell>{log.hotelName}</TableCell>
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