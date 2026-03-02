"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Store, LayoutDashboard, Package, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
     ${
       pathname === path
         ? "bg-emerald-600 text-white"
         : "text-gray-600 hover:bg-gray-100"
     }`;

  return (
    <aside
      className={`h-screen bg-white border-r transition-all duration-300
        ${open ? "w-64" : "w-16"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Store className="text-emerald-600" />
          {open && (
            <span className="font-bold text-lg">
              Light Store
            </span>
          )}
        </div>

        <Button 
          onClick={() => setOpen(!open)}
          className="text-gray-500 hover:text-gray-800 bg-white hover:bg-white -mx-0.5"
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        <Link href="/admin" className={linkClass("/admin")}>
          <LayoutDashboard size={18} />
          {open && <span>Dashboard</span>}
        </Link>

        <Link
          href="/admin/products"
          className={linkClass("/admin/products")}
        >
          <Package size={18} />
          {open && <span>Products</span>}
        </Link>

        <Link
          href="/admin/categories"
          className={linkClass("/admin/categories")}
        >
          <Layers size={18} />
          {open && <span>Categories</span>}
        </Link>
      </nav>
    </aside>
  );
}
