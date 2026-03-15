'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/admin/Sidebar'
import { Toaster } from 'sonner'
import AdminAuthModal from '@/components/AdminAuthModal'
import { useAdminAuth } from '@/context/AdminAuthContext'
import { Shield } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAdminLoggedIn } = useAdminAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!isAdminLoggedIn) {
      setShowAuthModal(true)
    }
  }, [isAdminLoggedIn])

  const handleAuthSuccess = () => {
    setShowAuthModal(false)
  }

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mb-8">
            <div className="mx-auto h-16 w-16 bg-[#ACAC49]/20 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-[#ACAC49]" />
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Admin Panel</h1>

            <p className="text-gray-600">Authentication required</p>
          </div>

          <AdminAuthModal isOpen={showAuthModal} onClose={() => router.push('/')} />
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-60 bg-[#f8f9fb] min-h-screen">{children}</div>
      <Toaster />
    </div>
  )
}
