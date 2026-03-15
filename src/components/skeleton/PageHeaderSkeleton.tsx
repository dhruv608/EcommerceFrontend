import React from 'react';
import Skeleton from './Skeleton';

interface PageHeaderSkeletonProps {
  withSubtitle?: boolean;
  withButton?: boolean;
}

export const PageHeaderSkeleton: React.FC<PageHeaderSkeletonProps> = ({ 
  withSubtitle = true, 
  withButton = true 
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 space-y-4 lg:space-y-0">
      <div className="space-y-3">
        {/* Badge */}
        <Skeleton className="h-6 w-24 rounded-full" />
        
        {/* Title */}
        <Skeleton className="h-12 w-64 md:w-96" />
        
        {/* Subtitle */}
        {withSubtitle && <Skeleton className="h-6 w-full max-w-2xl" />}
      </div>

      {/* Button */}
      {withButton && (
        <div className="flex justify-start lg:justify-end">
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      )}
    </div>
  );
};

export default PageHeaderSkeleton;
