"use client";

import { ProductGridSkeleton } from "@/components/skeleton";

export default function ProductsPageLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-6 w-64 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        {/* Filter Sidebar Skeleton */}
        <div className="lg:w-64 space-y-6">
          <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2 ml-4">
                  {Array(3).fill(0).map((_, j) => (
                    <div key={j} className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Sort Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Products Grid */}
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </div>
  );
}
