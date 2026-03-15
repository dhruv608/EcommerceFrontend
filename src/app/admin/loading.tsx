'use client'

import { AdminTableSkeleton, PageHeaderSkeleton } from '@/components/skeleton'

export default function AdminDashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-20 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
        </div>

        {/* Recent Products Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <PageHeaderSkeleton withButton={true} withSubtitle={false} />
          <AdminTableSkeleton rows={6} />
        </div>
      </div>
    </div>
  )
}
