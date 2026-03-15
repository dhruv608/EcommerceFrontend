'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthModalContextType {
  isOpen: boolean
  activeTab: 'login' | 'register'
  openAuthModal: (tab?: 'login' | 'register') => void
  closeAuthModal: () => void
  setActiveTab: (tab: 'login' | 'register') => void
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined)

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setActiveTab(tab)
    setIsOpen(true)
  }

  const closeAuthModal = () => {
    setIsOpen(false)
  }

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        activeTab,
        openAuthModal,
        closeAuthModal,
        setActiveTab,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}

export function useAuthModal() {
  const context = useContext(AuthModalContext)
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider')
  }
  return context
}
