import React from 'react';
import Skeleton from './Skeleton';

interface AdminTableSkeletonProps {
  rows?: number;
}

export const AdminTableSkeleton: React.FC<AdminTableSkeletonProps> = ({ rows = 8 }) => {
  return (
    <div className="p-6 animate-pulse">
      {/* Top Filters */}
      <div className="flex gap-4 mb-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-32" />
        <div className="ml-auto">
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-8 gap-4 py-3 border-b">
        {Array(8).fill(0).map((_, i) => (
          <Skeleton key={i} className="h-4" />
        ))}
      </div>

      {/* Table Rows */}
      {Array(rows).fill(0).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-8 gap-4 items-center py-4 border-b"
        >
          {/* Product */}
          <div className="flex gap-3 col-span-2">
            <Skeleton className="h-12 w-12 rounded" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>

          {/* Category */}
          <Skeleton className="h-4 w-20" />

          {/* Price */}
          <Skeleton className="h-4 w-14" />

          {/* Stock */}
          <Skeleton className="h-4 w-10" />

          {/* Gallery */}
          <div className="flex gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>

          {/* Featured */}
          <Skeleton className="h-5 w-10 rounded-full" />

          {/* Active */}
          <Skeleton className="h-5 w-10 rounded-full" />

          {/* Actions */}
          <div className="flex gap-3">
            <Skeleton className="h-5 w-5 rounded" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminTableSkeleton;
