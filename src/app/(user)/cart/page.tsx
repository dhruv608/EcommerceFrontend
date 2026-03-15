'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Truck,
  Shield,
  CreditCard,
  ShoppingCart,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, loading, updateQuantity, removeFromCart, clearCart } =
    useCart()
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center bg-card p-12 max-w-md w-full mx-4">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Login Required</h2>
          <p className="text-muted-foreground mb-6">Please login to view your shopping cart</p>
          <Button onClick={() => router.push('/')} className="btn-primary px-8 py-3">
            Login to Continue
          </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center bg-card p-16 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Looks like you haven't added any items yet. Start shopping to fill up your cart!
            </p>
            <Link href="/products">
              <Button className="btn-primary px-8 py-3 text-lg">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-gray-600 text-sm hover:text-[#acac49]"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
            <div className="flex items-center gap-3 text-2xl font-semibold text-gray-900">
              <ShoppingCart className="text-[#acac49] w-6 h-6" />
              <span className="hidden sm:block">Shopping Cart</span>
              <span className="text-xs bg-[#acac49]/10 text-[#acac49] px-2 py-1 rounded-md font-medium">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Cart Items */}
          <div className="xl:col-span-3 space-y-3 sm:space-y-4">
            {cartItems.map(item => (
              <Card key={item.cartId} className="card-premium overflow-hidden card-hover">
                <CardContent className="p-4 sm:p-0">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.productId}`}
                      className="w-full sm:w-32 h-32 sm:h-32 bg-muted rounded-lg flex-shrink-0 relative overflow-hidden block hover:opacity-90 transition-opacity max-h-[140px]"
                    >
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.productName}
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <div>
                        <Link
                          href={`/products/${item.productId}`}
                          className="text-base sm:text-lg font-semibold text-gray-900 mb-2 hover:underline block leading-tight"
                        >
                          {item.productName}
                        </Link>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-3 leading-relaxed">
                          {item.productDescription}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <div>
                          <span className="text-sm text-gray-600">Price</span>
                          <p className="text-sm sm:text-base font-semibold text-gray-900">
                            ${(item.productPrice || 0).toFixed(2)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 p-2"
                          onClick={() => removeFromCart(item.productId)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Quantity</span>
                        <div className="flex items-center border border-border rounded-lg">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-muted rounded-l-lg"
                            onClick={() => updateQuantity(item.productId, (item.quantity || 1) - 1)}
                            disabled={(item.quantity || 1) <= 1}
                          >
                            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <span className="w-12 sm:w-16 text-center font-bold text-sm sm:text-lg text-foreground">
                            {item.quantity || 1}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-muted rounded-r-lg"
                            onClick={() => updateQuantity(item.productId, (item.quantity || 1) + 1)}
                          >
                            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                        <span className="text-sm text-gray-600">Subtotal</span>
                        <span className="text-sm sm:text-base font-semibold text-gray-900">
                          $
                          {(
                            item.subtotal || (item.productPrice || 0) * (item.quantity || 1)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="xl:col-span-1">
            <Card className="card-premium sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-base font-semibold text-gray-900">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-[#acac49]" />
                      <span className="text-base font-semibold text-[#acac49]">FREE</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax</span>
                    <span className="text-base font-semibold text-gray-900">$0.00</span>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-[#acac49]">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 mt-8">
                  <Link href="/checkout">
                    <Button
                      className="w-full bg-[#acac49] hover:bg-[#96963f] text-white rounded-lg px-6 py-3 font-medium shadow-sm"
                      size="lg"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Link href="/products">
                    <Button
                      variant="outline"
                      className="w-full border border-gray-300 bg-white text-gray-700 rounded-lg px-6 py-3 hover:bg-gray-50"
                    >
                      Continue Shopping
                    </Button>
                  </Link>

                  {cartItems.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full text-red-500 hover:text-red-600 flex items-center justify-center gap-2 py-3"
                      onClick={clearCart}
                    >
                      <Trash2 className="h-4 w-4" />
                      Clear Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
