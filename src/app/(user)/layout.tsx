import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AuthModalProvider } from '@/context/AuthModalContext'
import AuthModal from '@/components/AuthModal'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthModalProvider>
      <Navbar />
      {children}
      <Footer />
      <AuthModal />
    </AuthModalProvider>
  )
}
