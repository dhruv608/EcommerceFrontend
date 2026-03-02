"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  function handleCartClick() {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }
    router.push("/cart");
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            LIGHT<span className="text-primary">STORE</span>
          </Link>

          <div className="hidden md:flex gap-6 text-sm text-muted-foreground">
            <Link href="/">Home</Link>
            <Link href="/products">Shop</Link>
            <Link href="/categories">Categories</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          {/* LOGIN / LOGOUT */}
          {!isLoggedIn ? (
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={() => router.push("/auth/login")}
            >
              Login
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="text-sm font-medium"
              onClick={logout}
            >
              Logout
            </Button>
          )}

          {/* CART */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={handleCartClick}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-white flex items-center justify-center">
              0
            </span>
          </Button>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
