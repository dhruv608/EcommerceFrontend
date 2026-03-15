'use client'

import { useState, useEffect } from 'react'
import { ProductContent } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Heart, Truck, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/context/AuthContext'
import { useAuthModal } from '@/context/AuthModalContext'
import SmartAddToCart from './SmartAddToCart'

export default function UserProductInfo({ product }: { product: ProductContent }) {
  const { isLoggedIn } = useAuth()
  const { openAuthModal } = useAuthModal()

  // Check if product is in cart
  const [isInCart, setIsInCart] = useState(false)

  // Fake Discount Calculation (Sirf show off ke liye)
  const originalPrice = product.price * 1.25

  return (
    <div className="flex flex-col gap-6">
      {/* 1. Header Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge
            variant="outline"
            className="uppercase tracking-widest text-xs font-bold border-black/20"
          >
            {product.category?.name || 'Collection'}
          </Badge>

          {/* Stock Status */}
          {product.stock > 0 ? (
            <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> In Stock
            </span>
          ) : (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
          {product.name}
        </h1>

        {/* Price Block */}
        <div className="flex items-end gap-3 mt-4">
          <span className="text-4xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-lg text-gray-400 line-through mb-1 font-medium">
            ₹{originalPrice.toFixed(0)}
          </span>
          <span className="mb-2 bg-black text-white text-xs font-bold px-2 py-1 rounded">
            20% OFF
          </span>
        </div>
      </div>

      <Separator />

      {/* 2. Description */}
      <div className="prose prose-sm text-gray-600 leading-relaxed">
        <p>{product.description}</p>
      </div>

      {/* 3. Smart Add to Cart */}
      <div className="space-y-4">
        {isLoggedIn ? (
          <SmartAddToCart
            productId={product.id}
            productName={product.name}
            productPrice={product.price}
            productImage={product.images?.[0]}
            disabled={!product.isActive || product.stock === 0}
            className="w-full"
          />
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-900 mb-4 font-medium">Sign in to add this item to your cart</p>
            <Button
              onClick={() => openAuthModal('login')}
              className="bg-[#acac49] hover:bg-[#9a9a42] text-white rounded-lg px-6 py-3 font-medium transition-all duration-200"
            >
              Sign In to Continue
            </Button>
          </div>
        )}
      </div>

      {/* 4. Trust Badges (Design element) */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <Truck className="w-5 h-5 text-[#acac49]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Free Delivery</span>
            <span className="text-xs text-gray-500">Orders over ₹999</span>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
          <div className="p-2 bg-white rounded-full shadow-sm">
            <ShieldCheck className="w-5 h-5 text-[#acac49]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">Secure Payment</span>
            <span className="text-xs text-gray-500">100% Protected</span>
          </div>
        </div>
      </div>
    </div>
  )
}
