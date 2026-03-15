import React from 'react';
import Skeleton from './Skeleton';

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="group relative w-full h-[420px] overflow-hidden rounded-2xl shadow-md">
      {/* Background Image */}
      <Skeleton className="w-full h-full" />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
      
      {/* Content */}
      <div className="absolute bottom-6 left-6 text-white space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-48" />
        <div className="mt-4">
          <Skeleton className="h-10 w-32 rounded-full" />
        </div>
      </div>
      
      {/* Mobile Version */}
      <div className="md:hidden min-w-[140px] h-36 rounded-xl">
        <Skeleton className="w-full h-full" />
        <div className="absolute bottom-3 left-3">
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
