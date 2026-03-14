"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Store, LayoutDashboard, Package, Layers, ChevronLeft, ChevronRight, LogOut, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const { adminLogout } = useAdminAuth();
  const router = useRouter();

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
     ${
       pathname === path
         ? "bg-[#acac49]/15 text-[#acac49]"
         : "text-[#555] hover:bg-[#f5f5ea]"
     }`;

  const handleLogout = () => {
    adminLogout();
    router.push("/");
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-60 bg-white border-r border-[#eee] z-50"
    >
      {/* Brand Header */}
      <div className="flex items-center justify-center p-6">
        <div className="flex items-center gap-2">
          <Store className="text-[#acac49]" />
          <span className="font-bold text-lg tracking-wide">
            <span className="text-black">Light</span>
            <span className="text-[#acac49]"> Store</span>
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-4">
        <Link
          href="/admin/products"
          className={linkClass("/admin/products")}
        >
          <Package size={18} />
          <span>Products</span>
        </Link>

        <Link
          href="/admin/categories"
          className={linkClass("/admin/categories")}
        >
          <Layers size={18} />
          <span>Categories</span>
        </Link>

        <Link
          href="/admin/orders"
          className={linkClass("/admin/orders")}
        >
          <ShoppingCart size={18} />
          <span>Orders</span>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-5 left-5 right-5">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}
