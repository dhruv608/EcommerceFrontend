'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { Loader2, Shield } from 'lucide-react'
import { toast } from 'sonner'

interface AdminAuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminAuthModal({ isOpen, onClose }: AdminAuthModalProps) {
  const { adminLogin } = useAdminAuth()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Email and password are required')
      return
    }

    try {
      setLoading(true)

      // Simple admin authentication ( hardcoded credentials)
      if (email === 'admin@gmail.com' && password === 'admin123') {
        const adminData = {
          email: email,
          role: 'admin',
        }

        adminLogin(adminData)
        toast.success('Admin login successful')
        onClose()
        // Redirect to admin products page
        window.location.href = '/admin/products'
      } else {
        toast.error('Invalid admin credentials')
      }
    } catch (error) {
      console.error('Admin login error:', error)
      toast.error('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setEmail('')
      setPassword('')
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#acac49]" />
            Admin Login
          </DialogTitle>
          <DialogDescription>
            Enter your admin credentials to access the admin dashboard
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="login" className="text-xs uppercase tracking-wide text-gray-500">
              Admin Access
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-sm font-medium">
                  Admin Email
                </Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#acac49]/40 focus:border-[#acac49] outline-none"
                  required
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#acac49]/40 focus:border-[#acac49] outline-none"
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="bg-[#acac49] hover:bg-[#96963f] text-white rounded-lg py-3 w-full font-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Login to Admin Panel'
                )}
              </Button>
            </form>

            <div className="text-xs text-gray-500 text-center mt-3">
              <p>Protected admin area</p>
              <p className="text-xs mt-1">Contact administrator for access</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
