"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      toast.success("Account created. Please login.");
      router.push("/auth/login");
    } catch (err) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg border space-y-4">
        {/* Logo and Brand */}
        <div className="flex flex-col items-center space-y-4">
          <Image 
            src="/logo.svg" 
            alt="Light Store Logo" 
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <div className="text-center">
            <h1 className="font-semibold text-lg tracking-tight">
              <span className="text-black">Light</span>
              <span className="text-[#acac49]"> Store</span>
            </h1>
            <h2 className="text-2xl font-semibold text-gray-900">Register</h2>
          </div>
        </div>

        <Input
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          className="w-full bg-[#acac49] hover:bg-[#9a9a42]"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </Button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#acac49] font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
