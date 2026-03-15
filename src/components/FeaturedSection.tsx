'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Star } from 'lucide-react' // npm install lucide-react
import { ProductContent } from '@/lib/types'
import { Button } from './ui/button'
import { ProductGridSkeleton } from './skeleton'

// Aapke screenshot ke hisab se Type definition
// Ise apne '@/lib/types' me bhi update kar sakte ho

const FeaturedSection = ({ allFeaturedProducts }: { allFeaturedProducts: ProductContent[] }) => {
  // Agar products empty hain to crash na ho
  if (!allFeaturedProducts || allFeaturedProducts.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Skeleton */}
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

          {/* Products Grid Skeleton */}
          <ProductGridSkeleton count={8} />
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* 🔥 Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <span className="text-black font-bold tracking-wider uppercase text-sm">
              Exclusive Drops
            </span>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 tracking-tight">
              Trending This Week.
            </h2>
            <p className="text-gray-500 mt-3 text-lg"></p>
          </div>
        </div>
        <Link
          href="/products"
          className="group flex items-center gap-2 border-b-2 border-gray-300 pb-1 text-sm font-bold hover:text-gray-600 hover:border-gray-600 transition-all"
        >
          View All Products
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
        {/*  Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {allFeaturedProducts.map(product => (
            <Link key={product.id} href={`products/${product.id}`}>
              <div className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                {/* 🖼️ Image Area */}
                <div className="relative aspect-3/4 w-full overflow-hidden bg-gray-200">
                  {/* Image 1 (Default) */}
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className={`object-cover transition-all duration-700 ease-in-out ${
                      product.images[1] ? 'group-hover:opacity-0' : 'group-hover:scale-110'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading={allFeaturedProducts.indexOf(product) < 4 ? "eager" : "lazy"}
                  />

                  {/* Image 2 (Hover Effect - Agar 2nd image hai to dikhegi) */}
                  {product.images[1] && (
                    <Image
                      src={product.images[1]}
                      alt={product.name + ' alternate'}
                      fill
                      sizes="240"
                      className="absolute inset-0 object-cover opacity-0 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
                    />
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-black text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      New
                    </span>
                  </div>

                  {/* 👇 Slide-Up Action Bar */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <button
                      onClick={() => (window.location.href = `/products/${product.id}`)}
                      className="w-full bg-[#acac49] hover:bg-[#96963f] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center transition-colors shadow-xl"
                    >
                      View Product
                    </button>
                  </div>
                </div>

                {/* 📝 Details Area */}
                <div className="p-5">
                  <div className="mb-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-snug line-clamp-1 group-hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs mt-1 line-clamp-1">{product.description}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 font-medium uppercase">Price</span>
                      <span className="text-xl font-black text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedSection
