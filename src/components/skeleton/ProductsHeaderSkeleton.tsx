import React from 'react'
import { Skeleton } from './Skeleton'

export const ProductsHeaderSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div className="flex-1">
        <div className="h-10 md:h-12 bg-gray-200 rounded-md animate-pulse mb-2" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-2 w-full md:w-auto">
        {/* Mobile Filter Button */}
        <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse" />
        
        {/* Search Bar */}
        <div className="hidden md:block w-64 h-10 bg-gray-200 rounded-md animate-pulse" />
        
        {/* Sort Dropdown */}
        <div className="w-44 h-10 bg-gray-200 rounded-md animate-pulse" />
      </div>
    </div>
  )
}

export default ProductsHeaderSkeleton
