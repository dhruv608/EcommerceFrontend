import React from 'react'
import { Skeleton } from './Skeleton'

export const FilterSidebarSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[14px] p-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)] w-full max-w-full hidden md:block">
      {/* Filters Title */}
      <div className="h-[18px] bg-gray-200 rounded-md animate-pulse mb-4" />
      <div className="h-px bg-gray-200 mb-6" />

      {/* Category Section */}
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded-md animate-pulse mb-3" />
        <div className="space-y-1">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2.5 py-1.5 px-2">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded-md animate-pulse flex-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
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

      {/* Featured Products */}
      <div className="mb-6">
        <div className="flex items-center gap-2.5 py-1.5 px-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="h-10 bg-gray-200 rounded-md animate-pulse" />
    </div>
  )
}

export default FilterSidebarSkeleton
