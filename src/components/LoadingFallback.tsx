'use client'

import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'

export default function LoadingFallback() {
  const [dots, setDots] = useState('.')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.')
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <Loader2 className="w-12 h-12 animate-spin text-[#acac49] mx-auto" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Loading Your Store{dots}
          </h1>
          
          <p className="text-gray-600 mb-4">
            Please wait while we set up everything for you.
          </p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <p>✨ Connecting to services</p>
            <p>📦 Loading your products</p>
            <p>🎨 Preparing your experience</p>
          </div>
        </div>
        
        <div className="mt-8">
          <div className="inline-flex items-center px-4 py-2 bg-[#acac49] text-white rounded-lg">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Initializing...
          </div>
        </div>
      </div>
    </div>
  )
}
