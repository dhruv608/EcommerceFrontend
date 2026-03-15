'use client'

import { useEffect } from 'react'

// Global error handler for debugging
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      stack: event.error?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', {
      reason: event.reason,
      stack: event.reason?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    })
  })
}

export default function GlobalErrorHandler() {
  return null // This component only adds the global error handlers
}
