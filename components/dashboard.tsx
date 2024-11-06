'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardCheck, Users, BarChart, Calendar, Waves, ChevronRight, Star, X } from 'lucide-react'
import Link from 'next/link'

export function PreviewDashboard() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const stats = [
    { title: 'Pending Inspections', value: 15, id: 'pending' },
    { title: 'Approved Inspections', value: 42, id: 'approved' },
    { title: 'Total Accommodations', value: 57, id: 'total' },
  ]

  const features = [
    { icon: <ClipboardCheck className="h-6 w-6" />, title: 'Manage Inspections', description: 'Review and process accommodation inspection forms efficiently' },
    { icon: <Calendar className="h-6 w-6" />, title: 'Schedule Visits', description: 'Plan and organize on-site inspections with an intuitive calendar interface' },
    { icon: <BarChart className="h-6 w-6" />, title: 'Track Progress', description: 'Monitor inspection statuses and history with detailed analytics' },
    { icon: <Star className="h-6 w-6" />, title: 'Rate Accommodations', description: 'Provide standardized ratings based on inspection results' },
  ]

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  }

  const ModalContent = ({ title, onClose }: { title: string, onClose: () => void }) => (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={modalVariants}
    >
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close modal">
            <X className="h-6 w-6" />
          </button>
        </div>
        <p className="mb-4">This is a placeholder for the {title.toLowerCase()} information. In a real application, this would display detailed data about the selected category.</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-teal-50 flex flex-col overflow-hidden">
      <header className="bg-purple-900 text-white shadow-md relative overflow-hidden">
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
          <Waves className="w-full h-full text-teal-500" />
        </motion.div>
        <Card className="w-full max-w-4xl mx-auto backdrop-blur-sm bg-white/80">
          <CardHeader>
            <CardTitle className="text-3xl text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-teal-500">Inspector Dashboard</CardTitle>
            <CardDescription className="text-center text-lg text-gray-600">
              Manage and track accommodation inspections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card 
                    className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                    onClick={() => setActiveModal(stat.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-center">{stat.value}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-center text-gray-600">{stat.title}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-6 mt-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                      <CardTitle className="flex items-center text-lg">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="mr-2 text-purple-600"
                        >
                          {feature.icon}
                        </motion.div>
                        <span>{feature.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-teal-500 text-white">
                <Link href="/inspections">View Inspections</Link>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </main>

      <footer className="bg-purple-900 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <p className="text-sm">&copy; {new Date().getFullYear()} Aurora Provincial Tourism Office. All rights reserved.</p>
              <p className="text-sm mt-2">Developed by Marigmen, Christian Joseph</p>
            </div>
            <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm hover:underline transition-colors duration-200 hover:text-teal-300">Privacy Policy</Link>
              <Link href="#" className="text-sm hover:underline transition-colors duration-200 hover:text-teal-300">Terms of Service</Link>
              <Link href="#" className="text-sm hover:underline transition-colors duration-200 hover:text-teal-300">Contact Us</Link>
              <Link href="#" className="text-sm hover:underline transition-colors duration-200 hover:text-teal-300">Support</Link>
            </nav>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {activeModal && (
          <ModalContent 
            title={stats.find(s => s.id === activeModal)?.title || ''} 
            onClose={() => setActiveModal(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}