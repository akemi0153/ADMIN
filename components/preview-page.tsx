'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ClipboardCheck, Users, BarChart, Calendar, Waves, ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'

export function PreviewPageComponent() {
  const [activeRole, setActiveRole] = useState<'inspector' | 'admin'>('inspector')

  const features = {
    inspector: [
      { icon: <ClipboardCheck className="h-6 w-6" />, title: 'Manage Inspections', description: 'Review and process accommodation inspection forms efficiently' },
      { icon: <Calendar className="h-6 w-6" />, title: 'Schedule Visits', description: 'Plan and organize on-site inspections with an intuitive calendar interface' },
      { icon: <BarChart className="h-6 w-6" />, title: 'Track Progress', description: 'Monitor inspection statuses and history with detailed analytics' },
      { icon: <Star className="h-6 w-6" />, title: 'Rate Accommodations', description: 'Provide standardized ratings based on inspection results' },
    ],
    admin: [
      { icon: <Users className="h-6 w-6" />, title: 'User Management', description: 'Manage inspector accounts, roles, and permissions with ease' },
      { icon: <BarChart className="h-6 w-6" />, title: 'Analytics Dashboard', description: 'View comprehensive inspection statistics and identify trends' },
      { icon: <ClipboardCheck className="h-6 w-6" />, title: 'Oversight', description: 'Review and audit inspection processes to ensure quality and consistency' },
      { icon: <Star className="h-6 w-6" />, title: 'Performance Metrics', description: 'Evaluate inspector performance and accommodation improvements over time' },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col overflow-hidden">
      <header className="bg-blue-800 text-white shadow-md relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-10"
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          }}
        />
        <div className="container mx-auto px-4 py-6 relative z-10">
          <motion.h1 
            className="text-4xl font-bold text-center"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Aurora Provincial Tourism Office
          </motion.h1>
          <motion.p 
            className="text-xl text-center mt-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Accommodation Inspection System
          </motion.p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative">
        <motion.div
          className="absolute top-0 left-0 w-full h-64 opacity-10 pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          <Waves className="w-full h-full text-blue-500" />
        </motion.div>
        <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle className="text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Welcome to the Inspection Dashboard</CardTitle>
            <CardDescription className="text-center text-lg">
              Streamline your accommodation inspection process with our powerful tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeRole} onValueChange={(value) => setActiveRole(value as 'inspector' | 'admin')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="inspector" className="text-lg py-3">Inspector</TabsTrigger>
                <TabsTrigger value="admin" className="text-lg py-3">Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="inspector">
                <motion.div 
                  className="grid md:grid-cols-2 gap-6 mt-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {features.inspector.map((feature, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className="mr-2 text-blue-500"
                            >
                              {feature.icon}
                            </motion.div>
                            <span>{feature.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="admin">
                <motion.div 
                  className="grid md:grid-cols-2 gap-6 mt-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {features.admin.map((feature, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                              className="mr-2 text-teal-500"
                            >
                              {feature.icon}
                            </motion.div>
                            <span>{feature.title}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>{feature.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Why Choose Our System?</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-green-500" />
                  <span>Streamlined inspection process for increased efficiency</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-green-500" />
                  <span>Comprehensive data management and reporting tools</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-green-500" />
                  <span>Real-time updates and notifications for all stakeholders</span>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-green-500" />
                  <span>Customizable workflows to fit your specific needs</span>
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4">Getting Started</h3>
              <p className="mb-4">
                To begin using the Accommodation Inspection System, simply click the button below to create an account or log in. You'll be guided through the setup process and can start managing inspections right away.
              </p>
              <p className="mb-4">
                If you need any assistance or have questions, our support team is always ready to help. You can find contact information in the footer of this page.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-teal-400 text-white">
                <Link href="/inspector-dashboardcomponent">Get Started</Link>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-sm">&copy; {new Date().getFullYear()} Aurora Provincial Tourism Office. All rights reserved.</p>
              <p className="text-sm mt-2">Developed by Marigmen, Christian Joseph</p>
            </div>
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm hover:underline transition-colors duration-200 hover:text-blue-300">Privacy Policy</Link>
              <Link href="#" className="text-sm hover:underline transition-colors duration-200 hover:text-blue-300">Terms of Service</Link>
              <Link href="#" className="text-sm hover:underline transition-colors duration-200 hover:text-blue-300">Contact Us</Link>
              <Link href="#" className="text-sm hover:underline transition-colors duration-200 hover:text-blue-300">Support</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}