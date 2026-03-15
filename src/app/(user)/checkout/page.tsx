'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { useAuthModal } from '@/context/AuthModalContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Truck, ShieldCheck, CreditCard, MapPin, User, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import api from '@/lib/api'

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { openAuthModal } = useAuthModal()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-sm p-12 max-w-md w-full mx-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to proceed with checkout</p>
          <Button
            onClick={() => openAuthModal('login')}
            className="bg-[#acac49] hover:bg-[#96963f] text-white rounded-lg px-6 py-3 font-medium"
          >
            Login to Continue
          </Button>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center bg-white rounded-xl shadow-sm p-16 max-w-2xl mx-auto">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 text-lg mb-8">
              Add items to your cart to proceed with checkout
            </p>
            <Link href="/products">
              <Button className="bg-[#acac49] hover:bg-[#96963f] text-white rounded-lg px-6 py-3 font-medium">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckout = async () => {
    // Basic validation
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.zipCode
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsProcessing(true)

    try {
      // Prepare order items from cart
      const orderItems = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      }))

      // Create order via API
      const response = await api.post('/orders', {
        userId: parseInt(user?.userId || '0'),
        items: orderItems,
      })

      if (response.data) {
        // Clear cart
        clearCart()

        // Store order data for success page
        localStorage.setItem('lastOrder', JSON.stringify(response.data))

        // Show success message
        toast.success(`Order ${response.data.orderNumber} placed successfully!`)

        // Redirect to order confirmation
        router.push(`/checkout/success?orderNumber=${response.data.orderNumber}`)
      }
    } catch (error: any) {
      console.error('Order creation failed:', error)
      toast.error(error.response?.data?.message || 'Failed to place order. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-600 text-sm hover:text-[#acac49]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-2xl font-semibold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Information */}
            <Card className="bg-white rounded-xl shadow-sm p-6">
              <CardContent className="p-0">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#acac49]/40 focus:border-[#acac49] outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#acac49]/40 focus:border-[#acacac49] outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#acac49]/40 focus:border-[#acacac49] outline-none"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#acac49]/40 focus:border-[#acacac49] outline-none"
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#acac49]/40 focus:border-[#acacac49] outline-none"
                      placeholder="123 Main Street"
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#acac49]/40 focus:border-[#acacac49] outline-none"
                    placeholder="New York"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-white rounded-xl shadow-sm p-6">
              <CardContent className="p-0">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <CreditCard className="h-5 w-5 mr-2 text-[#acac49]" />
                    <div>
                      <div className="font-medium">Credit Card</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard, Amex</div>
                    </div>
                  </label>

                  <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <Truck className="h-5 w-5 mr-2 text-[#acac49]" />
                    <div>
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-500">Pay when you receive</div>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="bg-white rounded-xl shadow-sm sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

                {/* Order Items */}
                <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.cartId} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 relative overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-6 h-6 bg-gray-300 rounded"></div>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {item.productName}
                        </h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-semibold text-gray-900">
                          $
                          {(
                            item.subtotal || (item.productPrice || 0) * (item.quantity || 1)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
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

                <Button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[#acac49] hover:bg-[#96963f] text-white rounded-lg px-6 py-3 font-medium shadow-sm transition flex items-center justify-center gap-2"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Place Order
                    </>
                  )}
                </Button>

                <div className="flex items-center justify-center mt-3 text-xs text-gray-500 gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Secure Checkout
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
