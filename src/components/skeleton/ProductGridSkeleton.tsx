import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton'

interface ProductGridSkeletonProps {
  count?: number
  className?: string
}

export const ProductGridSkeleton: React.FC<ProductGridSkeletonProps> = ({
  count = 8,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default ProductGridSkeleton
