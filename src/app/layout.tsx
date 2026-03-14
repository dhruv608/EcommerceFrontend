import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { Racing_Sans_One } from "next/font/google";
import "./globals.css"; // YE LINE CHECK KARO!
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";

const racing = Racing_Sans_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-racing",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${racing.variable} antialiased`}> {/* antialiased adds a nice font smoothing */}
        <main>
          <AuthProvider>
            <CartProvider>
              <AdminAuthProvider>
                {children}
              </AdminAuthProvider>
            </CartProvider>
          </AuthProvider>
        </main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}