import React from 'react';
import Skeleton from './Skeleton';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back Button */}
      <div className="mb-6">
        <Skeleton className="h-6 w-32" />
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square overflow-hidden rounded-xl">
            <Skeleton className="w-full h-full" />
          </div>
          
          {/* Thumbnail Images */}
          <div className="flex gap-2">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="w-20 h-20 overflow-hidden rounded-lg">
                <Skeleton className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title */}
          <Skeleton className="h-10 w-full" />
          
          {/* Price */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-32" />
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          
          {/* Actions */}
          <div className="space-y-4">
            <Skeleton className="h-14 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          
          {/* Additional Info */}
          <div className="space-y-3 pt-6 border-t">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
