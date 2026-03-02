import { AuthProvider } from "@/context/AuthContext";
import "./globals.css"; // YE LINE CHECK KARO!
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased"> {/* antialiased adds a nice font smoothing */}
        <main>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}