'use client'

export default function OrdersPageSkeleton() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filters Skeleton */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse pl-10" />
              </div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Orders Grid Skeleton */}
        <div className="grid gap-4">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                {/* Order Summary - Top Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2">
                    <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="text-right space-y-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" />
                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse ml-auto" />
                  </div>
                </div>

                {/* Order Items Preview */}
                <div className="space-y-3 mb-4">
                  {Array(2)
                    .fill(0)
                    .map((_, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2.5">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse" />
                        <div className="flex-1">
                          <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-1" />
                          <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                      </div>
                    ))}
                </div>

                {/* Estimated Delivery */}
                <div className="mb-4">
                  <div className="h-3 w-28 bg-gray-200 rounded animate-pulse mb-1" />
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                </div>

                {/* View Details Button */}
                <div className="flex justify-end">
                  <div className="h-9 w-32 bg-gray-200 rounded-lg animate-pulse" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
