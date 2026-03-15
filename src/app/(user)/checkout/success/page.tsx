'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Package, Truck, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'

function OrderSuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get order number from URL params
    const orderNumber = searchParams.get('orderNumber')

    if (orderNumber) {
      // Try to get order data from localStorage first
      const storedOrder = localStorage.getItem('lastOrder')
      if (storedOrder) {
        const order = JSON.parse(storedOrder)
        setOrderData(order)
        localStorage.removeItem('lastOrder') // Clean up
      }
    }

    setLoading(false)
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#acac49] border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your order details.</p>
          <Link href="/">
            <Button className="bg-[#acac49] hover:bg-[#96963f]">Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Calculate estimated delivery (5-7 days from order date)
  const orderDate = new Date(orderData.orderDate)
  const estimatedDelivery = new Date(orderDate)
  estimatedDelivery.setDate(estimatedDelivery.getDate() + Math.floor(Math.random() * 3) + 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <Card className="text-center p-8 md:p-12">
            <CardContent className="space-y-6">
              {/* Success Icon */}
              <div className="mx-auto w-16 h-16 bg-[#acac49]/15 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#acac49]" />
              </div>

              {/* Success Message */}
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-3 mb-2">
                  Order Placed Successfully
                </h1>
                <p className="text-sm text-gray-500 max-w-md mx-auto text-center">
                  Thank you for your order. We've received your order and will start processing it
                  right away.
                </p>
              </div>

              {/* Order Details */}
              <div className="bg-white rounded-xl shadow-sm p-6 text-left">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Details</h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-mono font-medium">{orderData.orderNumber}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-medium">
                      {new Date(orderData.orderDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-semibold text-lg text-[#acac49]">
                      ${orderData.totalAmount.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Items:</span>
                    <span className="font-medium">{orderData.totalItems}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="bg-[#acac49]/15 text-[#acac49] px-2 py-1 rounded-md text-xs font-medium">
                      {orderData.status}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-medium">
                      {estimatedDelivery.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl shadow-sm p-6 text-left">
                <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-4">
                  {orderData.orderItems.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${item.subtotal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-[#acac49]/5 border border-[#acac49]/20 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">What's Next?</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span>Your order is being processed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                    <span>Track your order with order number: {orderData.orderNumber}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button className="bg-[#acac49] hover:bg-[#96963f] text-white rounded-lg px-6 py-3 font-medium shadow-sm w-full sm:w-auto">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="outline"
                    className="border border-gray-300 text-gray-700 rounded-lg px-6 py-3 hover:bg-gray-50 w-full sm:w-auto"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Return to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#acac49] border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  )
}
