// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is loaded in the browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn: SENTRY_DSN,

  // Adjust this value in production, or use tracesSampler for finer control
  tracesSampleRate: 0.2, // Lower sample rate for browser to reduce cost

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Set release version
  release: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',

  // Set environment
  environment: process.env.NODE_ENV || 'development',

  // beforeSend filter to reduce noise
  beforeSend(event) {
    // Filter out client-side errors that are not critical
    if (event.exception) {
      const error = event.exception.values?.[0]
      if (error?.value?.includes('Non-Error promise rejection')) {
        return null
      }
    }
    return event
  },

  // Performance monitoring
  tracesSampler: () => {
    // Sample all transactions in production
    if (process.env.NODE_ENV === 'production') {
      return 0.1 // 10% sample rate in production
    }
    return 1.0 // Sample all in development
  },
})
