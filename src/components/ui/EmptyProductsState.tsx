'use client'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'

interface EmptyProductsStateProps {
  clearFilters?: () => void
}

export default function EmptyProductsState({ clearFilters }: EmptyProductsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
      <DotLottieReact
        src="/lottieanimation/nothing.lottie"
        loop
        autoplay
        className="mx-auto w-[220px] h-[220px] md:w-[320px] md:h-[320px]"
      />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">No products found</h3>

        <p className="text-sm text-gray-500">
          Try adjusting your filters or search to find products.
        </p>

        {clearFilters && (
          <button
            onClick={clearFilters}
            className="text-[#acac49] font-medium hover:underline transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}
