"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Email & password required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      login(res.data.accessToken); // 🔥 CONTEXT
      toast.success("Login successful");
      router.push("/");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg border space-y-4">
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <Input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

        <Button className="w-full bg-emerald-600" onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <Link href="/auth/register" className="text-emerald-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
