"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, User, Menu, X, ChevronDown, Package } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useAuthModal } from "@/context/AuthModalContext";
import ProfileModal from "./ProfileModal";
import api from "@/lib/api";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const { cartCount } = useCart();
  const { openAuthModal } = useAuthModal();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories?activeOnly=true');
        console.log('Categories loaded:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCartClick = () => {
    // Navigate to cart or open cart modal
    window.location.href = "/cart";
  };

  const handleOrdersClick = () => {
    // Navigate to orders page
    window.location.href = "/orders";
  };

  const handleCategoryClick = (categoryId: string) => {
    // Debug check - log the entire category object
    console.log('Category clicked:', categoryId);
    console.log('Category object:', categories.find(c => c.id === categoryId));
    // Close dropdown first
    setCategoriesDropdownOpen(false);
    // Navigate to products page with category filter
    setTimeout(() => {
      router.push(`/products?categoryId=${categoryId}`);
    }, 100);
  };

  const toggleCategoriesDropdown = () => {
    setCategoriesDropdownOpen(!categoriesDropdownOpen);
  };

  return (
    <>
      <nav className={`nav-premium ${scrolled ? 'shadow-premium-lg' : ''} transition-all duration-300`}>
        <div className="container-premium">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* LEFT - Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <Image 
                  src="/logo.svg" 
                  alt="Light Store Logo" 
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <h1 className="font-semibold text-lg tracking-tight transition-colors cursor-pointer">
                  <span className="text-black">Light</span>
                  <span className="text-[#acac49] group-hover:text-[#98983e]"> Store</span>
                </h1>
              </Link>
            </div>

            {/* CENTER - Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/products" className="nav-link px-3 py-2 text-sm font-medium">
                Shop
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="nav-link px-3 py-2 text-sm font-medium flex items-center space-x-1"
                  onClick={toggleCategoriesDropdown}
                >
                  <span>Categories</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Dropdown Menu */}
                {categoriesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 min-w-[180px] bg-white rounded-[12px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => {
                          console.log('Clicking category:', category);
                          handleCategoryClick(category.id);
                        }}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f8f8f8] hover:text-[#a3a23d] transition-all duration-200 cursor-pointer first:rounded-t-[12px] last:rounded-b-[12px] gap-1"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/about" className="nav-link px-3 py-2 text-sm font-medium">
                About
              </Link>
            </div>

            {/* RIGHT - Actions */}
            <div className="flex items-center gap-4">
              
              {/* Profile */}
              {!isLoggedIn ? (
                <Button
                  onClick={() => openAuthModal("login")}
                  className="btn-outline px-4 py-2 text-sm font-medium"
                >
                  Sign In
                </Button>
              ) : (
                <button
                  onClick={() => setProfileModalOpen(true)}
                  className="flex items-center space-x-2 p-2 text-[#333] hover:text-[#acac49] transition-colors rounded-lg hover:bg-primary/10 cursor-pointer"
                >
                  <User className="w-5 h-5" />
                  <span className="hidden lg:block text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                </button>
              )}

              {/* Orders - Only show for logged in users */}
              {isLoggedIn && (
                <button
                  onClick={handleOrdersClick}
                  className="p-2 text-[#333] hover:text-[#acac49] transition-colors rounded-lg hover:bg-primary/10 cursor-pointer"
                >
                  <Package className="w-5 h-5" />
                </button>
              )}

              {/* Cart */}
              <button
                onClick={handleCartClick}
                className="relative p-2 text-[#333] hover:text-[#acac49] transition-colors rounded-lg hover:bg-primary/10 cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center animate-scale-in">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="container-premium py-4 space-y-2">
            <Link href="/products" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
              Shop
            </Link>
            
            {/* Mobile Categories */}
            <div className="relative" ref={dropdownRef}>
              <button 
                className="w-full px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors flex items-center justify-between"
                onClick={toggleCategoriesDropdown}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {categoriesDropdownOpen && (
                <div className="mt-2 w-full bg-white rounded-[12px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleCategoryClick(category.id)}
                      className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f8f8f8] hover:text-[#a3a23d] transition-all duration-200 cursor-pointer first:rounded-t-[12px] last:rounded-b-[12px] gap-1"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/about" className="block px-4 py-2 text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
              About
            </Link>
            
            {/* Mobile User Actions */}
            <div className="px-4 py-2 flex items-center gap-4">
              {!isLoggedIn ? (
                <Button
                  onClick={() => openAuthModal("login")}
                  className="btn-outline px-4 py-2 text-sm font-medium"
                >
                  Sign In
                </Button>
              ) : (
                <>
                  <button
                    onClick={() => setProfileModalOpen(true)}
                    className="flex items-center space-x-2 p-2 text-[#333] hover:text-[#acac49] transition-colors rounded-lg hover:bg-primary/10 cursor-pointer"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                  </button>
                  <button
                    onClick={handleOrdersClick}
                    className="p-2 text-[#333] hover:text-[#acac49] transition-colors rounded-lg hover:bg-primary/10 cursor-pointer"
                  >
                    <Package className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modals */}
      <ProfileModal open={profileModalOpen} onOpenChange={setProfileModalOpen} />
    </>
  );
}
