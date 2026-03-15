'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type AdminUser = {
  email: string
  role: string
}

type AdminAuthContextType = {
  isAdminLoggedIn: boolean
  adminUser: AdminUser | null
  adminLogin: (userData: AdminUser) => void
  adminLogout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null)

  // page refresh pe state sync
  useEffect(() => {
    const storedAdmin = localStorage.getItem('adminUser')
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin)
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setAdminUser(adminData)
        setIsAdminLoggedIn(true)
      }, 0)
    }
  }, [])

  // Separate effect for localStorage sync
  useEffect(() => {
    if (isAdminLoggedIn && adminUser) {
      localStorage.setItem('adminUser', JSON.stringify(adminUser))
    } else {
      localStorage.removeItem('adminUser')
    }
  }, [isAdminLoggedIn, adminUser])

  function adminLogin(userData: AdminUser) {
    localStorage.setItem('adminUser', JSON.stringify(userData))
    setAdminUser(userData)
    setIsAdminLoggedIn(true)
  }

  function adminLogout() {
    localStorage.removeItem('adminUser')
    setAdminUser(null)
    setIsAdminLoggedIn(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAdminLoggedIn, adminUser, adminLogin, adminLogout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}
