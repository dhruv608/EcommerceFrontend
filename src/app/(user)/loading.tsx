'use client'

import {
  ProductGridSkeleton,
  CategoryCardSkeleton,
  PageHeaderSkeleton,
} from '@/components/skeleton'

export default function HomePageLoading() {
  return (
    <main className="min-h-screen bg-white pb-10">
      {/* Featured Carousel Skeleton */}
      <section className="w-full">
        <div className="aspect-video md:aspect-[16/9] bg-gray-100">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] animate-pulse" />
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="section-premium bg-gradient-to-br from-background via-secondary/10 to-background">
        <div className="container-premium">
          {/* Header */}
          <PageHeaderSkeleton withButton={true} />

          {/* Category Cards Grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))}
          </div>

          {/* Mobile Category Cards */}
          <div className="md:hidden flex gap-4 overflow-x-auto px-4 pb-2">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="min-w-[140px] h-36">
                  <CategoryCardSkeleton />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
            <div className="max-w-2xl">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-12 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Products Grid */}
          <ProductGridSkeleton count={8} />
        </div>
      </section>
    </main>
  )
}
