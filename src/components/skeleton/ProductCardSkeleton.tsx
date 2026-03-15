import React from 'react'
import Skeleton from './Skeleton'

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div
      data-testid="product-card-skeleton"
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm"
    >
      {/* Image Area */}
      <div className="relative aspect-3/4 w-full overflow-hidden">
        <Skeleton className="w-full h-full" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4">
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Action Bar */}
        <div className="absolute bottom-4 left-4 right-4">
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5">
        <div className="mb-2 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col space-y-1">
            <Skeleton className="h-3 w-12" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
