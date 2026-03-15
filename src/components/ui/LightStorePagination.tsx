'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface LightStorePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export default function LightStorePagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: LightStorePaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      // Show all pages if total is 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 4) {
        // Show pages 2-5 when current page is near the start
        for (let i = 2; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        // Show last 5 pages when current page is near the end
        pages.push('...')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Show pages around current page with ellipsis
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page)
    }
  }

  if (totalPages <= 1) return null

  return (
    <div className={`flex items-center justify-center gap-2 mt-6 ${className}`}>
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="flex items-center justify-center w-9 h-9 text-gray-500">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            ) : (
              <button
                onClick={() => handlePageClick(page)}
                className={`h-9 min-w-[36px] flex items-center justify-center rounded-md border transition-colors ${
                  currentPage === page
                    ? 'bg-[#acac49] text-white border-[#acac49]'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
