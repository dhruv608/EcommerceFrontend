import { AuthProvider } from '@/context/AuthContext'
import { CartProvider } from '@/context/CartContext'
import { AdminAuthProvider } from '@/context/AdminAuthContext'
import { Racing_Sans_One } from 'next/font/google'
import './globals.css' // YE LINE CHECK KARO!
import Navbar from '@/components/Navbar'
import { Toaster } from 'sonner'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import type { Metadata } from 'next'

const racing = Racing_Sans_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-racing',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://lightstore.vercel.app'),
  title: 'Light Store - Premium Style',
  description: 'Modern fashion ecommerce store',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Light Store',
    description: 'Premium clothing ecommerce',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${racing.variable} antialiased`}>
        {' '}
        {/* antialiased adds a nice font smoothing */}
        <main>
          <AuthProvider>
            <CartProvider>
              <AdminAuthProvider>
                <ErrorBoundary>{children}</ErrorBoundary>
              </AdminAuthProvider>
            </CartProvider>
          </AuthProvider>
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
