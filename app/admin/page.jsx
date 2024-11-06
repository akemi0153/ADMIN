'use client'

import { useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { 
  Activity, AlertTriangle, Calendar, DollarSign, Globe, Hotel, 
  Leaf, MapPin, MessageCircle, Smartphone, Truck, Users 
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement, // Needed for Pie and Doughnut charts
    Tooltip,
    Legend,
  } from 'chart.js';
  
  // Register the components you need
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
  );
  

// Mock data (replace with real data in production)
const visitorData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Visitors',
      data: [1200, 1900, 3000, 5000, 8000, 12000],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }
  ]
}

const demographicData = {
  labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'],
  datasets: [
    {
      data: [30, 25, 20, 15, 5, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
      ]
    }
  ]
}

const occupancyData = {
  labels: ['Hotels', 'Hostels', 'Vacation Rentals', 'Camping'],
  datasets: [
    {
      label: 'Occupancy Rate',
      data: [85, 70, 90, 60],
      backgroundColor: 'rgba(75, 192, 192, 0.6)'
    }
  ]
}

export default function AuroraTourismDashboard() {
  const [activeTab, setActiveTab] = useState('visitor-analytics')

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Aurora Tourism Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Stay</CardTitle>
              <Hotel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.5 days</div>
              <p className="text-xs text-muted-foreground">-0.5 days from last year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1.2M</div>
              <p className="text-xs text-muted-foreground">+15% from last quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85/100</div>
              <p className="text-xs text-muted-foreground">+5 points from last assessment</p>
            </CardContent>
          </Card>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="visitor-analytics">Visitor Analytics</TabsTrigger>
          <TabsTrigger value="accommodation">Accommodation</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="economic-impact">Economic Impact</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
          <TabsTrigger value="digital-engagement">Digital Engagement</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="safety">Safety & Security</TabsTrigger>
        </TabsList>

        <TabsContent value="visitor-analytics">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visitor Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  visitors: {
                    label: "Visitors",
                    color: "hsl(var(--chart-1))",
                  },
                }}>
                  <Line data={visitorData} />
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Visitor Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  demographics: {
                    label: "Demographics",
                    color: "hsl(var(--chart-2))",
                  },
                }}>
                  <Pie data={demographicData} />
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Popular Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Aurora Borealis Viewpoint</span>
                    <Progress value={80} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Ice Hotel</span>
                    <Progress value={65} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Husky Sledding Tours</span>
                    <Progress value={55} className="w-1/2" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Peak Visiting Times</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Morning (6AM - 12PM): 25%</li>
                  <li>Afternoon (12PM - 6PM): 35%</li>
                  <li>Evening (6PM - 12AM): 30%</li>
                  <li>Night (12AM - 6AM): 10%</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accommodation">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Accommodation Occupancy Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  occupancy: {
                    label: "Occupancy Rate",
                    color: "hsl(var(--chart-3))",
                  },
                }}>
                  <Bar data={occupancyData} />
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Local Service Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Tours</span>
                    <span>85%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Restaurants</span>
                    <span>72%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Transportation</span>
                    <span>68%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Aurora Winter Festival</span>
                    <Button size="sm">View Details</Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Ice Sculpture Competition</span>
                    <Button size="sm">View Details</Button>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Northern Lights Photography Workshop</span>
                    <Button size="sm">View Details</Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Event Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Aurora Winter Festival</span>
                    <Progress value={90} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Ice Sculpture Competition</span>
                    <Progress value={75} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Northern Lights Photography Workshop</span>
                    <Progress value={85} className="w-1/2" />
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="economic-impact">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Tourism Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$24.5M</div>
                <p className="text-sm text-muted-foreground">+18% from last year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Job Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,250</div>
                <p className="text-sm text-muted-foreground">New jobs in tourism sector</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Economic Growth Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Hospitality: +22%</li>
                  <li>Local Crafts: +15%</li>
                  <li>Transportation: +10%</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Waste Reduction</span>
                    <Progress value={70} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Energy Efficiency</span>
                    <Progress value={85} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Water Conservation</span>
                    <Progress value={60} className="w-1/2" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conservation Efforts</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Protected Areas: 5,000 hectares</li>
                  <li>Wildlife Protection Programs: 3 active</li>
                  <li>Cultural Heritage Sites Preserved: 12</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sustainable Practices Adoption</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Eco-friendly Accommodations</span>
                    <Progress value={75} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Green Transportation</span>
                    <Progress value={60} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Local & Organic Food</span>
                    <Progress value={80} className="w-1/2" />
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="digital-engagement">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Unique Visitors: 50,000</li>
                  <li>Page Views: 200,000</li>
                  <li>Avg. Session Duration: 3:45</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Social Media Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Facebook</span>
                    <Progress value={85} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Instagram</span>
                    <Progress value={90} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Twitter</span>
                    <Progress value={70} className="w-1/2" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mobile App Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Downloads: 25,000</li>
                  <li>Active Users: 15,000</li>
                  <li>Avg. Daily Usage: 22 minutes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="infrastructure">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Transportation Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Public Transit</span>
                    <Progress value={65} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Rental Cars</span>
                    <Progress value={40} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Guided Tours</span>
                    <Progress value={80} className="w-1/2" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Accessibility Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Wheelchair Accessible Sites</span>
                    <Progress value={75} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Audio Guides Available</span>
                    <Progress value={90} className="w-1/2" />
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Braille Information</span>
                    <Progress value={60} className="w-1/2" />
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Infrastructure Development</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>New Roads: 25km</li>
                  <li>Upgraded Facilities: 15</li>
                  <li>New Tourist Information Centers: 3</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="safety">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Safety Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Minor Incidents</span>
                    <span className="font-bold">12</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Major Incidents</span>
                    <span className="font-bold">1</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Resolved</span>
                    <span className="font-bold">13</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Emergency Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    <span>Emergency Hotline: 112</span>
                  </li>
                  <li className="flex items-center">
                    <Truck className="mr-2 h-4 w-4" />
                    <span>Tourist Police: +1 555-123-4567</span>
                  </li>
                  <li className="flex items-center">
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Medical Assistance: +1 555-987-6543</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Safety Measures</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>24/7 CCTV Monitoring</li>
                  <li>Regular Safety Drills</li>
                  <li>Multilingual Emergency Information</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}