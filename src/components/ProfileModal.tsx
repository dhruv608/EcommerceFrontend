"use client";

import { Button } from "@/components/ui/button";

import { User, Mail, LogOut, ShoppingBag, Package, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    toast.success("Logged out successfully");
    onOpenChange(false);
    router.push("/");
  }

  function navigateToOrders() {
    onOpenChange(false);
    router.push("/orders");
  }

  function navigateToCart() {
    onOpenChange(false);
    router.push("/cart");
  }

  function handleOverlayClick() {
    onOpenChange(false);
  }

  function handleModalClick(e: React.MouseEvent) {
    e.stopPropagation();
  }

  // Handle ESC key to close modal
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOpenChange(false);
      }
    }

    if (open) {
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    }
  }, [open, onOpenChange]);

  if (!user || !open) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed top-0 left-0 w-full h-screen bg-black/45 backdrop-blur-sm flex items-center justify-center z-[1000] transition-opacity duration-200"
        onClick={handleOverlayClick}
        style={{ opacity: open ? 1 : 0 }}
      >
        {/* Modal Container */}
        <div
          className="bg-white rounded-2xl p-7 w-[360px] max-w-[90%] shadow-[0_20px_40px_rgba(0,0,0,0.2)] relative transition-all duration-200"
          onClick={handleModalClick}
          style={{ 
            opacity: open ? 1 : 0,
            transform: open ? 'scale(1)' : 'scale(0.95)'
          }}
        >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-150"
        >
          <X size={18} className="text-gray-500" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-2">
          <h2 className="text-xl font-semibold text-gray-900">My Profile</h2>
        </div>

        {/* Profile Content */}
        <div className="flex flex-col items-center gap-3">
          {/* Profile Avatar */}
          <div className="w-[72px] h-[72px] bg-[#e5e5ce] rounded-full flex items-center justify-center">
            <User className="w-9 h-9 text-[#acac49]" />
          </div>
          
          {/* User Details */}
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-xl text-gray-900">{user.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={14} />
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="space-y-1 w-full">
          <button
            onClick={navigateToCart}
            className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#f5f5ea] transition-colors duration-150 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm">My Cart</span>
          </button>
          
          <button
            onClick={navigateToOrders}
            className="w-full flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[#f5f5ea] transition-colors duration-150 cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span className="text-sm">My Orders</span>
          </button>
        </div>

        {/* Logout Button */}
        <Button
          className="w-full gap-2 bg-[#acac49] hover:bg-[#98983e] text-white rounded-lg py-2.5 transition-colors duration-150"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
        </div>
      </div>
    </>
  );
}
