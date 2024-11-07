"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createUser, signIn } from "../../admin/app/services/appwrite"; // Import your Appwrite functions
import { useRouter } from "next/navigation"; // Import useRouter from Next.js


interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login user
        await signIn(formData.email, formData.password);
        alert("Logged in successfully!");
        router.push("/inspector"); // Replace '/inspector' with your actual route

      } else {
        // Sign up user
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          setIsLoading(false);
          return;
        }
        await createUser(formData.email, formData.password, formData.username);
        alert("Account created successfully!");
      }
    } catch (error: any) {
      alert(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuth = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Enter your credentials to access your account"
              : "Sign up to start managing tourism inspections"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="username"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        className="pl-9"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-9"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-9"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="confirm-password"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-9"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button className="w-full mt-6" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                isLogin ? "Log In" : "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Button variant="link" className="p-0" onClick={toggleAuth}>
              {isLogin ? "Sign up" : "Log in"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
