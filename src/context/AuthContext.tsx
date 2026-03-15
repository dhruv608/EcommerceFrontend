'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type User = {
  userId: string
  name: string
  email: string
  role: string
}

type AuthContextType = {
  isLoggedIn: boolean
  user: User | null
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // page refresh pe state sync
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setUser(userData)
        setIsLoggedIn(true)
      }, 0)
    }
  }, [])

  // Separate effect for localStorage sync
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [isLoggedIn, user])

  function login(userData: User) {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
    setIsLoggedIn(true)
  }

  function logout() {
    localStorage.removeItem('user')
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
