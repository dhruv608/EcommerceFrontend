'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import api from '@/lib/api'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      toast.error('Email & password required')
      return
    }

    try {
      setLoading(true)

      const res = await api.post('/auth/login', { email, password })

      const userData = {
        userId: res.data.userId,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      }

      login(userData) // 🔥 CONTEXT
      toast.success('Login successful')
      router.push('/')
    } catch {
      toast.error('Invalid email or password')
    } finally {
      setLoading(false)
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
            <h2 className="text-2xl font-semibold text-gray-900">Login</h2>
          </div>
        </div>

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
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <p className="text-sm text-center text-gray-500">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-[#acac49] font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
