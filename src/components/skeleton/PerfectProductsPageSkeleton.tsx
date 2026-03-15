import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton'
import { Skeleton } from './Skeleton'

export const PerfectProductsPageSkeleton: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Fixed Sidebar - Desktop Only - EXACT SAME CLASSES */}
      <aside className="hidden md:block fixed left-0 top-[80px] h-[calc(100vh-80px)] w-64 overflow-y-auto overflow-x-hidden z-40">
        <div className="h-full px-2">
          {/* Filter Sidebar - PERFECT MATCH */}
          <div className="bg-white rounded-[14px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] w-full max-w-full hidden md:block">
            {/* Filters Title - EXACT SAME SIZE */}
            <div className="h-[18px] bg-gray-200 rounded-md animate-pulse mb-4" />
            <div className="h-px bg-gray-200 mb-6" />

            {/* Category Section - PERFECT MATCH */}
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-3" />
              <div className="space-y-1">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-2.5 py-1.5 px-2 rounded-md">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-4 bg-gray-200 rounded-md animate-pulse flex-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Section - PERFECT MATCH */}
            <div className="mb-6">
              <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-3" />
              <div className="space-y-4">
                <div className="px-2">
                  <div className="h-2 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="flex justify-between px-2">
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            </div>

            {/* Featured Products - PERFECT MATCH */}
            <div className="mb-6">
              <div className="flex items-center gap-2.5 py-1.5 px-2 rounded-md">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded-md animate-pulse" />
              </div>
            </div>

            {/* Clear Filters Button - PERFECT MATCH */}
            <div className="h-10 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>
      </aside>

      {/* Main Content - EXACT SAME CLASSES */}
      <main className="ml-0 md:ml-64 min-h-screen">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* HEADER - PERFECT MATCH */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div className="flex-1">
              {/* Title - EXACT SAME SIZE */}
              <div className="h-10 md:h-12 bg-gray-200 rounded-md animate-pulse mb-2" />
              {/* Results count - EXACT SAME SIZE */}
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Mobile Filter Button - EXACT SAME SIZE */}
              <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse" />
              
              {/* Search Bar - EXACT SAME SIZE */}
              <div className="hidden md:block w-64 h-10 bg-gray-200 rounded-md animate-pulse" />
              
              {/* Sort Dropdown - EXACT SAME SIZE */}
              <div className="w-44 h-10 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
          
          {/* Separator - EXACT SAME */}
          <div className="h-px bg-gray-200 mb-6" />

          {/* PRODUCT GRID - PERFECT MATCH */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default PerfectProductsPageSkeleton
