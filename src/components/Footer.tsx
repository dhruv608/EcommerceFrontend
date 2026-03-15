'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#f9fafb] border-t border-[#e5e7eb]">
      <div className="container mx-auto px-4 py-8 md:py-[30px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="Light Store Logo"
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
                <h3 className="font-semibold text-xl tracking-wide">
                  <span className="text-black">Light</span>
                  <span className="text-[#acac49]"> Store</span>
                </h3>
              </div>
              <p className="text-sm text-gray-600 max-w-xs">Quality fashion for everyday style.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center space-y-4">
            <h4 className="font-semibold text-base text-gray-800">Quick Links</h4>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-sm text-[#4b5563] hover:text-[#acac49] transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-sm text-[#4b5563] hover:text-[#acac49] transition-colors font-medium"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-sm text-[#4b5563] hover:text-[#acac49] transition-colors font-medium"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Contact / Social */}
          <div className="text-center md:text-right space-y-4">
            <h4 className="font-semibold text-base text-gray-800">Get in Touch</h4>
            <div className="space-y-3 text-sm text-[#4b5563] text-center md:text-right">
              <div className="flex flex-col items-center md:items-end space-y-1">
                <p className="font-medium">Customer Support:</p>
                <p className="text-[#acac49]">+91 XXXXX XXXXX</p>
              </div>
              <a
                href="mailto:support@lightstore.com"
                className="hover:text-[#acac49] transition-colors font-medium"
              >
                support@lightstore.com
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex justify-center md:justify-end gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#acac49] hover:border-[#acac49] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#acac49] hover:border-[#acac49] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-[#acac49] hover:border-[#acac49] transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <div className="text-xs text-gray-500 space-y-2">
              <p className="text-sm">© 2024 Light Store. All rights reserved.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs">
                <span>Developed by Dhruv Narang</span>
                <span className="hidden sm:inline">|</span>
                <a
                  href="https://github.com/dhruv608"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#acac49] hover:underline transition-colors font-medium"
                >
                  GitHub
                </a>
                <span className="hidden sm:inline">|</span>
                <a
                  href="https://www.linkedin.com/in/dhruvnarang608/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#acac49] hover:underline transition-colors font-medium"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
