import api from '@/lib/api'
import { ProductContent } from '@/lib/types'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductGallery from '@/components/admin/ProductGallery'
import UserProductInfo from '@/components/products/UserProductInfo'

// Data Fetching
async function getProductById(id: string): Promise<ProductContent | null> {
  try {
    const { data } = await api.get(`/products/${id}`)
    return data
  } catch {
    return null
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // ✅ Future-proof
  const { id } = await params

  const product = await getProductById(id)

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-black text-gray-200">404</h2>
        <h3 className="text-2xl font-bold text-gray-900 mt-2">Product Not Found</h3>
        <Button asChild className="mt-6">
          <Link href="/products">Browse Store</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back */}
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Gallery */}
        <div>
          <ProductGallery images={product.images || []} />
        </div>

        {/* Info */}
        <div className="lg:sticky lg:top-24 h-fit">
          <UserProductInfo product={product} />
        </div>
      </div>
    </div>
  )
}
