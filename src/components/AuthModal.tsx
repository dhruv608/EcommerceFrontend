"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { useEffect } from "react";

export default function AuthModal() {
  const { login } = useAuth();
  const { isOpen, activeTab: modalActiveTab, setActiveTab: setModalActiveTab, closeAuthModal } = useAuthModal();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Register state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  // Reset forms when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setLoginEmail("");
      setLoginPassword("");
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setModalActiveTab("login");
    }
  }, [isOpen, setModalActiveTab]);

  async function handleLogin() {
    if (!loginEmail || !loginPassword) {
      toast.error("Email & password required");
      return;
    }

    try {
      setLoginLoading(true);
      console.log("Attempting login with:", { email: loginEmail, password: "***" });
      
      const res = await api.post("/auth/login", { 
        email: loginEmail, 
        password: loginPassword 
      });

      console.log("Login response:", res.data);

      const userData = {
        userId: res.data.userId,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role
      };

      console.log("User data to store:", userData);
      login(userData);
      toast.success(`Welcome back, ${userData.name}!`);
      closeAuthModal();
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Invalid email or password");
      }
    } finally {
      setLoginLoading(false);
    }
  }

  async function handleRegister() {
    if (!registerName || !registerEmail || !registerPassword) {
      toast.error("All fields required");
      return;
    }

    try {
      setRegisterLoading(true);
      console.log("Attempting registration with:", { 
        name: registerName, 
        email: registerEmail, 
        password: "***" 
      });
      
      await api.post("/auth/register", {
        name: registerName,
        email: registerEmail,
        password: registerPassword,
      });

      console.log("Registration successful");
      toast.success("Account created successfully! Please sign in.");
      
      // Reset form and switch to login tab
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setModalActiveTab("login");
    } catch (error: any) {
      console.error("Registration error:", error);
      
      // Check for specific email already registered error
      const errorMessage = error?.response?.data?.message || error?.response?.data || "";
      
      if (errorMessage.includes("Email Already Registered") || errorMessage.includes("already registered")) {
        toast.error("This email is already registered. Please sign in.");
        // Switch to Sign In tab for better UX
        setModalActiveTab("login");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } finally {
      setRegisterLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeAuthModal}>
      <DialogContent className="sm:max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <DialogHeader className="pb-8">
          <DialogTitle className="text-center text-2xl font-bold text-foreground">
            Welcome to <span className="text-black">LIGHT</span><span className="text-[#acac49]">STORE</span>
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground mt-3">
            Your trusted online shopping destination
          </p>
        </DialogHeader>

        <div className="w-full">
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
            <button
              onClick={() => setModalActiveTab("login")}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-300 ${
                modalActiveTab === "login" 
                  ? "bg-[#acac49] text-white shadow-sm" 
                  : "bg-white text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setModalActiveTab("register")}
              className={`flex-1 py-3 text-sm font-medium transition-all duration-300 ${
                modalActiveTab === "register" 
                  ? "bg-[#acac49] text-white shadow-sm" 
                  : "bg-white text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {modalActiveTab === "login" && (
            <div className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full h-12 bg-white border-gray-300 rounded-lg px-4 py-3 focus:border-[#acac49] focus:ring-2 focus:ring-[#acac49]/20 transition-all duration-300 outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full h-12 bg-white border-gray-300 rounded-lg px-4 py-3 focus:border-[#acac49] focus:ring-2 focus:ring-[#acac49]/20 transition-all duration-300 outline-none"
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleLogin} 
                disabled={loginLoading}
                className="w-full h-12 bg-[#acac49] hover:bg-[#9a9a42] text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {loginLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          )}

          {modalActiveTab === "register" && (
            <div className="space-y-6">
              <div className="space-y-5">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Full Name</label>
                  <Input
                    placeholder="Enter your full name"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    className="w-full h-12 bg-white border-gray-300 rounded-lg px-4 py-3 focus:border-[#acac49] focus:ring-2 focus:ring-[#acac49]/20 transition-all duration-300 outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    className="w-full h-12 bg-white border-gray-300 rounded-lg px-4 py-3 focus:border-[#acac49] focus:ring-2 focus:ring-[#acac49]/20 transition-all duration-300 outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Password</label>
                  <Input
                    placeholder="Create a password"
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    className="w-full h-12 bg-white border-gray-300 rounded-lg px-4 py-3 focus:border-[#acac49] focus:ring-2 focus:ring-[#acac49]/20 transition-all duration-300 outline-none"
                    onKeyPress={(e) => e.key === "Enter" && handleRegister()}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleRegister} 
                disabled={registerLoading}
                className="w-full h-12 bg-[#acac49] hover:bg-[#9a9a42] text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {registerLoading ? "Creating account..." : "Create Account"}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
