"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="container mx-auto px-4 py-6 md:py-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 md:gap-8">
          
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <Image 
                src="/logo.svg" 
                alt="Light Store Logo" 
                width={24}
                height={24}
                className="h-6 w-auto"
              />
              <h3 className="font-semibold text-lg tracking-wide">
                <span className="text-black">Light</span>
                <span className="text-[#acac49]"> Store</span>
              </h3>
            </div>
            <p className="text-sm text-gray-500">Quality fashion for everyday style.</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="font-medium text-sm mb-2 text-gray-700">Quick Links</h4>
            <nav className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/" 
                className="text-sm text-[#4b5563] hover:text-[#a3a23d] transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-sm text-[#4b5563] hover:text-[#a3a23d] transition-colors"
              >
                Shop
              </Link>
              <Link 
                href="/products" 
                className="text-sm text-[#4b5563] hover:text-[#a3a23d] transition-colors"
              >
                Categories
              </Link>
            </nav>
          </div>

          {/* Contact / Social */}
          <div className="text-center md:text-right">
            <h4 className="font-medium text-sm mb-2 text-gray-700">Get in Touch</h4>
            <div className="space-y-1 text-sm text-[#4b5563] text-center md:text-right">
              <p>Customer Support: +91 XXXXX XXXXX</p>
              <a 
                href="mailto:support@lightstore.com" 
                className="hover:text-[#a3a23d] transition-colors"
              >
                support@lightstore.com
              </a>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end gap-4 mt-2">
              <a 
                href="#" 
                className="text-gray-500 hover:text-[#acac49] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-[#acac49] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-[#acac49] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-3 pt-3 text-center">
          <div className="text-xs text-gray-500">
            Developed by Dhruv Narang |{" "}
            <a 
              href="https://github.com/dhruv608" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#a3a23d] hover:underline transition-colors"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a 
              href="https://www.linkedin.com/in/dhruvnarang608/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#a3a23d] hover:underline transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
