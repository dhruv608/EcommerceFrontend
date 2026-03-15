'use client'

import { Skeleton } from './Skeleton'

export default function CartPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Cart Items Skeleton */}
          <div className="xl:col-span-3 space-y-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                      {/* Product Image Skeleton */}
                      <div className="w-full sm:w-32 h-32 bg-gray-200 rounded-lg animate-pulse" />

                      {/* Product Details Skeleton */}
                      <div className="flex-1 space-y-4">
                        {/* Product Name */}
                        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse" />
                        
                        {/* Product Description */}
                        <div className="space-y-2">
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* Price and Remove Button */}
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="h-3 w-12 bg-gray-200 rounded animate-pulse" />
                            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                          </div>
                          <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                          <div className="flex items-center border border-gray-200 rounded-lg">
                            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                            <div className="h-6 w-8 bg-gray-200 rounded animate-pulse" />
                            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="h-3 w-14 bg-gray-200 rounded animate-pulse" />
                          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Order Summary Skeleton */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <div className="p-6">
                {/* Title */}
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6" />

                {/* Summary Items */}
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                  </div>

                  <div className="flex justify-between">
                    <div className="h-4 w-14 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
                  </div>

                  <div className="flex justify-between">
                    <div className="h-4 w-8 bg-gray-200 rounded animate-pulse" />
                    <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-gray-200 my-4" />

                  {/* Total */}
                  <div className="flex justify-between">
                    <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3 mt-8">
                  <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse" />
                  <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
